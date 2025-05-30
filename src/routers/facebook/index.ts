import express, { Router, Request, Response } from 'express';
import { getUserID, getRedirectURL, getStoryDetails, getWatchAndReel } from './main';
import { GetStory, GetWatchAndReel } from './types';
import cout from '@utils/cout';

type Story = {
    storyID?: string;
    albumID: string;
}

function isShareURL(url: string): boolean {
    return /^https:\/\/www\.facebook\.com\/share\/(p\/|r\/|v\/)?[\w\d]+\/?$/.test(url);
}

function getStory(storyURL: string): Story {
    try {
        const url: URL = new URL(storyURL);

        if (url.pathname === '/story.php') {
            const storyID: string | null = url.searchParams.get('story_fbid');
            const albumID: string | null = url.searchParams.get('id');

            if (storyID && albumID)
                return {
                    storyID: Buffer.from(storyID, 'base64').toString().split(':')[2],
                    albumID
                }
        }

        const parts: Array<string> = url.pathname.split('/').filter(Boolean);
        if (parts.length >= 2 && parts[0] === 'stories') {
            const albumID: string = parts[1];
            let storyID: string | undefined = parts[2];

            if (storyID)
                storyID = Buffer.from(storyID, 'base64').toString().split(':')[2];

            return {
                albumID,
                storyID
            }
        }

        const error: Error = new Error();
        error.name = '400';
        error.message = 'Can\'t read URL.';
        throw error;
    } catch (error: any) {
        throw error;
    }
}

const routers: Router = express.Router();

async function findUID(req: Request, res: Response): Promise<void> {
    let username: string | undefined = (req.method === 'GET' ? req.query : req.body).username;

    try {
        if (!username) {
            const error: Error = new Error('Missing \'username\'.');
            error.name = '404';
            throw error;
        }

        const userID: string = await getUserID(username);

        res.status(200);
        res.json({ userID });
    } catch (error: any) {
        if (error.name === '404') {
            res.status(404);
            res.json({
                message: error.message
            });
            return;
        }

        cout.error('facebook.getUserID', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}
routers.post('/api/get-user-id', findUID);
routers.get('/api/get-user-id', findUID);

async function getRedirect(req: Request, res: Response): Promise<void> {
    const url: string | undefined = (req.method === 'POST' ? req.body : req.query).url;

    try {
        if (!url) {
            const error: Error = new Error('Missing \'url\'.');
            error.name = '404';
            throw error;
        }

        if (!isShareURL(url)) {
            const error: Error = new Error('Invalid Facebook share URL.');
            error.name = '400';
            throw error;
        }

        const redirectURL: string = await getRedirectURL(url);

        res.status(200);
        res.json({ redirectURL });
    } catch (error: any) {
        if (error.name === '404' || error.name === '400') {
            res.status(parseInt(error.name));
            res.json({
                message: error.message
            });
            return;
        }

        cout.error('facebook.getRedirectURL', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}
routers.post('/api/get-redirect-url', getRedirect);
routers.get('/api/get-redirect-url', getRedirect);

async function downloadStory(req: Request, res: Response): Promise<void> {
    let url: string | undefined = (req.method === 'GET' ? req.query : req.body).url;

    try {
        if (!url) {
            const error: Error = new Error('Missing \'url\'.');
            error.name = '404';
            throw error;
        }

        if (isShareURL(url))
            url = await getRedirectURL(url);

        const data: Story = getStory(url);
        const info: GetStory.OutputDetails = await getStoryDetails(data.albumID, data.storyID);

        res.status(200);
        res.json(info);
    } catch (error: any) {
        if (error.name === '400' || error.name === '404') {
            res.status(parseInt(error.name));
            res.json({
                message: error.message
            });
            return;
        }

        cout.error('facebook.downloadStory', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}
routers.post('/api/download-story', downloadStory);
routers.get('/api/download-story', downloadStory);

async function downloadWatchAndReel(req: Request, res: Response): Promise<void> {
    let url: string | undefined = (req.method === 'GET' ? req.query : req.body).url;

    try {
        if (!url) {
            const error: Error = new Error('Missing \'url\'.');
            error.name = '404';
            throw error;
        }

        if (isShareURL(url))
            url = await getRedirectURL(url);

        const match: RegExpMatchArray | null = /videos\/\?v=(\d+)/g.exec(url) || /videos\/(\d+)/g.exec(url) || /(\d+)/g.exec(url);
        
        if (!match) {
            const error: Error = new Error('Invalid Facebook video URL.');
            error.name = '404';
            throw error;
        }

        const info: GetWatchAndReel.OutputDetails = await getWatchAndReel(match[1]);

        res.status(200);
        res.json(info);
    } catch (error: any) {
        if (error.name === '400' || error.name === '404' || error.name === '403') {
            res.status(parseInt(error.name));
            res.json({
                message: error.message
            });
            return;
        }

        cout.error('facebook.downloadStory', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}
routers.post('/api/download-watch-and-reel', downloadWatchAndReel);
routers.get('/api/download-watch-and-reel', downloadWatchAndReel);

export default {
    pathRoute: '/facebook',
    modelRoute: routers
}