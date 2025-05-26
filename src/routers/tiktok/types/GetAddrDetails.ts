export namespace GetAddrDetails {
    export interface ComponentOutputURL {
        size?: number;
        uri: string;
        height: number;
        width: number;
        other: Array<string>;
    }

    export interface ComponentOriURL {
        data_size?: number;
        uri: string;
        height: number;
        width: number;
        url_list: Array<string>;
    }

    export interface OriStatistics {
        collect_count: number;
        comment_count: number;
        digg_count: number;
        download_count: number;
        share_count: number;
        play_count: number;
        repost_count: number;
    }

    interface OriAuthor {
        avatar_168x168: ComponentOriURL;
        avatar_300x300: ComponentOriURL;
        avatar_larger: ComponentOriURL;
        avatar_medium: ComponentOriURL;
        avatar_thumb: ComponentOriURL;
        nickname: string;
        sec_uid: string;
        signature: string;
        uid: string;
        unique_id: string;
    }

    export interface OriMusic {
        album: string;
        author: string;
        audition_duration: number;
        video_duration: number;
        title: string;
        sec_uid: string;
        strong_beat_url: ComponentOriURL;
        mid: string;
        owner_handle: string;
        owner_id: string;
        owner_nickname: string;
        play_url: ComponentOriURL;
        create_time: number;
        duration: number;
        cover_large: ComponentOriURL;
        cover_medium: ComponentOriURL;
        cover_thumb: ComponentOriURL;
    }

    export interface OriVideo {
        play_addr: ComponentOriURL;
        origin_cover: ComponentOriURL;
        width: number;
        height: number;
        ratio: string;
        duration: number;
        download_no_watermark_addr: ComponentOriURL;
        download_addr: ComponentOriURL;
        download_suffix_logo_addr: ComponentOriURL;
        cover: ComponentOriURL;
        ai_dynamic_cover_bak: ComponentOriURL;
        ai_dynamic_cover: ComponentOriURL;
    }

    export interface ComponentOriTextExtra {
        hashtag_id: string;
        hashtag_name: string;
        start: number;
        end: number;
    }

    export interface ComponentOriImage {
        display_image: ComponentOriURL;
        owner_watermark_image: ComponentOriURL;
        thumbnail: ComponentOriURL;
        user_watermark_image: ComponentOriURL;
    }

    export interface OutputHashTag {
        id: string;
        name: string;
        start: number;
        end: number;
    }

    export interface OriImage {
        image_post_cover: {
            display_image: ComponentOriURL;
            owner_watermark_image: ComponentOriURL;
            thumbnail: ComponentOriURL;
            user_watermark_image: ComponentOriURL;
        }
        images: Array<ComponentOriImage>;
    }

    export interface AwemeDetail {
        author: OriAuthor;
        content_type: string;
        desc: string;
        create_time: number;
        statistics: OriStatistics;
        added_sound_music_info: OriMusic;
        music: OriMusic;
        stickers: string;
        original_client_text: {
            markup_text: string;
        }
        text_extra: Array<ComponentOriTextExtra>;
        video: OriVideo;
        image_post_info?: OriImage;
    }

    export interface OriDetails {
        aweme_detail: AwemeDetail;
    }

    export interface ComponentOutputImage {
        display: ComponentOutputURL;
        ownerWatermark: ComponentOutputURL;
        thumbnail: ComponentOutputURL;
        userWatermark: ComponentOutputURL;
    }

    export interface OutputDetails {
        owner: {
            userID: string;
            username: string;
            nickname: string;
            sig: string;
            secUID: string;
            avatar: {
                x168: ComponentOutputURL;
                x300: ComponentOutputURL;
                medium: ComponentOutputURL;
                large: ComponentOutputURL;
                thumb: ComponentOutputURL;
            }
        },
        collectCount: number;
        commentCount: number;
        diggCount: number;
        downloadCount: number;
        shareCount: number;
        playCount: number;
        repostCount: number;
        caption: string;
        createAt: number;
        hashtag: Array<OutputHashTag>;
        music: {
            id: string;
            album: string;
            author: string;
            ownerHandle: string;
            ownerID: string;
            ownerNickname: string;
            duration: number;
            title: string;
            secUID: string;
            strongBeatURL: ComponentOutputURL;
            url: ComponentOutputURL;
            createAt: number;
            cover: {
                medium: ComponentOutputURL;
                large: ComponentOutputURL;
                thumb: ComponentOutputURL;
            }
        }
        video: {
            playAddr: ComponentOutputURL;
            oriCover: ComponentOutputURL;
            width: number;
            height: number;
            ratio: string;
            duration: number;
            withoutWatermark?: ComponentOutputURL;
            watermark?: ComponentOutputURL;
            suffix?: ComponentOutputURL;
            cover: ComponentOutputURL;
            dynamicCover: ComponentOutputURL;
        }
        image?: {
            display: ComponentOutputURL;
            ownerWatermark: ComponentOutputURL;
            thumbnail: ComponentOutputURL;
            userWatermark: ComponentOutputURL;
            list: Array<ComponentOutputImage>;
        }
    }
}