import express, { Request, Response, Router } from "express";
import db, { Model } from "../database/db";
import authRequest, { AuthRequest } from "../controllers/authRequest";
import { log } from "../utils";
import axios from "axios";

const YOUTUBE_KEY: string | undefined = process.env.YOUTUBE_KEY;

if (!YOUTUBE_KEY) {
    log.warn("Youtube", "YOUTUBE_KEY is not added to the environment");
    process.exit(1);
}

interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

interface ItemThumbnail {
    url: string;
    width: number;
    height: number;
}

interface Thumbnails {
    default: ItemThumbnail;
    medium: ItemThumbnail;
    high: ItemThumbnail;
    standard?: ItemThumbnail;
    maxres?: ItemThumbnail;
}

interface DetailsSnippet {
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    tags: string[];
}

interface DetailsStatistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
}

interface ItemsDetailsResponse {
    id: { videoId: string } | string;
    snippet: DetailsSnippet;
    statistics: DetailsStatistics;
}

interface AxiosResponse {
    kind: string;
    etag: string;
    items: Array<ItemsDetailsResponse>;
    pageInfo: PageInfo;
}

interface Details {
    videoID: string;
    title: string;
    channel: string;
    desc: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    viewCount?: string;
    likeCount?: string;
    favoriteCount?: string;
    commentCount?: string;
    url?: string;
}

export default function (database: Record<string, Model<typeof db.define>>): Router {
    const routers: Router = express.Router();
    const requests: AuthRequest = authRequest(database);

    const getURLVideoID: (url: string) => string | undefined = (url: string): string | undefined => {
        const match: string[] | null = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : undefined;
    }

    const getDetails: (url: string) => Promise<Details> = async (url: string): Promise<Details> => {
        const videoID: string | undefined = getURLVideoID(url);
        if (!videoID)
            throw new Error("Invalid Youtube URL");

        const api: string = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoID}&key=${YOUTUBE_KEY}`;

        const res = await axios.get<AxiosResponse>(api);
        if (!res.data.items.length)
            throw new Error("Video not found!");

        const info: ItemsDetailsResponse = res.data.items[0];
        const snippet: DetailsSnippet = info.snippet;
        const stats: DetailsStatistics = info.statistics;

        return {
            videoID,
            title: snippet.title,
            channel: snippet.channelTitle,
            desc: snippet.description,
            publishedAt: snippet.publishedAt,
            likeCount: stats.likeCount || "N/A",
            commentCount: stats.commentCount || "N/A",
            viewCount: stats.viewCount || "N/A",
            favoriteCount: stats.favoriteCount || "N/A",
            thumbnails: snippet.thumbnails
        }
    }

    const searchQuery: (query: string, lent: number) => Promise<Array<Details>> = async (query: string, lent: number = 5): Promise<Array<Details>> => {
        const api: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${lent}&type=video&key=${YOUTUBE_KEY}`;
        const res = await axios.get<AxiosResponse>(api);

        return res.data.items.map((item: ItemsDetailsResponse): Details => {
            const snippet: DetailsSnippet = item.snippet;
            const videoID: string = typeof item.id === "string" ? item.id : item.id.videoId;
            return {
                videoID,
                title: snippet.title,
                channel: snippet.channelTitle,
                desc: snippet.description,
                publishedAt: snippet.publishedAt,
                thumbnails: snippet.thumbnails,
                url: "https://www.youtube.com/watch?v=" + videoID
            }
        });
    }

    routers.post("/api/details", async (req: Request, res: Response): Promise<void> => {
        const url = req.body.url as string;

        if (!url) {
            res.status(400);
            res.json({
                message: "Missing 'url' in request body"
            });
            return;
        }

        if (!getURLVideoID(url)) {
            res.status(400);
            res.json({
                message: "Invalid Youtube URL"
            });
            return;
        }

        try {
            const details: Details = await getDetails(url);

            res.status(200);
            res.json(details);
        } catch (error: any) {
            if (error.message === "Video not found!") {
                res.status(400);
                res.json({
                    message: error.message
                })
                return;
            }

            log.error("Youtube", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    routers.get("/api/details", async (req: Request, res: Response): Promise<void> => {
        const url = req.query.url as string;

        if (!url) {
            res.status(400);
            res.json({
                message: "Missing 'url' in request query"
            });
            return;
        }

        if (!getURLVideoID(url)) {
            res.status(400);
            res.json({
                message: "Invalid Youtube URL"
            });
            return;
        }

        try {
            const details: Details = await getDetails(url);

            res.status(200);
            res.json(details);
        } catch (error: any) {
            if (error.message === "Video not found!") {
                res.status(400);
                res.json({
                    message: error.message
                })
                return;
            }

            log.error("Youtube", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    routers.post("/api/search", async (req: Request, res: Response): Promise<void> => {
        const query = req.body.query as string;
        const lent = req.body.lent as string;

        if (!query) {
            res.status(400);
            res.json({
                message: "Missing 'query' in request body"
            });
            return;
        }

        try {
            const list: Array<Details> = await searchQuery(query, Number(lent ? lent : 5));

            res.status(200);
            res.json(list);
        } catch (error: any) {
            log.error("Youtube", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    routers.get("/api/search", async (req: Request, res: Response): Promise<void> => {
        const query = req.query.query as string;
        const lent = req.query.lent as string;

        if (!query) {
            res.status(400);
            res.json({
                message: "Missing 'query' in request query"
            });
            return;
        }

        try {
            const list: Array<Details> = await searchQuery(query, Number(lent ? lent : 5));

            res.status(200);
            res.json(list);
        } catch (error: any) {
            log.error("Youtube", error);
            res.status(500);
            res.json({
                message: "Server error, please try again later"
            });
        }
    });

    return routers;
}