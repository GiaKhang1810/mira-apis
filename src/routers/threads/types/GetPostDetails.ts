export namespace GetPostDetails {
    export interface ComponentOriPhoto {
        url: string;
        height: number;
        width: number;
    }

    export interface ComponentOriVideo {
        type: number;
        url: string;
    }

    export interface Content {
        require: {
            0: {
                3: {
                    0: { __bbox: Content; }
                    1: { __bbox: BBoxResult; }
                }
            }
        }
    }

    interface BBoxResult {
        result: {
            data: {
                data: {
                    edges: Array<OriDetails>;
                }
            }
        }
    }

    interface User {
        id: string;
        username: string;
        full_name: string;
        is_verified: boolean;
        profile_pic_url: string;
    }

    export interface Media {
        image_versions2: {
            candidates: Array<ComponentOriPhoto>;
        }
        video_versions: Array<ComponentOriVideo> | null;
    }

    export interface Post {
        reshare_count: number;
        direct_reply_count: number;
        repost_count: number;
        quote_count: number;
    }

    export interface Component {
        user: User;
        caption: {
            text: string
        }
        audio: {
            audio_src: string;
        } | null;
        carousel_media: Array<Media> | null;
        like_count: number;
        taken_at: number;
        text_post_app_info: Post;
        original_height: number;
        original_width: number;
        image_versions2: {
            candidates: Array<ComponentOriPhoto>;
        } | null;
        video_versions: Array<ComponentOriVideo> | null;
    }

    export interface OriDetails {
        node: {
            thread_items: Array<{ post: Component }>;
        }
    }

    export interface OutputDetails {
        owner: {
            id: string;
            username: string;
            name: string;
            isVerified: boolean;
            avatar: string;
        }
        caption: string;
        createAt: number;
        reshareCount: number;
        replyCount: number;
        repostCount: number;
        quoteCount: number;
        likeCount: number;
        audio?: string;
        images: Array<ComponentOriPhoto>;
        videos: Array<string>;
    }
}
