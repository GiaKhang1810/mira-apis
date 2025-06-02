import { OAuth2Client } from 'google-auth-library';

export type Struct = {
    database: Record<string, DataBase.Model>;
    client: OAuth2Client;
}

export class Space implements Struct {
    private static instance: Space;

    public database: Record<string, DataBase.Model> = {}
    public client: OAuth2Client = new OAuth2Client();

    public static get ins(): Space {
        if (!this.instance)
            this.instance = new Space();

        return this.instance;
    }
}

export default Space.ins;