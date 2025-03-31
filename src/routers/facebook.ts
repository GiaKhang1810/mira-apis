import express, { Request, Response, Router } from "express";
import db, { Model } from "../database/db";
import { log } from "../utils";
import axios from "axios";
import {
    Headers,
    GetStoryID,
    VideoDetails,
    AxiosStoryDetails,
    AxiosVideoResponse,
    ItemThumbnail,
    StoryDetails,
    FirstStory,
    StoryEdges,
    StoryMedia,
    StoryCard,
    StoryRepresentations,
    AxiosUserIDResponse
} from "../types/facebook";

let token: string;
const COOKIE_USER: string | undefined = process.env.COOKIE_USER;
let fb_dtsg: string | undefined;

const refreshDTSG: () => void = (): void => {
    fb_dtsg = process.env.FB_DTSG;
    if (!fb_dtsg) {
        log.warn("Facebook", "FB_DTSG is not added to the environment");
        process.exit(1);
    }
}
setInterval(refreshDTSG, 60 * 60 * 1000);
refreshDTSG();

if (!COOKIE_USER || !fb_dtsg) {
    log.warn("Facebook", "COOKIE_USER or FB_DTSG is not added to the environment");
    process.exit(1);
}

export default function (database: Record<string, Model<typeof db.define>>): Router {
    const routers: Router = express.Router();
    const isShareURL = (url: string): boolean => /^https:\/\/www\.facebook\.com\/share\/(p\/|r\/|v\/)?[\w\d]+\/?$/.test(url);
    const headers: Headers = {
        "Cookie": COOKIE_USER!,
        "Priority": "u=0, i",
        "Origin": "https://www.facebook.com",
        "Sec-Ch-Ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "Sec-Ch-Ua-Full-Version-List": "\"Chromium\";v=\"134.0.6998.119\", \"Not:A-Brand\";v=\"24.0.0.0\", \"Google Chrome\";v=\"134.0.6998.119\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Model": "\"\"",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Ch-Ua-Platform-Version": "\"19.0.0\"",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    }

    const getGUID: () => string = (): string => {
        let sectionLength: number = Date.now();
        const id: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c: string): string => {
            const r: number = Math.floor((sectionLength + Math.random() * 16) % 16);
            sectionLength = Math.floor(sectionLength / 16);
            const _guid: string = (c === "x" ? r : (r & 7) | 8).toString(16);
            return _guid;
        });
        return id;
    }

    const getUserID: (username: string) => Promise<string> = async (username: string): Promise<string> => {
        const data: URLSearchParams = new URLSearchParams({
            fb_dtsg: fb_dtsg!,
            fb_api_req_friendly_name: "SearchCometResultsInitialResultsQuery",
            variables: JSON.stringify({
                count: 5,
                allow_streaming: false,
                args: {
                    callsite: "COMET_GLOBAL_SEARCH",
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
                        type: "PEOPLE_TAB"
                    },
                    filters: [],
                    text: username.toLowerCase()
                },
                cursor: null,
                feedbackSource: 23,
                fetch_filters: true,
                renderLocation: "search_results_page",
                scale: 1,
                stream_initial_count: 0,
                useDefaultActor: false,
                __relay_internal__pv__IsWorkUserrelayprovider: false,
                __relay_internal__pv__IsMergQAPollsrelayprovider: false,
                __relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider: false,
                __relay_internal__pv__StoriesRingrelayprovider: false
            }),
            server_timestamps: "true",
            doc_id: "9946783172059974"
        });

        const res = await axios.post<AxiosUserIDResponse>("https://www.facebook.com/api/graphql/", data, { headers });

        return res.data.data.serpResponse.results.edges[0].relay_rendering_strategy.view_model.profile.id;
    }

    const getRedirectURL: (url: string) => Promise<string> = async (url: string): Promise<string> => {
        const res = await axios.get<string>(url, {
            headers,
            maxRedirects: 0,
            validateStatus: (status: number): boolean => status === 302
        } as any);

        const redirect: string = res.headers.location;

        if (!redirect)
            throw new Error("Can't get redirect url");

        return redirect;
    }

    const getStoryID: (url: string) => GetStoryID | undefined = (url: string): GetStoryID | undefined => {
        const storyPhpRegex: RegExp = /\/story\.php\?story_fbid=(\d+)&id=(\d+)/;
        const storiesRegex: RegExp = /\/stories\/(\d+)\/([^/?]+)?/;

        let match;

        if ((match = url.match(storyPhpRegex)))
            return {
                storyid: match[1],
                albumid: match[2]
            }

        if ((match = url.match(storiesRegex)))
            return {
                albumid: match[1],
                storyid: match[2]
            }
    }

    const getToken: () => Promise<void> = async (): Promise<void> => {
        try {
            await axios.get("https://graph.facebook.com/me/permissions", {
                headers,
                params: {
                    access_token: token!
                }
            });

            return;
        } catch {
            try {
                const res = await axios.get<string>("https://adsmanager.facebook.com/adsmanager?act=403987283654016&nav_source=no_referrer#", {
                    headers
                });

                const match: string[] | null = /\window\.__accessToken="(\S+)"/g.exec(res.data);

                if (!match)
                    throw new Error("Can't get access_token");

                token = match[1];
                return;
            } catch (error: any) {
                throw error;
            }
        }
    }

    const getVideoDetails: (videoID: string) => Promise<VideoDetails> = async (videoID: string): Promise<VideoDetails> => {
        await getToken();
        const api: string = "https://graph.facebook.com/v18.0/" + videoID;
        const res = await axios.get<AxiosVideoResponse>(api, {
            headers,
            params: {
                fields: "id,description,created_time,source,thumbnails,reactions.summary(true),comments.summary(true),from{name,id}",
                access_token: token
            }
        });
        const info: AxiosVideoResponse = res.data;

        return {
            videoID: info.id,
            userID: info.from.id,
            author: info.from.name,
            desc: info.description,
            publishedAt: info.created_time,
            reactCount: info.reactions.summary.total_count,
            commentCount: info.comments.summary.total_count,
            url: info.source,
            thumbnails: info.thumbnails.data.map((item: ItemThumbnail): ItemThumbnail => {
                return {
                    id: item.id,
                    height: item.height,
                    width: item.width,
                    uri: item.uri
                }
            })
        }
    }

    const getStoryDetails: (albumID: string, storyID: string | undefined) => Promise<StoryDetails> = async (albumID: string, storyID: string | undefined): Promise<StoryDetails> => {
        if (!/\d+/.test(albumID))
            throw new Error("albumid must be a numeric string");

        const data: URLSearchParams = new URLSearchParams({
            fb_dtsg: fb_dtsg!,
            variables: JSON.stringify({
                bucketIDs: storyID ? [albumID, storyID] : albumID,
                scale: 1,
                blur: 10,
                shouldEnableArmadilloStoryReply: true,
                shouldEnableLiveInStories: true,
                feedbackSource: "65",
                useDefaultActor: false,
                feedLocation: "COMET_MEDIA_VIEWER",
                focusCommentID: null,
                shouldDeferLoad: false,
                isStoriesArchive: false,
                __relay_internal__pv__IsWorkUserrelayprovider: false
            }),
            server_timestamps: "true",
            doc_id: "9476908792385858"
        });
        const res = await axios.post<string>("https://www.facebook.com/api/graphql/", data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                ...headers
            }
        });
        const body: string = res.data;
        const info: AxiosStoryDetails = JSON.parse(body.split("\n")[0]);

        const node: FirstStory = info.data.nodes[0];
        const story: StoryEdges = node.unified_stories.edges[0].node;
        const media: StoryMedia = story.attachments[0].media;
        const storyCard: StoryCard = story.story_card_info;

        return {
            userID: node.owner.id,
            name: node.owner.name,
            title: media.title.text,
            publishedAt: media.publish_time,
            height: media.image.height,
            width: media.image.width,
            url: {
                hd: media.videoDeliveryLegacyFields.browser_native_hd_url,
                sd: media.videoDeliveryLegacyFields.browser_native_sd_url
            },
            images: {
                blurred: media.blurred_image.uri,
                preferred: media.preferred_thumbnail.image.uri,
                preview: media.previewImage.uri,
                thumbnail: storyCard.story_thumbnail.uri
            },
            reactCount: storyCard.feedback_summary.total_reaction_count,
            other_url: info.extensions.all_video_dash_prefetch_representations[0].representations.map((item: StoryRepresentations): StoryRepresentations => ({
                width: item.width,
                height: item.height,
                base_url: item.base_url,
                mime_type: item.mime_type
            }))
        }
    }

    routers.post("/api/get-redirect", async (req: Request, res: Response): Promise<void> => {
        const url = req.body.url as string;

        if (!url) {
            res.status(400);
            res.json({
                message: "Missing 'url' in request body"
            });
            return;
        }

        if (!isShareURL(url)) {
            res.status(400);
            res.json({
                message: "Just Support For Facebook Share URL"
            });
            return;
        }

        try {
            const redirectURL: string = await getRedirectURL(url);

            res.status(200);
            res.json({ url: redirectURL });
        } catch (error: any) {
            log.error("Facebook.getRedirect", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    routers.post("/api/watch", async (req: Request, res: Response): Promise<void> => {
        let id: string;
        let url = req.body.url as string;

        try {
            if (url) {
                if (isShareURL(url))
                    url = await getRedirectURL(url);

                const match: RegExpMatchArray | null = /videos\/(\d+)/g.exec(url) || /(\d+)/g.exec(url);

                if (!match) {
                    res.status(400);
                    res.json({
                        message: "Invalid Facebook URL"
                    });

                    return;
                }
                id = match[1];
            } else
                id = req.body.id as string;

            if (!id) {
                res.status(400);
                res.json({
                    message: "Missing 'id' in request body"
                });
                return;
            }

            const details: VideoDetails = await getVideoDetails(id);

            res.status(200);
            res.json(details);
        } catch (error: any) {
            log.error("Facebook.watch", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    routers.get("/api/watch", async (req: Request, res: Response): Promise<void> => {
        let id: string;
        let url = req.query.url as string;

        try {
            if (url) {
                if (isShareURL(url))
                    url = await getRedirectURL(url);

                const match: RegExpMatchArray | null = /videos\/(\d+)/g.exec(url) || /(\d+)/g.exec(url);

                if (!match) {
                    res.status(400);
                    res.json({
                        message: "Invalid Facebook URL"
                    });

                    return;
                }
                id = match[1];
            } else
                id = req.query.id as string;

            if (!id) {
                res.status(400);
                res.json({
                    message: "Missing 'id' in request query"
                });
                return;
            }

            const details: VideoDetails = await getVideoDetails(id);

            res.status(200);
            res.json(details);
        } catch (error: any) {
            log.error("Facebook.watch", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    routers.post("/api/story", async (req: Request, res: Response): Promise<void> => {
        let storyid: string;
        let albumid: string;
        let url = req.body.url as string;

        try {
            if (url) {
                if (isShareURL(url))
                    url = await getRedirectURL(url);

                const info: GetStoryID | undefined = getStoryID(url);

                if (!info) {
                    res.status(400);
                    res.json({
                        message: "Invalid Story URL"
                    });
                    return;
                }
                albumid = info.albumid;

                if (info.storyid)
                    storyid = info.storyid;
            } else {
                albumid = req.body.albumid as string;
                storyid = req.body.storyid as string;

                if (!albumid) {
                    res.status(400);
                    res.json({
                        message: "Missing 'albumid' in request body"
                    });
                    return;
                }
            }
            const storyID: string | undefined = storyid! ? Buffer.from(storyid, "base64").toString().split(":")[2] : undefined;

            if (storyid! && !/\d+/.test(storyID!) || !/\d+/.test(albumid)) {
                res.status(400);
                res.json({
                    message: "Invalid Story or Album ID"
                });
                return;
            }

            const details: StoryDetails = await getStoryDetails(albumid, storyID);
            res.status(200);
            res.json(details);
        } catch (error: any) {
            log.error("Facebook.story", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    routers.get("/api/story", async (req: Request, res: Response): Promise<void> => {
        let storyid: string;
        let albumid: string;
        let url = req.query.url as string;

        try {
            if (url) {
                if (isShareURL(url))
                    url = await getRedirectURL(url);

                const info: GetStoryID | undefined = getStoryID(url);

                if (!info) {
                    res.status(400);
                    res.json({
                        message: "Invalid Story URL"
                    });
                    return;
                }
                albumid = info.albumid;

                if (info.storyid)
                    storyid = info.storyid;
            } else {
                albumid = req.query.albumid as string;
                storyid = req.query.storyid as string;

                if (!albumid) {
                    res.status(400);
                    res.json({
                        message: "Missing 'albumid' in request query"
                    });
                    return;
                }
            }
            const storyID: string | undefined = storyid! ? Buffer.from(storyid, "base64").toString().split(":")[2] : undefined;

            if (storyid! && !/\d+/.test(storyID!) || !/\d+/.test(albumid)) {
                res.status(400);
                res.json({
                    message: "Invalid Story or Album ID"
                });
                return;
            }

            const details: StoryDetails = await getStoryDetails(albumid, storyID);
            res.status(200);
            res.json(details);
        } catch (error: any) {
            log.error("Facebook.story", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    routers.post("/api/findid", async (req: Request, res: Response): Promise<void> => {
        const username = req.body.username as string;

        if (!username) {
            res.status(400);
            res.json({
                message: "Missing 'username' in request body"
            });
            return;
        }

        try {
            const id: string = await getUserID(username);

            res.status(200);
            res.json({ id });
        } catch (error: any) {
            log.error("Facebook.findid", error);
            res.status(500);
            res.json({
                message: "Serror error, please try again later"
            });
        }
    });

    routers.get("/api/findid", async (req: Request, res: Response): Promise<void> => {
        const username = req.query.username as string;

        if (!username) {
            res.status(400);
            res.json({
                message: "Missing 'username' in request query"
            });
            return;
        }

        try {
            const id: string = await getUserID(username);

            res.status(200);
            res.json({ id });
        } catch (error: any) {
            log.error("Facebook.findid", error);
            res.status(500);
            res.json({
                message: "Serror error, please try again later"
            });
        }
    });

    routers.get("/main", (req: Request, res: Response): void => {
        const token: string = (req as any).token;
        res.status(200);
        res.render("facebook/main", { token });
    });

    routers.get("/id", (req: Request, res: Response): void => {
        const token: string = (req as any).token;
        res.status(200);
        res.render("facebook/userid", { token });
    });

    routers.get("/", (req: Request, res: Response): void => {
        res.redirect(302, "/facebook/main");
    });

    return routers;
}