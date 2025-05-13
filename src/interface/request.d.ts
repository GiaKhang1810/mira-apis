type CookieStore = Record<string, Record<string, string>>;

namespace RequestURL {
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

    export interface Authenticate {
        username: string;
        password: string;
    }

    export interface Proxy {
        port: number;
        host: string;
        auth?: Authenticate;
        protocol?: 'http' | 'https';
    }

    export interface Options {
        jar?: {
            setCookie(cookie: string | Array<string>, url: string): void;
            getCookie(url?: string): CookieStore | Record<string, string>;
            clearCookie(url?: string): void;
        },
        auth?: Authenticate;
        baseURL?: string;
        timeout?: number;
        headers?: Headers;
        proxy?: Proxy;
        params?: Record<string, any>;
        responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
        maxRedirect?: number;
        withCredentials?: boolean;
        validateStatus?: (status: number) => boolean;
        data?: any;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    }

    export interface Response<T> {
        url: string | undefined;
        method: string | undefined;
        status: number;
        headers: Record<string, any>;
        body: T;
    }
}