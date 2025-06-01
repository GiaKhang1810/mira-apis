import { Request, Response } from 'express';
import { resolve } from 'path';
import { readdirSync, createReadStream, ReadStream } from 'fs';
import { getType } from 'mime';
import cout from '@utils/cout';

const directory: string = resolve(__dirname, '..', '..', 'database', process.env.CACHE_DIRECTORY ?? 'cache');

export function Redirect(req: Request, res: Response): void {
    res.redirect(302, '/tools/scraper');
}

export function Scraper(req: Request, res: Response): void {
    res.status(200);
    res.render('tools/scraper');
}

function getFileFromShortcode(shortcode: string): string {
    const files: Array<string> = readdirSync(directory);
    const found: string | undefined = files.find((file: string): boolean => file.startsWith(shortcode + '.'));

    if (!found) {
        const error = new Error('Shortcode not found.');
        error.name = '404';
        throw error;
    }

    return found;
}

export function GetMedia(req: Request, res: Response): void {
    const shortcode: string | undefined = (req.method === 'GET' ? req.query : req.body).shortcode;
    const download: boolean = (req.method === 'GET' ? req.query : req.body).download ?? false;

    try {
        if (!shortcode) {
            const error: Error = new Error('Missing \'shortcode\'.');
            error.name = '404';
            throw error;
        }

        const found: string = getFileFromShortcode(shortcode);
        const filePath: string = resolve(directory, found);

        res.status(200);
        res.type(getType(filePath) ?? 'application/octet-stream');
        res.setHeader('Content-Disposition', 'inline; filename="' + found + '"');


        if (download) {
            res.download(filePath);
            return;
        }

        const streamer: ReadStream = createReadStream(filePath);
        streamer.on('error', function (error: Error): void {
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

        streamer.pipe(res);
    } catch (error: any) {
        if (error.name === '404') {
            res.status(404);
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