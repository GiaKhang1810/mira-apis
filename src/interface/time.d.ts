namespace Time {
    export interface Options {
        hour12?: boolean;
        year?: 'numeric' | '2-digit';
        month?: 'numeric' | '2-digit';
        day?: 'numeric' | '2-digit';
        hour?: 'numeric' | '2-digit';
        minute?: 'numeric' | '2-digit';
        second?: 'numeric' | '2-digit';
        weekday?: 'narrow' | 'short' | 'long';
    }

    export interface GetTime {
        (format?: string, locale?: string, timezone?: string, timestamp?: Date | number, options?: Options): string;
    }
}