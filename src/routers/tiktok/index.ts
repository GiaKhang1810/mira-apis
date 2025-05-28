import express, { Router, Request, Response } from 'express';
import { getAddrDetails, getRedirectURL } from './main';
import { GetAddrDetails } from './types';
import cout from '@utils/cout';

const routers: Router = express.Router();

function isShareURL(tiktokURL: string): boolean {
    try {
        const url: URL = new URL(tiktokURL);

        return (
            (url.hostname === 'vm.tiktok.com' || url.hostname === 'vt.tiktok.com') &&
            url.pathname !== '/' &&
            /^\/\w+\/?$/.test(url.pathname)
        );
    } catch {
        const error: Error = new Error('Invalid TikTok URL.');
        error.name = '400';
        throw error;
    }
}

function getID(tiktokURL: string): string {
    try {
        const url: URL = new URL(tiktokURL);

        const parts: Array<string> = url.pathname.split('/').filter(Boolean);

        if (parts.length === 3 && parts[0].startsWith('@') && (parts[1] === 'video' || parts[1] === 'photo') && /^\d+$/.test(parts[2]))
            return parts[2].split('?')[0];

        const error: Error = new Error('Invalid TikTok URL.');
        error.name = '400';
        throw error;
    } catch {
        const error: Error = new Error('Invalid TikTok URL.');
        error.name = '400';
        throw error;
    }
}


async function getAddr(req: Request, res: Response): Promise<void> {
    let url: string | undefined = (req.method === 'GET' ? req.query : req.body).url;

    try {
        if (!url) {
            const error: Error = new Error('Missing \'url\'.');
            error.name = '400';
            throw error;
        }

        if (isShareURL(url))
            url = await getRedirectURL(url);

        const id: string = getID(url);
        const addr: GetAddrDetails.OutputDetails = await getAddrDetails(id);
        res.status(200);
        res.json(addr);
    } catch (error: any) {
        if (error.name === '400' || error.name === '404') {
            res.status(parseInt(error.name));
            res.json({
                message: error.message
            });
            return;
        }

        cout.error('tiktok.getAddr', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}
routers.get('/api/get-addr', getAddr);
routers.post('/api/get-addr', getAddr);

export default {
    pathRoute: '/tiktok',
    modelRoute: routers
}