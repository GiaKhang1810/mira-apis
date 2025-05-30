export namespace GetWatchAndReel {
    export interface ComponentThumbnail {
        id: string;
        height: number;
        width: number;
        uri: string;
    }

    export interface OriDetails {
        error?: {
            message: string
        }
        id: string;
        description: string;
        created_time: string;
        source: string;
        thumbnails: {
            data: Array<ComponentThumbnail>
        }
        reactions: {
            summary: {
                total_count: number;
            }
        }
        comments: {
            summary: {
                total_count: number;
            }
        }
        from: {
            name: string;
            id: string;
        }
    }

    export interface OutputDetails {
        videoID: string;
        userID: string;
        author: string;
        desc: string;
        publishedAt: string;
        reactCount: number;
        commentCount: number;
        url: string;
        thumbnails: Array<ComponentThumbnail>;
    }
}