import { createHash, createHmac } from 'crypto';

export const hash: Crypt.Hash = (data: string, type: string): string => createHash(type).update(data).digest('hex');
export const hmac: Crypt.Hmac = (data: Buffer | string, key: string, type: string): string => createHmac(type, key).update(data).digest('hex');
export default {
    hash,
    hmac
}