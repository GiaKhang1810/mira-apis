import 'express';

declare module 'express' {
    export interface Request {
        userID?: string;
    }

    export interface Response {}
}