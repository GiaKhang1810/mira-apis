namespace Writer {
    export interface Response {
        delay: number;
        size: number;
        ext: string;
        name: string;
        location: string;
    }

    export interface Options {
        directory?: string;
        jar?: {
            setCookie(cookie: string | Array<string>, url: string): void;
            getCookie(url?: string): RequestURL.CookieStore | Record<string, string>;
            clearCookie(url?: string): void;
        }
        headers?: RequestURL.Headers;
    }
}