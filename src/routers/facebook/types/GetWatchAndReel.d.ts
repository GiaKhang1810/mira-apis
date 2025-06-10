export namespace GetWatchAndReel {
    export interface ComponentThumbnail {
        id: string;
        height: number;
        width: number;
        uri: string;
    }

    export interface MediaWithoutCookie {
        media: {
            owner: {
                id: string;
            }
            videoDeliveryLegacyFields: {
                browser_native_hd_url: string;
                browser_native_sd_url: string;
            }
            publish_time: number;
        }
    }

    export interface OriDetailsWithoutCookie {
        id: string;
        story: {
            attachments: Array<MediaWithoutCookie>;
        }
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
        publishedAt: string | number;
        reactCount: number;
        commentCount: number;
        url: string;
        thumbnails: Array<ComponentThumbnail>;
    }
}