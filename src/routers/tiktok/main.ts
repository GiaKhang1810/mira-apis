import { Request, Response } from 'express';
import { getAddr, GetAddrDetails } from './lib/addr';
import { searchQuery } from './lib/search';
import { isRedirectURL } from './lib/confirmURL';
import { getRedirect } from './lib/redirect';
import { getUniqueID } from './lib/parser';
import cout from '@utils/cout';

export async function GetDetailsMedia(req: Request, res: Response): Promise<void> {
    let url: string | undefined = (req.method === 'GET' ? req.query : req.body).url;

    try {
        if (!url) {
            const error: Error = new Error('Missing \'url\'.');
            error.name = '400';
            throw error;
        }

        if (isRedirectURL(url))
            url = await getRedirect(url);

        const id: string = getUniqueID(url);
        const addr: GetAddrDetails.OutputDetails = await getAddr(id);
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

        cout.error('tiktok.GetDetailsMedia', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}

export async function SearchQuery(req: Request, res: Response): Promise<void> {
    const query: string | undefined = (req.method === 'GET' ? req.query : req.body).query;
    const count: number | undefined = (req.method === 'GET' ? req.query : req.body).count;

    try {
        if (!query) {
            const error: Error = new Error('Missing \'query\'.');
            error.name = '400';
            throw error;
        }

        const searchQueued: Array<GetAddrDetails.OutputDetails> = await searchQuery(query, count ? Number(count) : undefined);
        res.status(200);
        res.json(searchQueued);
    } catch (error: any) {
        if (error.name === '400' || error.name === '404') {
            res.status(parseInt(error.name));
            res.json({
                message: error.message
            });
            return;
        }

        cout.error('tiktok.SearchQuery', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}