import { Session, Request } from '@utils/request';
import { GetUserID, GetStory, GetWatchAndReel } from './types';
import { JSDOM as DOM } from 'jsdom';

const requestOptions: Request.Options = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    maxRedirects: 1,
    type: 'text',
    core: 'fetch'
}

const request: Request = new Request(requestOptions);

function getGUID(): string {
    let sectionLength: number = Date.now();
    const id: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
        const r: number = Math.floor((sectionLength + Math.random() * 16) % 16);
        sectionLength = Math.floor(sectionLength / 16);
        const _guid: string = (c === 'x' ? r : (r & 7) | 8).toString(16);
        return _guid;
    });
    return id;
}

function createData(docID: string, variables: Record<string, any>, dtsg: boolean = false): URLSearchParams {
    return new URLSearchParams({
        fb_dtsg: dtsg && process.env.DTSG ? process.env.DTSG : 'Đây là mã fb_dtsg:D',
        variables: JSON.stringify(variables),
        server_timestamps: 'true',
        doc_id: docID
    });
}

export async function getRedirectURL(url: string): Promise<string> {
    const response: Request.Response<string> = await request.get<string>(url, new Session(process.env.FACEBOOK_COOKIE, 'https://www.facebook.com/'), {
        confirmStatus: (status: number): boolean => status === 302
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

export async function getUserID(username: string): Promise<string> {
    const data: URLSearchParams = createData('9946783172059974', {
        count: 5,
        allow_streaming: false,
        args: {
            callsite: 'COMET_GLOBAL_SEARCH',
            config: {
                exact_match: false,
                high_confidence_config: null,
                intercept_config: null,
                sts_disambiguation: null,
                watch_config: null
            },
            context: {
                bsid: getGUID(),
                tsid: null
            },
            experience: {
                encoded_server_defined_params: null,
                fbid: null,
                type: 'PEOPLE_TAB'
            },
            filters: [],
            text: username.toLowerCase()
        },
        cursor: null,
        feedbackSource: 23,
        fetch_filters: true,
        renderLocation: 'search_results_page',
        scale: 1,
        stream_initial_count: 0,
        useDefaultActor: false,
        __relay_internal__pv__IsWorkUserrelayprovider: false,
        __relay_internal__pv__IsMergQAPollsrelayprovider: false,
        __relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider: false,
        __relay_internal__pv__StoriesRingrelayprovider: false
    });
    const jar: Session = new Session(process.env.FACEBOOK_COOKIE, 'https://www.facebook.com/');
    const response: Request.Response<string> = await request.post<string>('https://www.facebook.com/api/graphql/', jar, { body: data });
    const body: GetUserID = JSON.parse(response.body.split('\n')[0]);
    const userID: string = body.data?.serpResponse?.results?.edges[0]?.relay_rendering_strategy?.view_model?.profile?.id;

    if (userID)
        return userID;

    const error: Error = new Error();
    error.name = '404';
    error.message = 'Can\'t find userID from username.';
    throw error;
}

export async function getStoryDetails(albumID: string, storyID?: string): Promise<GetStory.OutputDetails> {
    const data: URLSearchParams = createData('9476908792385858', {
        bucketIDs: storyID ? [albumID, storyID] : albumID,
        scale: 1,
        blur: 100,
        shouldEnableArmadilloStoryReply: true,
        shouldEnableLiveInStories: true,
        feedbackSource: '65',
        useDefaultActor: false,
        feedLocation: 'COMET_MEDIA_VIEWER',
        focusCommentID: null,
        shouldDeferLoad: false,
        isStoriesArchive: false,
        __relay_internal__pv__IsWorkUserrelayprovider: false
    });

    const response: Request.Response<string> = await request.post<string>('https://www.facebook.com/api/graphql/', undefined, { body: data });
    const info: GetStory.OriDetails = JSON.parse(response.body.split('\n')[0]);

    if (info?.data?.nodes?.length === 0) {
        const extraData: URLSearchParams = createData('9783567355043674', {
            blur: 100,
            bucketID: albumID,
            feedbackSource: 65,
            feedLocation: 'COMET_MEDIA_VIEWER',
            focusCommentID: null,
            initialBucketID: albumID,
            initialLoad: true,
            isStoriesArchive: false,
            scale: 1,
            shouldDeferLoad: false,
            shouldEnableArmadilloStoryReply: true,
            shouldEnableLiveInStories: true,
            __relay_internal__pv__IsWorkUserrelayprovider: false,
            __relay_internal__pv__StoriesLWRVariantrelayprovider: 'www_new_reactions'
        }, true);
        const jar: Session = new Session(process.env.FACEBOOK_COOKIE, 'https://www.facebook.com/');
        const extraResponse: Request.Response<string> = await request.post<string>('https://www.facebook.com/api/graphql/', jar, { body: extraData });
        const extra: GetStory.OriDetailsExtra = JSON.parse(extraResponse.body.split('\n')[0]);

        if (!extra.data?.bucket) {
            const error: Error = new Error('No access to resources.');
            error.name = '400';
            throw error;
        }

        const owner: GetStory.OwnerDetails = extra?.data?.bucket?.story_bucket_owner;
        const output: GetStory.OutputDetails = {
            userID: owner?.id,
            name: owner?.name,
            title: extra?.data?.bucket?.name,
            videos: []
        }

        const queue: Array<Promise<GetWatchAndReel.OutputDetails>> = [];

        for (let dash of extra?.data?.bucket?.unified_stories?.edges)
            queue.push(getWatchAndReel(dash?.node?.attachments?.[0]?.media?.id));

        const queued: Array<GetWatchAndReel.OutputDetails> = await Promise.all(queue);

        for (let dash of queued) {
            const video: GetStory.OutputVideo = {
                id: dash?.videoID,
                url: dash?.url,
                thumbnails: dash?.thumbnails?.map((item: GetWatchAndReel.ComponentThumbnail): GetStory.ComponentNail => ({
                    id: item?.id,
                    height: item?.height,
                    width: item?.width,
                    url: item?.uri
                }))
            }
            output.videos.push(video);
        }

        return output;
    }

    const owner: GetStory.OwnerDetails = info?.data?.nodes[0]?.owner;
    const edges: GetStory.Edges = info?.data?.nodes[0]?.unified_stories.edges[0]?.node;
    const media: GetStory.Media = edges?.attachments[0].media;

    const output: GetStory.OutputDetails = {
        userID: owner?.id,
        name: owner?.name,
        title: media?.title?.text,
        publishedAt: media?.publish_time,
        react_total: edges?.story_card_info?.feedback_summary?.total_reaction_count,
        videos: []
    }

    if (info.extensions && info.extensions.all_video_dash_prefetch_representations) {
        const queue: Array<Promise<GetWatchAndReel.OutputDetails>> = [];

        for (let dash of info.extensions.all_video_dash_prefetch_representations)
            queue.push(getWatchAndReel(dash.video_id));

        const queued: Array<GetWatchAndReel.OutputDetails> = await Promise.all(queue);

        for (let dash of queued) {
            const video: GetStory.OutputVideo = {
                id: dash?.videoID,
                url: dash?.url,
                thumbnails: dash?.thumbnails?.map((item: GetWatchAndReel.ComponentThumbnail): GetStory.ComponentNail => ({
                    id: item?.id,
                    height: item?.height,
                    width: item?.width,
                    url: item?.uri
                }))
            }
            output.videos.push(video);
        }
    } else {
        const watch: GetWatchAndReel.OutputDetails = await getWatchAndReel(media.videoId);
        const video: GetStory.OutputVideo = {
            id: media?.videoId,
            url: watch?.url,
            thumbnails: watch?.thumbnails.map((item: GetWatchAndReel.ComponentThumbnail): GetStory.ComponentNail => ({
                id: item?.id,
                height: item?.height,
                width: item?.width,
                url: item?.uri
            }))
        }
        output.videos.push(video);
    }

    return output;
}

export async function getWatchAndReel(videoID: string): Promise<GetWatchAndReel.OutputDetails> {
    let output: GetWatchAndReel.OutputDetails;

    if (process.env.FACEBOOK_COOKIE) {
        const srcURL: string = 'https://graph.facebook.com/v18.0/' + videoID;
        const response: Request.Response<string> = await request.get<string>(srcURL, undefined, {
            params: {
                fields: 'id,description,created_time,source,thumbnails,reactions.summary(true),comments.summary(true),from{name,id}',
                access_token: process.env.FACEBOOK_TOKEN
            }
        });
        const body: GetWatchAndReel.OriDetails = JSON.parse(response.body);

        if (body.error) {
            const error: Error = new Error(body.error?.message);
            error.name = '403';
            throw error;
        }

        output = {
            videoID: body?.id,
            userID: body?.from?.id,
            author: body?.from?.name,
            desc: body?.description,
            publishedAt: body?.created_time,
            reactCount: body?.reactions?.summary?.total_count,
            commentCount: body?.comments?.summary?.total_count,
            url: body?.source,
            thumbnails: body?.thumbnails?.data?.map((item: GetWatchAndReel.ComponentThumbnail): GetWatchAndReel.ComponentThumbnail => ({
                id: item?.id,
                height: item?.height,
                width: item?.width,
                uri: item?.uri
            }))
        }
    } else {
        const response: Request.Response<string> = await request.get<string>('https://www.facebook.com/watch/?v=' + videoID, undefined, {
            core: 'axios',
            headers: {
                'Sec-Fetch-User': '?1',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Cache-Control': 'max-age=0',
                'Authority': 'www.facebook.com',
                'Upgrade-Insecure-Requests': '1',
                'Accept-Language': 'en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6',
                'Sec-Ch-Ua': '\'Google Chrome\';v="89", \'Chromium\';v="89", \';Not A Brand\';v="99"',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'

            }
        });
        const dom: DOM = new DOM(response.body);
        const scripts: Array<HTMLScriptElement> = Array.from(dom.window.document.querySelectorAll('script'));
        const script: HTMLScriptElement | undefined = scripts.find((item: HTMLScriptElement): boolean => !!item.textContent && (item.textContent.includes('playable_url_quality_hd') && item.textContent.includes('playable_url') || item.textContent.includes('browser_native_hd_url') && item.textContent.includes('browser_native_sd_url')));

        if (!script || !script.textContent) {
            const error: Error = new Error('Can\'t find video data.');
            error.name = '404';
            throw error;
        }

        const body: GetWatchAndReel.OriDetailsWithoutCookie = JSON.parse(script.textContent)?.require?.[0]?.[3]?.[0]?.__bbox?.require?.[7]?.[3]?.[1]?.__bbox?.result?.data?.video;
        const info: GetWatchAndReel.MediaWithoutCookie = body?.story?.attachments?.[0];

        output = {
            videoID: body?.id,
            userID: info?.media?.owner?.id,
            author: '',
            desc: '',
            publishedAt: info?.media?.publish_time,
            reactCount: 0,
            commentCount: 0,
            url: info?.media?.videoDeliveryLegacyFields?.browser_native_hd_url,
            thumbnails: []
        }
    }

    return output;
}