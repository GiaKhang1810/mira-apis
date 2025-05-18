import 'express-serve-static-core';

declare module 'express-serve-static-core' {
    export interface Request {
        userID?: string;
        query: {
            username?: string;
            url?: string;
            storyID?: string;
            albumID?: string;
        }
        body: {
            username?: string;
            url?: string;
            storyID?: string;
            albumID?: string;
        }
    }
}