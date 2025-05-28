import { Request, CookieManager } from '@utils/request';
import { GetReelAndPost } from './types';
import writer from '@utils/writer';

const requestOptions: RequestURL.Options = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Instagram 123.0.0.21.114 Android (28/9; 420dpi; 1080x1920; Xiaomi; Redmi Note 7; lavender; qcom; en_US)',
        'X-IG-App-ID': '936619743392459'
    },
    maxRedirect: 0,
    responseType: 'text',
    core: 'fetch'
}
const request: Request = new Request(requestOptions);

async function getCSRFT(): Promise<string> {
    await request.head<string>('https://www.instagram.com/graphql/query/', undefined, {
        params: {
            doc_id: '7950326061742207',
            variables: JSON.stringify({
                id: '59237287799',
                include_clips_attribution_info: false,
                first: 12
            })
        }
    });
    const jar: CookieManager = request.getJar();
    const cookies: Record<string, string> = jar.getCookie('https://www.instagram.com/');
    const token: string | undefined = cookies.csrftoken;

    if (!token) {
        const error: Error = new Error('Can\'t find token.');
        error.name = 'MissingSetCookie';
        throw error;
    }

    return token;
}

export async function getRedirectURL(url: string): Promise<string> {
    const response: RequestURL.Response<string> = await request.get<string>(url, undefined, {
        validateStatus: (status: number): boolean => status === 302
    });
    const location: string | undefined = response.headers.location;

    if (!location) {
        const error: Error = new Error();
        error.name = '404';
        error.message = 'Redirect location not found or location isn\'t public';
        throw error;
    }

    return location;
}

export async function getReelAndPost(shortcode: string, retries: number = 0): Promise<GetReelAndPost.OutputDetails> {
    try {
        if (retries === 5) {
            const error: Error = new Error('Unable to access.');
            error.name = '400';
            throw error;
        }

        if (retries > 0)
            await new Promise((resolve: TimerHandler): number => setTimeout(resolve, 2000));

        const data: URLSearchParams = new URLSearchParams({
            variables: JSON.stringify({
                shortcode,
                fetch_tagged_user_count: null,
                hoisted_comment_id: null,
                hoisted_reply_id: null
            }),
            doc_id: '9510064595728286'
        });
        const response: RequestURL.Response<string> = await request.post<string>('https://www.instagram.com/graphql/query/', undefined, {
            data,
            headers: {
                'X-CSRFToken': await getCSRFT()
            }
        });
        const info: GetReelAndPost.OriDetails = JSON.parse(response.body);
        const media: GetReelAndPost.Media = info?.data?.xdt_shortcode_media;
        const owner: GetReelAndPost.OwnerDetails = media?.owner;
        const output: GetReelAndPost.OutputDetails = {
            owner: {
                userID: owner?.id,
                username: owner?.username,
                name: owner?.full_name,
                verified: owner?.is_verified,
                private: owner?.is_private,
                postCount: owner?.edge_owner_to_timeline_media?.count,
                followerCount: owner?.edge_followed_by?.count,
                avatar: owner?.profile_pic_url
            },
            isVideo: media?.is_video,
            shortcode,
            title: media?.title,
            caption: media?.edge_media_to_caption?.edges[0]?.node?.text,
            commentCount: media?.edge_media_to_parent_comment?.count,
            likeCount: media?.edge_media_preview_like?.count,
            playCount: media?.video_play_count,
            thumbnail_url: media?.thumbnail_src,
            display_url: media?.display_url,
            display_resources: media?.display_resources?.map((item: GetReelAndPost.DisplayResource): GetReelAndPost.Display => ({
                url: item?.src,
                height: item?.config_height,
                width: item?.config_width
            })),
            height: media?.dimensions?.height,
            width: media?.dimensions?.width,
            video_url: media?.video_url,
            video_duration: media?.video_duration,
            images: [],
            has_audio: media?.has_audio,
            audio: {
                author: media?.clips_music_attribution_info?.artist_name,
                song: media?.clips_music_attribution_info?.song_name,
                oriAudio: media?.clips_music_attribution_info?.uses_original_audio,
                should_mute: media?.clips_music_attribution_info?.should_mute_audio,
                mute_reason: media?.clips_music_attribution_info?.should_mute_audio_reason,
                id: media?.clips_music_attribution_info?.audio_id
            }
        }

        if (media?.__typename === 'XDTGraphSidecar') {
            for (const child of media?.edge_sidecar_to_children?.edges) {
                const image: GetReelAndPost.Image = {
                    id: child?.node?.id,
                    shortcode: child?.node?.shortcode,
                    width: child?.node?.dimensions?.width,
                    height: child?.node?.dimensions?.height,
                    display_url: child?.node?.display_url,
                    display_resources: child?.node?.display_resources?.map((item: GetReelAndPost.DisplayResource): GetReelAndPost.Display => ({
                        url: item?.src,
                        height: item?.config_height,
                        width: item?.config_width
                    }))
                }
                output.images.push(image);
            }
        }

        if (!output.isVideo) {
            for (const image of output.images) 
                await writer.download(image.display_url, image.shortcode);
        }

        if (output.isVideo)
            await writer.download(output.video_url, shortcode);

        return output;
    } catch (error: any) {
        const retriesCode: Array<number> = [429, 403];

        if (error.response && retriesCode.includes(error.response.status) && retries < 5)
            return await getReelAndPost(shortcode, retries + 1);

        throw error;
    }
}

export async function getUserInfo(username: string): Promise<void> {

}