import { Request } from '@utils/request';
import { JSDOM as DOM } from 'jsdom';
import { GetPostDetails } from './types';

const requestOptions: RequestURL.Options = {
    headers: {
        'Authority': 'www.threads.net',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
    }
}
const request: Request = new Request(requestOptions);

function createError(message: string, name: string): Error {
    const error: Error = new Error(message);
    error.name = name;
    return error;
}

export async function getPostDetails(url: string): Promise<GetPostDetails.OutputDetails> {
    const response: RequestURL.Response<string> = await request.get<string>(url);
    const dom: DOM = new DOM(response.body);
    const scripts: Array<HTMLScriptElement> = Array.from(dom.window.document.querySelectorAll('script'));

    let script: HTMLScriptElement | undefined = scripts.find((item: HTMLScriptElement): boolean => !!item.textContent && item.textContent.includes('username') && item.textContent.includes('original_width'));

    if (!script || !script.textContent)
        throw createError('Can\'t find image/video in url', '404');

    const body: GetPostDetails.Content = JSON.parse(script.textContent);
    const info: GetPostDetails.OriDetails = body?.require?.[0]?.[3]?.[0]?.__bbox?.require?.[0]?.[3]?.[1]?.__bbox?.result?.data?.data?.edges?.[0];

    if (!info)
        throw createError('Can\'t find image/video in url', '404');

    const data: GetPostDetails.Component = info?.node?.thread_items?.[0]?.post;

    if (!data)
        throw createError('Can\'t find image/video in url', '404');

    const output: GetPostDetails.OutputDetails = {
        owner: {
            id: data?.user?.id,
            username: data?.user?.username,
            name: data?.user?.full_name,
            isVerified: data?.user?.is_verified,
            avatar: data?.user?.profile_pic_url
        },
        caption: data?.caption?.text,
        createAt: data?.taken_at,
        reshareCount: data?.text_post_app_info?.reshare_count,
        replyCount: data?.text_post_app_info?.direct_reply_count,
        repostCount: data?.text_post_app_info?.repost_count,
        quoteCount: data?.text_post_app_info?.quote_count,
        likeCount: data?.like_count,
        videos: [],
        images: []
    }

    if (data.text_post_app_info.link_preview_attachment)
        output.attachment = {
            display: data.text_post_app_info.link_preview_attachment?.display_url,
            favicon: data.text_post_app_info.link_preview_attachment?.favicon_url,
            image: data.text_post_app_info.link_preview_attachment?.image_url,
            title: data.text_post_app_info.link_preview_attachment?.title,
            url: data.text_post_app_info.link_preview_attachment?.url
        }

    if (data.carousel_media) {
        for (let i: number = 0; i < data.carousel_media.length; i++) {
            const media: GetPostDetails.Media = data.carousel_media[i];

            if (media.video_versions && media.video_versions.length > 0)
                output.videos.push(media.video_versions[0].url);
            else if (media.image_versions2 && media.image_versions2.candidates.length > 0)
                output.images.push(media.image_versions2.candidates[0]);
        }
    } else {
        if (data.video_versions && data.video_versions.length > 0)
            output.videos.push(data.video_versions[0].url);
        else if (data.image_versions2 && data.image_versions2.candidates.length > 0)
            output.images.push(data.image_versions2.candidates[0]);
        else if (data.audio)
            output.audio = data.audio.audio_src;
    }

    return output;
}