export namespace GetReelAndPost {
    export interface DisplayResource {
        src: string;
        config_width: number;
        config_height: number;
    }

    export interface Display {
        url: string;
        width: number;
        height: number;
    }

    export interface Image {
        id: string;
        shortcode: string;
        width: number;
        height: number;
        display_url: string;
        display_resources: Array<Display>;
    }

    export interface SideCar {
        node: {
            id: string;
            shortcode: string;
            dimensions: {
                height: number;
                width: number;
            }
            display_url: string;
            display_resources: Array<DisplayResource>;
            is_video: boolean;
        }
    }

    export interface OwnerDetails {
        id: string;
        username: string;
        is_verified: boolean;
        profile_pic_url: string;
        full_name: string;
        is_private: boolean;
        edge_owner_to_timeline_media: {
            count: number;
        }
        edge_followed_by: {
            count: number;
        }
    }

    export interface Media {
        __typename: string;
        id: string;
        shortcode: string;
        thumbnail_src: string;
        dimensions: {
            height: number;
            width: number;
        }
        display_url: string;
        is_video: boolean;
        display_resources: Array<DisplayResource>;
        has_audio: boolean;
        video_url: string;
        video_view_count: number;
        video_play_count: number;
        is_published: boolean;
        title: string;
        video_duration: number;
        clips_music_attribution_info: {
            artist_name: string;
            song_name: string;
            uses_original_audio: boolean;
            should_mute_audio: boolean;
            should_mute_audio_reason: string;
            audio_id: string;
        }
        owner: OwnerDetails;
        edge_media_to_caption: {
            edges: [
                {
                    node: {
                        created_at: number,
                        text: string,
                        id: string;
                    }
                }
            ];
        }
        edge_media_to_parent_comment: {
            count: number;
        }
        edge_media_preview_like: {
            count: number;
        }
        taken_at_timestamp: number;
        edge_sidecar_to_children: {
            edges: Array<SideCar>;
        }
    }

    export interface OriDetails {
        data: {
            xdt_shortcode_media: Media;
        }
    }

    export interface OutputDetails {    
        owner: {
            userID: string;
            username: string;
            verified: boolean;
            private: boolean;
            name: string;
            avatar: string;
            followerCount: number;
            postCount: number;
        }
        isVideo: boolean;
        title: string;
        caption: string;
        commentCount: number;
        likeCount: number;
        playCount: number;
        thumbnail_url: string;
        display_url: string;
        height: number;
        width: number;
        display_resources: Array<Display>;
        images: Array<Image>;
        video_url: string;
        video_duration: number;
        has_audio: boolean;
        audio: {
            author: string;
            song: string;
            oriAudio: boolean;
            should_mute: boolean;
            mute_reason: string;
            id: string;
        }
    }
}