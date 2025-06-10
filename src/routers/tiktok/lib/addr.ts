import { Request } from '@utils/request';

const request: Request = new Request({ core: 'fetch', maxRedirects: 1 });

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

function getComponentOutputURL(info: GetAddrDetails.ComponentOriURL): GetAddrDetails.ComponentOutputURL {
    const output: GetAddrDetails.ComponentOutputURL = {
        uri: info?.uri,
        height: info?.height,
        width: info?.width,
        other: info?.url_list
    }

    if (info && info.data_size)
        output.size = info?.data_size;

    return output;
}

export async function getAddr(awemeID: string): Promise<GetAddrDetails.OutputDetails> {
    const response: Request.Response<string> = await request.options<string>('https://api16-normal-c-alisg.tiktokv.com/aweme/v1/aweme/detail/', undefined, {
        params: {
            aweme_id: awemeID
        }
    });
    const info: GetAddrDetails.OriDetails = JSON.parse(response.body);
    const aweme: GetAddrDetails.AwemeDetail = info?.aweme_detail;
    const statistics: GetAddrDetails.OriStatistics = aweme?.statistics;
    const music: GetAddrDetails.OriMusic = aweme?.music ?? aweme?.added_sound_music_info;
    const video: GetAddrDetails.OriVideo = aweme?.video;

    const output: GetAddrDetails.OutputDetails = {
        owner: {
            userID: aweme?.author?.uid,
            username: aweme?.author?.unique_id,
            nickname: aweme?.author?.nickname,
            sig: aweme?.author?.signature,
            secUID: aweme?.author?.sec_uid,
            avatar: {
                x168: getComponentOutputURL(aweme?.author?.avatar_168x168),
                x300: getComponentOutputURL(aweme?.author?.avatar_300x300),
                medium: getComponentOutputURL(aweme?.author?.avatar_medium),
                large: getComponentOutputURL(aweme?.author?.avatar_larger),
                thumb: getComponentOutputURL(aweme?.author?.avatar_thumb)
            }
        },
        collectCount: statistics?.collect_count,
        commentCount: statistics?.comment_count,
        diggCount: statistics?.digg_count,
        downloadCount: statistics?.download_count,
        repostCount: statistics?.repost_count,
        playCount: statistics?.play_count,
        shareCount: statistics?.share_count,
        createAt: aweme?.create_time,
        caption: aweme?.desc,
        hashtag: aweme?.text_extra?.map((item: GetAddrDetails.ComponentOriTextExtra): GetAddrDetails.OutputHashTag => ({
            id: item?.hashtag_id,
            name: item?.hashtag_name,
            start: item?.start,
            end: item?.end
        })),
        music: {
            id: music?.mid,
            album: music?.album,
            author: music?.author,
            ownerHandle: music?.owner_handle,
            ownerID: music?.owner_id,
            ownerNickname: music?.owner_nickname,
            duration: (music?.duration ?? music?.video_duration ?? music?.audition_duration ?? null) * 1000,
            title: music?.title,
            secUID: music?.sec_uid,
            strongBeatURL: getComponentOutputURL(music?.strong_beat_url),
            url: getComponentOutputURL(music?.play_url),
            createAt: music?.create_time,
            cover: {
                medium: getComponentOutputURL(music?.cover_medium),
                large: getComponentOutputURL(music?.cover_large),
                thumb: getComponentOutputURL(music?.cover_thumb)
            }
        },
        video: {
            playAddr: getComponentOutputURL(video?.play_addr),
            oriCover: getComponentOutputURL(video?.origin_cover),
            width: video?.width,
            height: video?.height,
            ratio: video?.ratio,
            duration: video?.duration,
            cover: getComponentOutputURL(video?.cover),
            dynamicCover: getComponentOutputURL(video?.ai_dynamic_cover ?? video?.ai_dynamic_cover_bak)
        }
    }

    if (video.download_addr)
        output.video.watermark = getComponentOutputURL(video?.download_addr);

    if (video.download_no_watermark_addr)
        output.video.withoutWatermark = getComponentOutputURL(video?.download_no_watermark_addr);

    if (video.download_suffix_logo_addr)
        output.video.suffix = getComponentOutputURL(video?.download_suffix_logo_addr);

    if (aweme.image_post_info)
        output.image = {
            display: getComponentOutputURL(aweme?.image_post_info?.image_post_cover?.display_image),
            ownerWatermark: getComponentOutputURL(aweme?.image_post_info?.image_post_cover?.owner_watermark_image),
            thumbnail: getComponentOutputURL(aweme?.image_post_info?.image_post_cover?.thumbnail),
            userWatermark: getComponentOutputURL(aweme?.image_post_info?.image_post_cover?.user_watermark_image),
            list: aweme?.image_post_info?.images?.map((item: GetAddrDetails.ComponentOriImage): GetAddrDetails.ComponentOutputImage => ({
                display: getComponentOutputURL(item?.display_image),
                ownerWatermark: getComponentOutputURL(item?.owner_watermark_image),
                thumbnail: getComponentOutputURL(item?.thumbnail),
                userWatermark: getComponentOutputURL(item?.user_watermark_image)
            }))
        }

    return output;
}