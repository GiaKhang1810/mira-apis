import 'express-serve-static-core';

type File = {
    name: string;
    data: Buffer;
    dir: string;
}

declare module 'express-serve-static-core' {
    export interface Request {
        userID?: string;
        query: {
            username?: string;
            url?: string;
            storyID?: string;
            albumID?: string;
            shortcode?: string;
            download?: boolean;
            count?: number;
        }
        body: {
            username?: string;
            url?: string;
            storyID?: string;
            albumID?: string;
            shortcode?: string;
            download?: boolean;
            count?: number;
        }
    }
}