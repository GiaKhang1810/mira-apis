import { Request, CookieManager } from '@utils/request';
import {
    GetUserID,
    GetStory,
    GetWatchAndReel
} from './types';
import writer from '@utils/writer';

const requestOptions: RequestURL.Options = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    maxRedirect: 0,
    jar: new CookieManager(process.env.FACEBOOK_COOKIE, ['https://www.facebook.com/', 'https://graph.facebook.com/']),
    responseType: 'text'
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

function createData(docID: string, variables: Record<string, any>): URLSearchParams {
    return new URLSearchParams({
        fb_dtsg: process.env.DTSG!,
        variables: JSON.stringify(variables),
        server_timestamps: 'true',
        doc_id: docID
    });
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
    const response: RequestURL.Response<string> = await request.post<string>('https://www.facebook.com/api/graphql/', undefined, { data });
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
        blur: 10,
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

    const response: RequestURL.Response<string> = await request.post<string>('https://www.facebook.com/api/graphql/', undefined, { data });
    const info: GetStory.OriDetails = JSON.parse(response.body.split('\n')[0]);
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
                id: dash.videoID,
                url: dash.url,
                thumbnails: dash.thumbnails.map((item: GetWatchAndReel.ComponentThumbnail): GetStory.ComponentNail => ({
                    id: item.id,
                    height: item.height,
                    width: item.width,
                    url: item.uri
                }))
            }
            output.videos.push(video);
        }
    } else {
        const watch: GetWatchAndReel.OutputDetails = await getWatchAndReel(media.videoId);
        const video: GetStory.OutputVideo = {
            id: media.videoId,
            url: watch.url,
            thumbnails: watch.thumbnails.map((item: GetWatchAndReel.ComponentThumbnail): GetStory.ComponentNail => ({
                id: item.id,
                height: item.height,
                width: item.width,
                url: item.uri
            }))
        }
        output.videos.push(video);
    }

    return output;
}

export async function getWatchAndReel(videoID: string): Promise<GetWatchAndReel.OutputDetails> {
    const srcURL: string = 'https://graph.facebook.com/v18.0/' + videoID;
    const response: RequestURL.Response<string> = await request.get<string>(srcURL, undefined, {
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

    const output: GetWatchAndReel.OutputDetails = {
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

    await writer.download(output.url, output.videoID);

    return output;
}