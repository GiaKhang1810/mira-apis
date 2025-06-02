import { Request, Response } from 'express';
import { getExtension } from 'mime';
import { Readable } from 'stream';
import request from '@utils/request';
import cout from '@utils/cout';

function isURL(url: string): boolean {
    try {
        return new URL(url) instanceof URL;
    } catch {
        return false;
    }
}

export function Redirect(req: Request, res: Response): void {
    res.redirect(302, '/tools/scraper');
}

export function Scraper(req: Request, res: Response): void {
    res.status(200);
    res.render('tools/scraper');
}

export async function GetMedia(req: Request, res: Response): Promise<void> {
    const url: string | undefined = (req.method === 'GET' ? req.query : req.body).url;
    const shortcode: string | undefined = (req.method === 'GET' ? req.query : req.body).shortcode;
    const download: boolean = (req.method === 'GET' ? req.query : req.body).download === 'true';

    try {
        if (!url || !shortcode) {
            const error: Error = new Error('Missing \'' + (url ? 'url' : 'shortcode') + '\'.');
            error.name = '404';
            throw error;
        }

        if (!isURL(url)) {
            const error: Error = new Error('Is that a url?');
            error.name = '400';
            throw error;
        }

        const response: RequestURL.Response<Readable> = await request.get<Readable>(url, undefined, { responseType: 'stream' });
        const content: string = response.headers['content-type'];
        const ext: string = getExtension(content) ?? 'bin';
        const filename: string = shortcode + '.' + (ext === 'webp' ? 'jpeg' : ext);

        res.type(filename);
        res.setHeader('Content-Disposition', (download ? 'attachment' : 'inline') + '; filename="' + filename + '"');

        response.body.on('error', function (error: Error): void {
            cout.error('tools.GetMedia', error);

            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Server error, please try again later.'
                }));
                return;
            }

            res.destroy();
        });

        response.body.pipe(res);
    } catch (error: any) {
        if (error.name === '404' || error.name === '400') {
            res.status(parseInt(error.name));
            res.json({
                message: error.message
            });
            return;
        }

        cout.error('tools.GetMedia', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}