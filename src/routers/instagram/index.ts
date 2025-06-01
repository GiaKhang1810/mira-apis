import express, { Router, Request, Response } from 'express';
import { getReelAndPost, getRedirectURL, getUserInfo } from './main';
import { GetReelAndPost } from './types';
import cout from '@utils/cout';

function validURL(igURL: string): boolean {
    try {
        const url: URL = new URL(igURL);
        return url.hostname.endsWith('instagram.com');
    } catch {
        const error: Error = new Error('Invalid Instagram URL.');
        error.name = '400';
        throw error;
    }
}

function isShareURL(igURL: string): boolean {
    try {
        const url: URL = new URL(igURL);
        return url.pathname.startsWith('/share/');
    } catch {
        const error: Error = new Error('Invalid Instagram URL.');
        error.name = '400';
        throw error;
    }
}

function getCodeReelAndPost(igURL: string): string {
    const tags: Array<string> = ['p', 'reel', 'reels', 'tv'];

    try {
        const url: URL = new URL(igURL);
        const parts: Array<string> = url.pathname.split('/').filter(Boolean);

        if (parts.length >= 2 && tags.includes(parts[0]))
            return parts[1];

        if (parts.length >= 3 && tags.includes(parts[1]))
            return parts[2];

        const error: Error = new Error('Only posts/reels supported, check if your link is valid.');
        error.name = '400';
        throw error;
    } catch (error: any) {
        if (error.name === '400') throw error;

        const err = new Error('Invalid Instagram URL.');
        err.name = '400';
        throw err;
    }
}

const routers: Router = express.Router();

async function downloadReelAndPost(req: Request, res: Response): Promise<void> {
    let url: string | undefined = (req.method === 'GET' ? req.query : req.body).url;

    try {
        if (!url) {
            const error: Error = new Error('Missing \'url\'.');
            error.name = '404';
            throw error;
        }

        if (!validURL(url)) {
            const error: Error = new Error('Invalid Instagram URL.');
            error.name = '400';
            throw error;
        }

        if (isShareURL(url))
            url = await getRedirectURL(url);

        const shortcode: string = getCodeReelAndPost(url);
        const info: GetReelAndPost.OutputDetails = await getReelAndPost(shortcode);

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

        cout.error('instagram.downloadReelAndPost', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}
routers.get('/api/get-reel-and-post', downloadReelAndPost);
routers.post('/api/get-reel-and-post', downloadReelAndPost);

async function getUser(req: Request, res: Response): Promise<void> {
    const username: string | undefined = (req.method === 'GET' ? req.query : req.body).username;
    
}
routers.get('/api/get-user-info', getUser);
routers.post('/api/get-user-info', getUser);

function redirect(req: Request, res: Response): void {
    res.redirect(302, '/facebook/home');
}
routers.get('/', redirect);

export default {
    pathRoute: '/instagram',
    modelRoute: routers
}