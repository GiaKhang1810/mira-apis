import { OAuth2Client } from 'google-auth-library';
import { resolve } from 'path';
import { DataBase } from '@database/database';
import { Session } from './session';

export type Struct = {
    database?: Record<string, DataBase.Model>;
    client?: OAuth2Client;
    jar?: Session;

    directoryCache: string;
}

export class Space implements Struct {
    private static instance: Space;

    public database?: Record<string, DataBase.Model>;
    public client?: OAuth2Client;
    public jar?: Session;

    public directoryCache: string = resolve(__dirname, '..', 'database', process.env.CACHE_DIRECTORY ?? 'cache');

    public static get ins(): Space {
        if (!this.instance)
            this.instance = new Space();

        return this.instance;
    }
}

export const ins: Space = Space.ins;
export default Space.ins;