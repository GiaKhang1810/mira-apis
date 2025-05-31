import { Request, Response } from 'express';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import getContentType from '@utils/getContentType';

const directory: string = resolve(__dirname, '..', '..', 'database', process.env.CACHE_DIRECTORY ?? 'cache');

export function Redirect(req: Request, res: Response): void {
    res.redirect(302, '/tools/scraper');
}

export function Scraper(req: Request, res: Response): void {
    res.status(200);
    res.render('tools/scraper');
}

export function DownloadMedia(req: Request, res: Response): void {
    const shortcode: string | undefined = req.method === 'GET' ? req.query.shortcode : req.body.shortcode;

    try {
        if (!shortcode) {
            const error: Error = new Error('Missing \'shortcode\'.');
            error.name = '404';
            throw error;
        }

        const files: Array<string> = readdirSync(directory);
        const found: string | undefined = files.find((file: string): boolean => file.startsWith(shortcode + '.'));

        if (!found) {
            const error: Error = new Error('Shortcode not found.');
            error.name = '404';
            throw error;
        }

        const filePath: string = resolve(directory, found);
        res.status(200);
        res.setHeader('Content-Type', getContentType(filePath));
        res.setHeader('Content-Disposition', 'inline; filename="' + found + '"');
        res.download(filePath);
    } catch (error: any) {
        if (error.name === '404') {
            res.status(404);
            res.json({
                message: error.message
            });
            return;
        }

        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}

export function GetMedia(req: Request, res: Response): void {
    const shortcode: string | undefined = req.method === 'GET' ? req.query.shortcode : req.body.shortcode;

    try {
        if (!shortcode) {
            const error: Error = new Error('Missing \'shortcode\'.');
            error.name = '404';
            throw error;
        }

        const files: Array<string> = readdirSync(directory);
        const found: string | undefined = files.find((file: string): boolean => file.startsWith(shortcode + '.'));

        if (!found) {
            const error: Error = new Error('Shortcode not found.');
            error.name = '404';
            throw error;
        }

        const filePath: string = resolve(directory, found);
        res.status(200);
        res.setHeader('Content-Type', getContentType(filePath));
        res.setHeader('Content-Disposition', 'inline; filename="' + found + '"');
        res.sendFile(filePath);
    } catch (error: any) {
        if (error.name === '404') {
            res.status(404);
            res.json({
                message: error.message
            });
            return;
        }

        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}