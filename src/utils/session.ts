import { isArray } from './types';

export namespace Session {
    export interface Data {
        [domain: string]: {
            [cookie: string]: string;
        }
    }
}

export class Session {
    private storage: Session.Data = {}

    constructor(cookies?: Array<string> | string, url?: Array<string> | string) {
        url = url && !isArray(url) ? [url] : url;

        if (!cookies || !url)
            return;

        for (let item of url)
            this.setCookie(cookies, item);
    }

    public getDomain(url: string): string {
        try {
            return new URL(url).hostname;
        } catch {
            return url;
        }
    }

    public setCookie(rawCookie: Array<string> | string, url: string): void {
        const domain: string = this.getDomain(url);

        if (!this.storage[domain])
            this.storage[domain] = {}

        const cookies: Array<string> = isArray(rawCookie) ? rawCookie : [rawCookie];

        for (let cookie of cookies) {
            const parts: Array<string> = cookie.split(';');

            for (let part of parts) {
                const eqIndex: number = part.indexOf('=');
                if (eqIndex === -1)
                    continue;

                const name: string = part.slice(0, eqIndex).trim();
                const value: string = part.slice(eqIndex + 1).trim();

                if (name)
                    this.storage[domain][name] = value;
            }
        }
    }

    public getCookie(url: string): Session.Data[string] {
        const domain: string = this.getDomain(url);

        if (!this.storage[domain])
            this.storage[domain] = {}

        return this.storage[domain];
    }

    public clearCookie(url?: string): void {
        if (!url) {
            this.storage = {}
            return;
        }

        const domain: string = this.getDomain(url);
        delete this.storage[domain];
    }
}