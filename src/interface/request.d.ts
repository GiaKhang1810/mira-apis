namespace RequestURL {
    export interface CookieStore {
        [domain: string]: {
            [cookie: string]: string;
        }
    }

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
        auth?:  Extract<Authenticate, { type: 'basic' }>;
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
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
        core?: 'axios' | 'fetch'
    }

    export interface Response<T> {
        url: string | undefined;
        method: string | undefined;
        status: number;
        headers: Record<string, any>;
        body: T;
        config: Record<string, any>;
    }

    export interface Error<T> {
        name?: string;
        message?: string;
        url?: string;
        method?: string;
        status?: number;
        headers?: Record<string, any>;
        body?: T | any;
        config?: Record<string, any>;
        stack?: string;
        code?: string;
        isAxiosError?: boolean;
    }
}