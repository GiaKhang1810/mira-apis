import { EventEmitter } from 'events';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import types from './types';

export class CookieManager {
    private store: RequestURL.CookieStore = {}

    private getDomain(url: string): string {
        try {
            return new URL(url).hostname;
        } catch (error: any) {
            return url;
        }
    }

    constructor(cookies?: Array<string> | string, url?: string) {
        if (!cookies)
            return;

        if (url) {
            const domain: string = this.getDomain(url);
            if (!this.store[domain])
                this.store[domain] = {}

            const cookie: Array<string> = types.isArray(cookies) ? cookies : [cookies];

            for (let rawCookie of cookie) {
                const parts: Array<string> = rawCookie.split(';');

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

        if (!this.store[domain])
            this.store[domain] = {}

        return this.store[domain];
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
    private jar: CookieManager;
    private instance: AxiosInstance = axios.create();
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
        responseType: 'text',
        timeout: 5000,
        core: 'axios'
    }

    constructor(options: RequestURL.Options = {}) {
        super();

        this.jar = options.jar instanceof CookieManager ? options.jar : new CookieManager();

        if (options.headers && types.isObject(options.headers) && Object.entries(options.headers).length > 0)
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

    private async fetchCore<T>(url: string, requestOptions: RequestInit, jar?: CookieManager, validateStatus?: (status: number) => boolean): Promise<Response> {
        const response: Response = await fetch(url, requestOptions);
        const rawCookie: string | null = await response.headers.get('set-cookie');
        const status: number = response.status;

        if (rawCookie)
            (jar ? jar : this.jar).setCookie(rawCookie, url);

        if (validateStatus && !validateStatus(status)) {
            const error: RequestURL.Error<T> = {
                name: 'fetchError',
                message: 'Request failed with status code ' + status,
                url,
                method: requestOptions.method?.toUpperCase() ?? 'GET',
                status,
                headers: Object.fromEntries(response.headers.entries()),
                body: (await response.clone().text()) as T,
                config: requestOptions,
                stack: new Error().stack,
                code: undefined,
                isAxiosError: false
            }
            throw error;
        }

        return response;
    }

    private async axiosCore<T>(requestOptions: Record<string, any>, jar?: CookieManager): Promise<RequestURL.Response<T>> {
        this.instance.interceptors.response.use(<T>(response: AxiosResponse<T>): AxiosResponse<T> => {
            const rawCookie: Array<string> | string | undefined = response.headers['set-cookie'];
            const url: string | undefined = response.config.url;

            if (rawCookie && url)
                (jar ? jar : this.jar).setCookie(rawCookie, url);

            const customResponse: RequestURL.Response<T> = {
                url,
                method: response?.config?.method,
                status: response?.status,
                headers: response?.headers,
                body: response?.data,
                config: response?.config
            }

            this.emit('response', customResponse);
            return response;
        }, <T>(error: AxiosError): Promise<RequestURL.Error<T>> => {
            const customError: RequestURL.Error<T> = {
                name: error?.name,
                message: error?.message,
                url: error?.config?.url,
                method: error?.config?.method?.toUpperCase(),
                status: error?.response?.status,
                headers: error?.response?.headers,
                body: error?.response?.data,
                config: error?.config,
                stack: error?.stack,
                code: error?.code,
                isAxiosError: error?.isAxiosError
            }

            this.emit('error', customError);

            return Promise.reject(customError);
        });
        const response: AxiosResponse<T> = await this.instance.request<T>(requestOptions);
        return {
            url: response.config.url,
            method: response.config.method,
            config: response.config,
            status: response.status,
            headers: response.headers,
            body: response.data
        }
    }

    public async request<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        const method: string = (options.method ?? 'GET').toUpperCase();

        const headers: Record<string, string | undefined> = {
            ...this.defaultOptions.headers,
            ...(options.headers ?? {})
        }

        const cookieObj: Record<string, string> = (jar ? jar : this.jar).getCookie(url);
        const cookieStr: string = Object.entries(cookieObj)
            .map((item: Array<string>): string => item[0] + '=' + item[1])
            .join('; ');

        headers.cookie = cookieStr;

        if ((options.core ?? this.defaultOptions.core) === 'fetch') {
            const requestOptions: RequestInit = {
                method,
                headers: Object.fromEntries(Object.entries(headers)?.filter((entry: [string, string | undefined]): entry is [string, string] => typeof entry[1] === 'string')),
                body: options.data,
                credentials: (options.withCredentials ?? this.defaultOptions.withCredentials) ? 'include' : 'same-origin',
                redirect: (options.maxRedirect ?? this.defaultOptions.maxRedirect ?? 0) > 0 ? 'follow' : 'manual'
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
                const response: Response = await this.fetchCore(url, requestOptions, jar, options.validateStatus ?? this.defaultOptions.validateStatus);
                const type: string = options.responseType ?? this.defaultOptions.responseType ?? 'text';
                const parserMap: Record<string, () => Promise<any>> = {
                    json: () => response.json(),
                    text: () => response.text(),
                    arraybuffer: () => response.arrayBuffer(),
                    blob: () => response.blob(),
                    stream: () => Promise.resolve(response.body)
                }
                const output: RequestURL.Response<T> = {
                    url,
                    method,
                    status: response?.status,
                    headers: Object.fromEntries(response.headers.entries()),
                    body: await parserMap[type](),
                    config: requestOptions
                }
                
                this.emit('response', output);

                return output;
            } catch (error) {
                this.emit('error', error);
                throw error;
            } finally {
                if (timeoutID)
                    clearTimeout(timeoutID);
            }
        }

        const requestOptions: Record<string, any> = {
            method,
            url,
            headers,
            baseURL: options.baseURL ?? this.defaultOptions.baseURL,
            timeout: options.timeout ?? this.defaultOptions.timeout,
            proxy: options.proxy ?? this.defaultOptions.proxy,
            auth: options.auth ?? this.defaultOptions.auth,
            params: options.params ?? this.defaultOptions.params,
            maxRedirects: options.maxRedirect ?? this.defaultOptions.maxRedirect,
            withCredentials: options.withCredentials ?? this.defaultOptions.withCredentials,
            validateStatus: options.validateStatus ?? this.defaultOptions.validateStatus,
            responseType: options.responseType ?? this.defaultOptions.responseType ?? 'text',
            data: options.data
        }

        return await this.axiosCore<T>(requestOptions, jar);
    }

    public getJar(): CookieManager {
        return this.jar;
    }

    public defaults(options: RequestURL.Options = {}): Request {
        if (options.headers && types.isObject(options.headers) && Object.entries(options.headers).length > 0)
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

    public get<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'GET' });
    }

    public post<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'POST' });
    }

    public options<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'OPTIONS' });
    }

    public put<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'PUT' });
    }

    public delete<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'DELETE' });
    }

    public head<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'HEAD' });
    }

    public patch<T>(url: string, jar?: CookieManager, options: RequestURL.Options = {}): Promise<RequestURL.Response<T>> {
        return this.request<T>(url, jar, { ...options, method: 'PATCH' });
    }
}

export const request: Request = new Request();
export default request;