namespace DataBase {
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
        findAll(): Promise<Array<T>>;
        findOne(condition: Record<string, any>): Promise<T | void>
        create(data: T): Promise<T>;
        delete(): Promise<void>;
        deleteOne(condition: Record<string, any>): Promise<void>;
        updateOne(data: Record<string, any>, condition: Record<string, any>): Promise<boolean>;
        count(): Promise<number>;
    }
}