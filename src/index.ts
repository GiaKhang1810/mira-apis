import 'dotenv/config';

import Cookie from 'cookie-parser';
import Cors from 'cors';
import { parse, resolve } from 'path';
import { readFileSync, existsSync, mkdirSync, unlinkSync, readdirSync, statSync, Stats } from 'fs';
import express, { Request, Response, Express, Router } from 'express';
import { createServer, Server } from 'https';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

import cout from '@utils/cout';
import getContentType from '@utils/getContentType';
import database from './database';
import request, { CookieManager } from '@utils/request';

import RoutesList from './routers';

import { version } from '../package.json';

type RouteType = {
    pathRoute: string;
    modelRoute: Router;
}

const cwd: string = process.cwd();
const dirViews: string = resolve(cwd, 'views');
const dirStatic: string = resolve(cwd, 'static');
const directory: string = resolve(__dirname, 'database', process.env.CACHE_DIRECTORY ?? 'cache');

async function checkAndUpdate(): Promise<void> {
    cout.info('System', 'Running on version ' + version);
}

async function applyRoutes(app: Express): Promise<void> {
    cout.wall('=', 100);
    RoutesList.forEach(function (Route: RouteType): void {
        const pathRoute: string = Route.pathRoute;
        const modelRoute: Router = Route.modelRoute;

        app.use(pathRoute, modelRoute);
    });

    cout.info('Router', RoutesList.length + ' routes loaded successfully');
}

async function getMediaFromShortCode(req: Request, res: Response): Promise<void> {
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
        res.setHeader("Content-Disposition", 'inline; filename="' + found + '"');
        res.sendFile(filePath);
    } catch (error: any) {
        if (error.name === '404') {
            res.status(parseInt(error.name));
            res.json({
                message: error.message
            });
            return;
        }

        cout.error('DataBase', error);
        res.status(500);
        res.json({
            message: 'Server error, please try again later.'
        });
    }
}

async function getGoogleAuth(): Promise<OAuth2Client> {
    const CLIENT_ID: string | undefined = process.env.CLIENT_ID;
    const CLIENT_SECRET: string | undefined = process.env.CLIENT_SECRET;
    const REDIRECT_URI: string | undefined = process.env.REDIRECT_URI;
    const REFRESH_TOKEN: string | undefined = process.env.REFRESH_TOKEN;

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
        cout.warn('Environment', 'CLIENT_ID, CLIENT_SECRET, REDIRECT_URI or REFRESH_TOKEN isn\'t added to the environment variable.');
        process.exit(1);
    }

    const client: OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    client.setCredentials({ refresh_token: REFRESH_TOKEN });

    cout.info('Google', 'OAuth2 client created.');
    return client;
}

async function getOrRefreshDtsg(firstRun: boolean): Promise<void> {
    const cookie: string | undefined = process.env.FACEBOOK_COOKIE;

    if (!cookie) {
        cout.warn('Environment', 'FACEBOOK_COOKIE isn\'t added to the environment variable.');
        process.exit(1);
    }

    const jar: CookieManager = request.getJar();

    jar.setCookie(cookie, 'https://adsmanager.facebook.com/');

    try {
        const response: RequestURL.Response<string> = await request.get<string>('https://adsmanager.facebook.com/adsmanager?act=403987283654016&nav_source=no_referrer#', jar, { responseType: 'text' });
        const body: string = response.body;

        const dtsg: RegExpMatchArray | null = body.match(/"DTSGInitData",\[],\{"token":"([^"]+)",/);
        const token: RegExpMatchArray | null = /window\.__accessToken="(\S+)"/g.exec(body);

        if (!dtsg || !token)
            throw new Error('Unable to get dtsg or token.');

        process.env.FACEBOOK_TOKEN = token[1];
        process.env.DTSG = dtsg[1];

        cout.info('Environment', firstRun ? 'Retrieved token and dtsg.' : 'Refreshed token and dtsg.');
        setTimeout(getOrRefreshDtsg, 24 * 3600 * 1000, false);
    } catch (error: any) {
        cout.error('Environment', error);
        process.exit(1);
    }
}

function cleanCache(): void {
    const expired: number = parseInt(process.env.CACHE_EXPIRED ?? '300000', 10);

    if (!existsSync(directory)) {
        cout.warn('DataBase', 'Cache directory does not exist.');
        mkdirSync(directory, { recursive: true });
        return;
    }

    const files: Array<string> = readdirSync(directory);

    for (const file of files) {
        const stat: Stats = statSync(resolve(directory, file));

        if (Date.now() - stat.ctimeMs > expired) {
            try {
                unlinkSync(resolve(directory, file));
                cout.info('DataBase', 'Deleted expired cache file: ' + file);
            } catch (error: any) {
                error.name = 'DataBase';
                error.message = 'Failed to delete expired cache file: ' + file;
                cout.error('DataBase', error);
            }
        }
    }
    cout.info('DataBase', 'Cache cleanup completed.');
    setTimeout(cleanCache, expired);
}

function getSSL(): Record<string, string> {
    const dirSSL: string = resolve(cwd, 'ssl');

    if (!existsSync(dirSSL))
        mkdirSync(dirSSL, { recursive: true });

    const key: string = resolve(dirSSL, (process.env.SSL_KEY ?? 'server.key'));
    const cert: string = resolve(dirSSL, (process.env.SSL_CERT ?? 'server.crt'));

    if (!existsSync(key) || !existsSync(cert)) {
        cout.warn('SSL', 'SSL key or certificate not found.');
        process.exit(1);
    }

    return {
        key: readFileSync(key, 'utf-8'),
        cert: readFileSync(cert, 'utf-8')
    }
}

!(async function (): Promise<void> {
    cout.wall('=', 100);

    await checkAndUpdate();
    await getOrRefreshDtsg(true);
    const client: OAuth2Client = await getGoogleAuth();
    const model: Record<string, DataBase.Model> = await database();

    const PORT: string | number = process.env.PORT || 3000;
    const app: Express = express();
    const server: Server | Express = process.env.SSL === 'true' ? createServer(getSSL(), app) : app;

    app.locals.database = model;
    app.locals.client = client;
    app.locals.google = google;
    app.locals.mail = google.gmail({ version: 'v1', auth: client });

    app.set('view engine', 'ejs');
    app.set('json spaces', 2);
    app.set('views', dirViews);

    app.use(Cookie());
    app.use(Cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/s', express.static(dirStatic));

    await applyRoutes(app);

    app.get('/api/get-media-from-shortcode', getMediaFromShortCode);
    app.post('/api/get-media-from-shortcode', getMediaFromShortCode);

    app.get('/danh-cho-babi-cua-toi-do', function (req: Request, res: Response): void {
        res.status(200);
        res.render('heart');
    });

    app.use('*', function (req: Request, res: Response): void {
        res.status(404);
        res.render('404');
    });

    if (process.env.AUTO_CLEAN_CACHE === 'true')
        setTimeout(cleanCache, parseInt(process.env.CACHE_EXPIRED ?? '300000', 10));

    server.listen(PORT, async (): Promise<void> => {
        cout.info('Server', 'Listening on port ' + PORT);
        cout.wall('=', 100);
    });
})();