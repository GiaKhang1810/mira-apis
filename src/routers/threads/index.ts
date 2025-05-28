import express, { Router, Request, Response } from 'express';
import { getPostDetails } from './main';
import cout from '@utils/cout';
import { GetPostDetails } from './types';

const hosts: Array<string> = ['www.threads.com', 'threads.net', 'www.threads.net'];
const routers: Router = express.Router();

function isValidURL(threadsURL: string): boolean {
    try {
        const url: URL = new URL(threadsURL);
        
        const hostname: string = url.hostname;
        if (!hosts.includes(hostname))
            throw new Error();

        const parts = url.pathname.split('/').filter(Boolean);

        if (parts.length !== 3 || !parts[0].startsWith('@') || parts[1] !== 'post' || parts[2].length === 0) {
            const error: Error = new Error('URL is not a Threads post.');
            error.name = '400';
            throw error;
        }

        return true;
    } catch (error: any) {
        if (error.name === '400')
            throw error;

        const cusError: Error = new Error('Invalid Threads URL.');
        cusError.name === '400';
        throw cusError;
    }
}

async function getPost(req: Request, res: Response): Promise<void> {
    const url: string | undefined = (req.method === 'GET' ? req.query : req.body).url;

    try {
        if (!url) {
            const error: Error = new Error('Missing \'url\'.');
            error.name = '404';
            throw error;
        }

        isValidURL(url);

        const info: GetPostDetails.OutputDetails = await getPostDetails(url);
        
        res.status(200);
        res.json(info);
    } catch (error: any) {
        switch (error.name) {
            case '404':
            case '400':
                res.status(parseInt(error.name));
                res.json({
                    message: error.message
                });
                break;
            default:
                cout.error('threads.getPost', error);
                res.status(500);
                res.json({
                    message: 'Server error, please try again later.'
                });
                break;
        }
    }
}
routers.get('/api/get-post', getPost);
routers.post('/api/get-post', getPost);

export default {
    pathRoute: '/threads',
    modelRoute: routers
}