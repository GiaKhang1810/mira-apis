import { resolve } from 'path';
import { Sequelize } from 'sequelize';

export namespace DataBase {
    export interface User {
        id?: number;
        userID: string;
        username: string | 'Mira User';
        email: string;
        password: string;
        bannedAt?: number | 0;
        bannedReason?: string | '';
        createAt?: Date;
        updatedAt?: Date;
    }

    export interface Tokens {
        id?: number;
        userID: string;
        token: string;
        rateLimit: number | 1000;
        requestCount: number | 0;
        createAt?: Date;
        updatedAt?: Date;
    }

    export interface Model {
        findAll(): Promise<Array<any>>;
        findOne(condition: Record<string, any>): Promise<any | void>;
        create(data: Record<string, any>): Promise<any>;
        delete(): Promise<void>;
        deleteOne(condition: Record<string, any>): Promise<void>;
        updateOne(data: Record<string, any>, condition: Record<string, any>): Promise<boolean>;
        count(): Promise<number>;
    }
}

export const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: resolve(__dirname, (process.env.STORAGE ?? 'database') + '.sqlite'),
    pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 20000
    },
    retry: {
        match: [/SQLITE_BUSY/],
        name: 'query',
        max: 20
    },
    logging: false,
    define: {
        underscored: false,
        freezeTableName: true,
        charset: 'UTF-8',
        timestamps: true
    },
    sync: {
        force: false,
        alter: true
    }
});

export default sequelize;