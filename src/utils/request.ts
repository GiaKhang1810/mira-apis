import axios, { AxiosError, AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { Session } from './session';
import { isObject, isFunction } from './types';

namespace Request {
    export interface Headers {
        'Accept'?: string;
        'Accept-Encoding'?: string;
        'Accept-Language'?: string;
        'Authorization'?: string;
        'Cache-Control'?: string;
        'Connection'?: string;
        'Content-Length'?: string;
        'Content-Type'?: string;
        'Host'?: string;
        'Origin'?: string;
        'Referer'?: string;
        'User-Agent'?: string;
        [item: string]: string | undefined;
    }

    export type Authenticate =
        | {
            type: 'basic';
            username: string;
            password: string;
        }
        | {
            type: 'bearer';
            token: string;
        }
        | {
            type: 'digest';
            username: string;
            password: string;
            realm?: string;
            nonce?: string;
            qop?: string;
            algorithm?: string;
        }
        | {
            type: 'oauth1';
            consumerKey: string;
            consumerSecret: string;
            token: string;
            tokenSecret: string;
            signatureMethod?: 'HMAC-SHA1' | 'RSA-SHA1' | 'PLAINTEXT';
        }
        | {
            type: 'oauth2';
            accessToken: string;
            refreshToken?: string;
            expiresIn?: number;
            tokenType?: string;
        }

    export interface Proxy {
        port: number;
        host: string;
        auth?: Extract<Authenticate, { type: 'basic' }>;
        protocol?: 'http' | 'https';
    }

    export interface Options {
        jar?: Session;
        auth?: Authenticate;
        baseURL?: string;
        timeout?: number;
        headers?: Headers;
        proxy?: Proxy;
        params?: Record<string, any>;
        type?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
        maxRedirects?: number;
        withCredentials?: boolean;
        confirmStatus?: (status: number) => boolean;
        body?: any;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
        core?: 'axios' | 'fetch';
    }

    export interface Response<T> {
        url: string;
        status: number;
        method: string;
        headers: Record<string, any>;
        body: T;
    }

    export interface Error<T> {
        message: string;
        response?: Response<T>;
    }
}

class Request {
    private jar: Session = new Session();
    private instance: AxiosInstance = axios.create();
    private defaultOptions: Request.Options = {
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
        type: 'text',
        core: 'axios'
    }

    constructor(options: Request.Options = {}) {
        if (options.jar instanceof Session)
            this.jar = options.jar;

        if (options.headers && isObject(options.headers) && Object.entries(options.headers).length > 0)
            this.defaultOptions.headers = {
                ...this.defaultOptions.headers,
                ...options.headers
            }

        delete options.headers;

        this.defaultOptions = {
            ...this.defaultOptions,
            ...options
        }
    }

    public getHeaders(headerOptions: Request.Headers = {}): Request.Headers {
        const headers: Request.Headers = {
            ...this.defaultOptions.headers,
            ...headerOptions
        }

        return headers;
    }

    private async fetchCore<T>(url: string, options: Request.Options, reqOptions: RequestInit, jar?: Session, confirmStatus?: Request.Options['confirmStatus']): Promise<Request.Response<T>> {
        const rawRes: Response = await fetch(url, reqOptions);
        const rawCookie: string | null = await rawRes.headers.get('set-cookie');
        const status: number = rawRes.status;

        const Parser: Record<string, () => Promise<any>> = {
            json: () => rawRes.json(),
            text: () => rawRes.text(),
            arraybuffer: () => rawRes.arrayBuffer(),
            blob: () => rawRes.blob(),
            stream: () => Promise.resolve(rawRes.body)
        }
        const response: Request.Response<T> = {
            url: rawRes.url,
            status,
            method: reqOptions.method ?? 'GET',
            headers: Object.fromEntries(rawRes.headers.entries()),
            body: await Parser[options.type ?? this.defaultOptions.type ?? 'text']()
        }

        if (rawCookie)
            (jar ?? this.jar).setCookie(rawCookie, url);

        const confirm: boolean = confirmStatus && isFunction(confirmStatus) ? confirmStatus(status) : status >= 200 && status < 300;
        if (!confirm) {
            const error: Request.Error<T> = {
                message: 'Unacceptable status with code ' + status,
                response
            }
            throw error;
        }

        return response;
    }

    private async axiosCore<T>(url: string, options: AxiosRequestConfig, jar?: Session): Promise<Request.Response<T>> {
        type interceptors = {
            response: (response: AxiosResponse<T>) => AxiosResponse<T>;
            error: (error: AxiosError<T>) => void;
        }

        const interceptors: interceptors = {
            response: (response: AxiosResponse<T>): AxiosResponse<T> => {
                const rawCookie: Array<string> | undefined = response.headers['set-cookie'];
                if (rawCookie)
                    (jar ?? this.jar).setCookie(rawCookie, url);

                return response;
            },
            error: (error: AxiosError<T>): void => {
                const response: Request.Response<T> = {
                    url: error?.config?.url ?? url,
                    status: error?.response?.status ?? 0,
                    method: error?.config?.method?.toUpperCase() ?? 'GET',
                    headers: error?.response?.request?.headers ?? {},
                    body: error?.response?.data as T
                }

                const err: Request.Error<T> = {
                    message: error.message,
                    response
                }

                throw err;
            }
        }

        this.instance.interceptors.response.use(interceptors.response, interceptors.error);
        const response: AxiosResponse<T> = await this.instance.request<T>(options);

        return {
            url: response.config.url ?? url,
            status: response.status,
            method: response.config.method?.toUpperCase() ?? 'GET',
            headers: response.headers,
            body: response.data
        }
    }

    private async request<T>(url: string, jar: Session = this.jar, options: Request.Options = this.defaultOptions): Promise<Request.Response<T>> {
        const method: string = (options.method ?? 'GET').toUpperCase();
        const headers: Request.Headers = await this.getHeaders(options.headers);
        const cookieObj: Session.Data[string] = (jar ?? this.jar).getCookie(url);
        const cookieStr: string = Object.entries(cookieObj)
            .map((item: Array<string>): string => item[0] + '=' + encodeURIComponent(item[1]))
            .join('; ');

        headers.cookie = cookieStr;

        let auth: Request.Authenticate | undefined;
        if ((auth = options.auth ?? this.defaultOptions.auth)) {
            switch (auth.type) {
                case 'basic':
                    headers.Authorization = 'Basic ' + Buffer.from(auth.username + ':' + auth.password).toString('base64');
                    break;
                case 'bearer':
                    headers.Authorization = 'Bearer ' + auth.token;
                    break;
                case 'oauth1':
                    headers.Authorization = 'OAuth ' + [
                        `oauth_consumer_key='${auth.consumerKey}'`,
                        `oauth_token='${auth.token}'`,
                        `oauth_signature_method='${auth.signatureMethod ?? 'HMAC-SHA1'}'`,
                        `oauth_signature='${encodeURIComponent(auth.consumerSecret + '&' + auth.tokenSecret)}'`,
                        `oauth_timestamp='${Math.floor(Date.now() / 1000)}'`,
                        `oauth_nonce='${Math.random().toString(36).substring(2, 15)}'`,
                        `oauth_version='1.0'`
                    ].join(', ');
                    break;
                case 'oauth2':
                    headers.Authorization = 'Bearer ' + auth.accessToken;
                    if (auth.refreshToken)
                        headers['X-Refresh-Token'] = auth.refreshToken;

                    if (auth.expiresIn)
                        headers['X-Expires-In'] = auth.expiresIn.toString();

                    if (auth.tokenType)
                        headers['X-Token-Type'] = auth.tokenType;

                    break;
                case 'digest':
                    headers.Authorization = `Digest username='${auth.username}', password='${auth.password}', realm='${auth.realm ?? ''}', nonce='${auth.nonce ?? ''}', qop='${auth.qop ?? ''}', algorithm='${auth.algorithm ?? 'MD5'}'`;
                    break;
            }
        }

        if ((options.core ?? this.defaultOptions.core) === 'fetch') {
            const baseURL: string | undefined = options.baseURL ?? this.defaultOptions.baseURL;
            url = baseURL && !/^https?:\/\//i.test(url) ? new URL(url, baseURL).toString() : url;

            const params: Record<string, any> | undefined = options.params ?? this.defaultOptions.params;
            if (params && Object.keys(params).length > 0) {
                const queryString: string = stringify(params, { arrayFormat: 'brackets' });
                const hasQuery: boolean = url.includes('?');
                url += (hasQuery ? '&' : '?') + queryString;
            }

            const requestOptions: RequestInit = {
                method,
                headers: Object.fromEntries(Object.entries(headers)?.filter((entry: [string, string | undefined]): entry is [string, string] => typeof entry[1] === 'string')),
                body: options.body,
                credentials: (options.withCredentials ?? this.defaultOptions.withCredentials) ? 'include' : 'same-origin',
                redirect: (options.maxRedirects ?? this.defaultOptions.maxRedirects ?? 0) > 0 ? 'follow' : 'manual'
            }

            let timeoutID: NodeJS.Timeout | undefined;
            const timeout: number = options.timeout ?? this.defaultOptions.timeout ?? 0;
            if (timeout > 0) {
                const controller: AbortController = new AbortController();
                requestOptions.signal = controller.signal;
                timeoutID = setTimeout(function (): void {
                    controller?.abort();
                }, timeout);
            }

            try {
                return await this.fetchCore<T>(url, options, requestOptions, jar, options.confirmStatus ?? this.defaultOptions.confirmStatus);
            } catch (error) {
                throw error;
            } finally {
                if (timeoutID)
                    clearTimeout(timeoutID);
            }
        } else {
            const reqOptions: AxiosRequestConfig = {
                method,
                url,
                headers,
                baseURL: options.baseURL ?? this.defaultOptions.baseURL,
                timeout: options.timeout ?? this.defaultOptions.timeout,
                proxy: options.proxy ?? this.defaultOptions.proxy,
                params: options.params ?? this.defaultOptions.params,
                maxRedirects: options.maxRedirects ?? this.defaultOptions.maxRedirects,
                withCredentials: options.withCredentials ?? this.defaultOptions.withCredentials,
                validateStatus: options.confirmStatus ?? this.defaultOptions.confirmStatus,
                responseType: options.type ?? this.defaultOptions.type ?? 'text',
                data: options.body,
                paramsSerializer: {
                    serialize: (params: Record<string, any>): string => stringify(params, { arrayFormat: 'brackets', encodeValuesOnly: true })
                }
            }

            return await this.axiosCore<T>(url, reqOptions, jar);
        }
    }

    public getJar(): Session {
        return this.jar;
    }

    public defaults(options: Request.Options = {}): Request {
        if (options.headers && isObject(options.headers) && Object.entries(options.headers).length > 0)
            this.defaultOptions.headers = {
                ...this.defaultOptions.headers,
                ...options.headers
            }

        delete options.headers;

        this.defaultOptions = {
            ...this.defaultOptions,
            ...options
        }

        return this;
    }

    public get<T>(url: string, jar?: Session, options: Request.Options = {}): Promise<Request.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'GET' });
    }

    public post<T>(url: string, jar?: Session, options: Request.Options = {}): Promise<Request.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'POST' });
    }

    public options<T>(url: string, jar?: Session, options: Request.Options = {}): Promise<Request.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'OPTIONS' });
    }

    public put<T>(url: string, jar?: Session, options: Request.Options = {}): Promise<Request.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'PUT' });
    }

    public delete<T>(url: string, jar?: Session, options: Request.Options = {}): Promise<Request.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'DELETE' });
    }

    public head<T>(url: string, jar?: Session, options: Request.Options = {}): Promise<Request.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'HEAD' });
    }

    public patch<T>(url: string, jar?: Session, options: Request.Options = {}): Promise<Request.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'PATCH' });
    }
}

const request: Request = new Request();
export {
    Session,
    Request,
    request
}
export default request;