namespace Crypt {
    export interface Hash {
        (data: string, type: string): string;
    }

    export interface Hmac {
        (data: Buffer | string, key: string, type: string): string;
    }
}