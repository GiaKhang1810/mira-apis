import express, { Request, Response, Router } from "express";
import db, { Model } from "../database/db";
import { log } from "../utils";
import axios from "axios";

let token: string;
const COOKIE_USER: string | undefined = process.env.COOKIE_USER;
let fb_dtsg: string | undefined;

const refreshDTSG: () => void = (): void => {
    fb_dtsg = process.env.FB_DTSG;
}
setInterval(refreshDTSG, 60 * 60 * 1000);
refreshDTSG();

if (!COOKIE_USER || !fb_dtsg) {
    log.warn("Facebook", "COOKIE_USER or FB_DTSG is not added to the environment");
    process.exit(1);
}

interface Headers {
    "Cookie": string;
    "Priority": string;
    "Origin": string;
    "Sec-Ch-Ua": string;
    "Sec-Ch-Ua-Full-Version-List": string;
    "Sec-Ch-Ua-Mobile": string;
    "Sec-Ch-Ua-Model": string;
    "Sec-Ch-Ua-Platform": string;
    "Sec-Ch-Ua-Platform-Version": string;
    "Sec-Fetch-Dest": string;
    "Sec-Fetch-Mode": string;
    "Sec-Fetch-Site": string;
    "Sec-Fetch-User": string;
    "Upgrade-Insecure-Requests": string;
    "User-Agent": string;
}

interface GetStoryID {
    albumid: string;
    storyid?: string;
}

interface ItemThumbnail {
    id: string;
    height: number;
    width: number;
    uri: string;
}

interface AxiosVideoResponse {
    id: string;
    description: string;
    created_time: string;
    source: string;
    thumbnails: {
        data: Array<ItemThumbnail>
    };
    reactions: {
        summary: {
            total_count: number;
        };
    };
    comments: {
        summary: {
            total_count: number;
        };
    };
    from: {
        name: string;
        id: string;
    };
}

interface VideoDetails {
    videoID: string;
    userID: string;
    author: string;
    desc: string;
    publishedAt: string;
    reactCount: number;
    commentCount: number;
    url: string;
    thumbnails: Array<ItemThumbnail>
}

interface StoryRepresentations {
    width: number;
    height: number;
    base_url: string;
    mime_type: string;
}

interface PrefetchRepresentations {
    representations: Array<StoryRepresentations>;
}

interface StoryOwner {
    id: string;
    name: string;
}

interface StoryMedia {
    blurred_image: {
        uri: string;
    };
    preferred_thumbnail: {
        image: {
            uri: string;
        };
    };
    previewImage: {
        uri: string;
    };
    image: {
        height: number;
        width: number;
    };
    title: {
        text: string;
    };
    publish_time: number;
    videoDeliveryLegacyFields: {
        browser_native_hd_url: string;
        browser_native_sd_url: string;
    };
}

interface StoryAttachment {
    media: StoryMedia;
}

interface StoryCard {
    feedback_summary: {
        total_reaction_count: number;
    };
    story_thumbnail: {
        uri: string;
    };
}

interface StoryEdges {
    attachments: [StoryAttachment];
    story_card_info: StoryCard;
}

interface FirstStory {
    owner: StoryOwner;
    unified_stories: {
        edges: [{ node: StoryEdges }];
    };
}

interface AxiosStoryDetails {
    data: {
        nodes: [FirstStory];
    };
    extensions: {
        all_video_dash_prefetch_representations: [PrefetchRepresentations];
    };
}

interface StoryDetails {
    userID: string;
    name: string;
    title: string;
    publishedAt: number;
    height: number;
    width: number;
    url: {
        hd: string;
        sd: string;
    };
    images: {
        blurred: string;
        preferred: string;
        preview: string;
        thumbnail: string;
    };
    reactCount: number;
    other_url: StoryRepresentations[];
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

    routers.get("/index.html", (req: Request, res: Response): void => {
        const token: string = (req as any).token;
        res.status(200);
        res.render("facebook/index", { token });
    });

    routers.get("/", (req: Request, res: Response): void => {
        res.redirect(302, "/facebook/index.html");
    });

    return routers;
}