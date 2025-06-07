import { Request } from '@utils/request';
import { GetAddrDetails } from './types';

const request: Request = new Request({ core: 'fetch' });

export async function getRedirectURL(url: string): Promise<string> {
    const response: Request.Response<string> = await request.head<string>(url);
    const location: string | undefined = response.headers.location;

    if (!location) {
        const error: Error = new Error();
        error.name = '404';
        error.message = 'Redirect location not found or location isn\'t public';
        throw error;
    }

    return location;
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

export async function getAddrDetails(awemeID: string): Promise<GetAddrDetails.OutputDetails> {
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