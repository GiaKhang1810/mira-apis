import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { Readable } from 'stream';
import { EventEmitter } from 'events';
import { randomUUID } from 'crypto';
import axios, { AxiosError, AxiosInstance, AxiosResponse, ResponseType } from 'axios';
import types from './types';

type CookieStore = Record<string, Record<string, string>>;

export class CookieManager {
    private store: CookieStore = {}

    private getDomain(url: string): string {
        try {
            return new URL(url).hostname;
        } catch (error: any) {
            return url;
        }
    }

    public setCookie(rawCookie: Array<string> | string, url: string): void {
        const domain: string = this.getDomain(url);

        if (!this.store[domain])
            this.store[domain] = {}

        const cookies: Array<string> = types.isArray(rawCookie) ? rawCookie : [rawCookie];

        for (let cookie of cookies) {
            const parts: Array<string> = cookie.split(';');

            for (let part of parts) {
                const eqIndex: number = part.indexOf('=');
                if (eqIndex === -1) 
                    continue;
    
                const name: string = part.slice(0, eqIndex).trim();
                const value: string = part.slice(eqIndex + 1).trim();
    
                if (name) 
                    this.store[domain][name] = value;
            }
        }
    }

    public getCookie(url?: string): Record<string, string> {
        if (!url)
            return {}

        const domain: string = this.getDomain(url);
        return this.store[domain] ?? {}
    }

    public clearCookie(url?: string): undefined {
        if (!url) {
            this.store = {}
            return;
        }

        const domain: string = this.getDomain(url);
        delete this.store[domain];
    }
}

export class Request extends EventEmitter {
    private instance: AxiosInstance;
    private jar: CookieManager;
    private defaultOptions: RequestURL.Options = {
        headers: {
            'Priority': 'u=0, i',
            'Sec-Ch-Ua': 'Chromium;v=134, Not:A-Brand;v=24, Google Chrome;v=134',
            'Sec-Ch-Ua-Full-Version-List': 'Chromium;v=134.0.6998.119, Not:A-Brand;v=24.0.0.0, Google Chrome;v=134.0.6998.119',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Model': '',
            'Sec-Ch-Ua-Platform': 'Windows',
            'Sec-Ch-Ua-Platform-Version': '19.0.0',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
        },
        responseType: 'text'
    }

    constructor(options: RequestURL.Options = {}) {
        super();

        if (options.jar)
            this.jar = options.jar as CookieManager;
        else
            this.jar = new CookieManager();

        this.defaultOptions = {
            ...this.defaultOptions,
            ...options
        }

        delete this.defaultOptions.jar;

        this.instance = axios.create();
        this.instance.interceptors.response.use(<T>(response: AxiosResponse<T>): AxiosResponse<T> => {
            const rawCookie: Array<string> | string | undefined = response.headers['set-cookie'];
            const url: string | undefined = response.config.url;

            if (rawCookie && url)
                this.jar.setCookie(rawCookie, url);

            this.emit('response', {
                url,
                method: response.config.method,
                status: response.status,
                headers: response.headers,
                body: response.data
            } as RequestURL.Response<T>);

            return response;
        }, (error: AxiosError): Promise<Error> => {
            this.emit('error', {
                url: error.config?.url,
                method: error.config?.method,
                message: error.message,
                code: error.code,
                response: error.response,
                error
            });
            return Promise.reject(error);
        });
    }

    public async request<T>(url: string, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        const method: string = (options.method ?? 'GET').toUpperCase();
        const headers: Record<string, any> = {
            ...this.defaultOptions.headers,
            ...(options.headers || {})
        }

        const cookieObj: Record<string, string> = this.jar.getCookie(url);
        const cookieStr: string = Object.entries(cookieObj)
            .map((item: Array<string>): string => item[0] + '=' + item[1])
            .join('; ');

        headers.cookie = cookieStr;

        const requestOptions: Record<string, any> = {
            method,
            url,
            headers,
            baseURL: options.baseURL ?? this.defaultOptions.baseURL,
            timeout: options.timeout ?? this.defaultOptions.timeout,
            proxy: options.proxy,
            auth: options.auth,
            params: options.params,
            maxRedirects: options.maxRedirect ?? this.defaultOptions.maxRedirect,
            withCredentials: options.withCredentials,
            validateStatus: options.validateStatus,
            responseType: options.responseType ?? this.defaultOptions.responseType ?? 'text',
            data: options.data
        }

        const response: AxiosResponse<T> = await this.instance.request<T>(requestOptions);
        return {
            url,
            method: response.config.method,
            status: response.status,
            headers: response.headers,
            body: response.data
        }
    }

    public get<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        if (jar)
            this.jar = jar;

        return this.request<T>(url, { ...options, method: 'GET' });
    }

    public post<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        if (jar)
            this.jar = jar;

        return this.request<T>(url, { ...options, method: 'POST' });
    }

    public getJar(): CookieManager {
        return this.jar;
    }
}

export const request: Request = new Request();
export default request;