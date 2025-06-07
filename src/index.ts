import 'dotenv/config';

import { resolve } from 'path';
import { randomUUID, createHash } from 'crypto';
import { readFileSync, existsSync, mkdirSync } from 'fs';

import Cookie from 'cookie-parser';
import Cors from 'cors';
import express, { Request, Response, Express, Router } from 'express';
import { createServer, Server } from 'https';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { TOTP as totp } from 'totp-generator';

import cout from '@utils/cout';
import request, { Session, Request as RequestURL } from '@utils/request';
import space from '@utils/space';

import checkAndUpdate from './updater';
import database from './database';
import userController from './control/user';
import RoutesList from './routers';

const cwd: string = process.cwd();
const dirViews: string = resolve(cwd, 'views');
const dirStatic: string = resolve(cwd, 'static');

async function applyRoutes(app: Express): Promise<void> {
    type RouteType = {
        pathRoute: string;
        modelRoute: Router;
    }

    cout.wall('=', 100);
    RoutesList.forEach(function (Route: RouteType): void {
        const pathRoute: string = Route.pathRoute;
        const modelRoute: Router = Route.modelRoute;

        app.use(pathRoute, modelRoute);
    });

    cout.info('Router', RoutesList.length + ' routes loaded successfully');
}

async function getGoogleAuth(): Promise<OAuth2Client> {
    const CLIENT_ID: string | undefined = process.env.CLIENT_ID;
    const CLIENT_SECRET: string | undefined = process.env.CLIENT_SECRET;
    const REDIRECT_URI: string | undefined = process.env.REDIRECT_URI;
    const REFRESH_TOKEN: string | undefined = process.env.REFRESH_TOKEN;

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
        cout.warn('Environment.getGoogleAuth', 'CLIENT_ID, CLIENT_SECRET, REDIRECT_URI or REFRESH_TOKEN isn\'t added to the environment variable.');
        process.exit(1);
    }

    const client: OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    client.setCredentials({ refresh_token: REFRESH_TOKEN });

    cout.info('Google', 'OAuth2 client created.');
    return client;
}

async function getOrRefreshDtsg(firstRun: boolean = true): Promise<void> {
    type FORM_DATA = Record<string, any>;

    type ANDROID_DEVICE = {
        model: string;
        build: string;
    }

    type ANDROID_DEVICE_BUILD = {
        userAgent: string;
        device: ANDROID_DEVICE;
    }

    type SessionCookie = {
        name: string;
        value: string;
    }

    type Data = {
        error?: {
            code: number;
            error_data: {
                login_first_factor: string;
                uid: number;
                machine_id: string;
            }
        }
        access_token: string;
        session_cookies: Array<SessionCookie>;
    }

    const ANDROID_DEVICES: Array<ANDROID_DEVICE> = [
        { model: 'Pixel 6', build: 'SP2A.220505.002' },
        { model: 'Pixel 5', build: 'RQ3A.210805.001.A1' },
        { model: 'Samsung Galaxy S21', build: 'G991USQU4AUDA' },
        { model: 'OnePlus 9', build: 'LE2115_11_C.48' },
        { model: 'Xiaomi Mi 11', build: 'RKQ1.200826.002' }
    ];

    function randomDevice(): ANDROID_DEVICE_BUILD {
        const device: ANDROID_DEVICE = ANDROID_DEVICES[Math.floor(Math.random() * ANDROID_DEVICES.length)];

        return {
            userAgent: 'Dalvik/2.1.0 (Linux; U; Android 11; ' + device.model + ' Build/' + device.build,
            device
        }
    }

    function random(length: number = 10): string {
        const char: string = 'abcdefghijklmnopqrstuvwxyz';
        let output: string = char.charAt(Math.floor(Math.random() * char.length));
        for (let i: number = 0; i < length - 1; i++)
            output += char.charAt(Math.floor(36 * Math.random()));

        return output;
    }

    function encodeSig(sig: FORM_DATA): string {
        let data: string = '';
        Object.keys(sig).forEach((key: string): string => data += key + '=' + sig[key]);
        return createHash('md5').update(data + '62f8ce9f74b12f84c123cc23437a4a32').digest('hex');
    }

    function sort(sig: FORM_DATA): FORM_DATA {
        const sorted: Array<string> = Object.keys(sig).sort();
        const sortedData: FORM_DATA = {}

        for (let key of sorted)
            sortedData[key] = sig[key];

        return sortedData;
    }

    async function fetchData(form: FORM_DATA, device: ANDROID_DEVICE_BUILD): Promise<Data> {
        const response: RequestURL.Response<Data> = await request.post<Data>('https://b-graph.facebook.com/auth/login', undefined, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Fb-Friendly-Name': form.fb_api_req_friendly_name,
                'X-Fb-Http-Engine': 'Liger',
                'User-Agent': device.userAgent,
                'X-Fb-Connection-Type': 'WIFI',
                'X-Fb-Net-Hni': '',
                'X-Fb-Sim-Hni': '',
                'X-Fb-Device-Group': '5120',
                'X-Tigon-Is-Retry': 'False',
                'X-Fb-Rmd': 'cached=0;state=NO_MATCH',
                'X-Fb-Request-Analytics-Tags': 'unknown',
                'Authorization': 'OAuth 0' + form.access_token,
                'Accept-Language': 'en-US,en;q=0.9',
                'X-Fb-Client-Ip': 'True',
                'X-Fb-Server-Cluster': 'True'
            },
            body: new URLSearchParams(form),
            type: 'json'
        });

        return response.body;
    }

    try {
        const username: string | undefined = process.env.FACEBOOK_USERNAME;
        const password: string | undefined = process.env.FACEBOOK_PASSWORD;

        if (!username || !password)
            return cout.warn('Enviroment.getOrRefreshDtsg', 'FACEBOOK_USERNAME or FACEBOOK_PASSWORD isn\'t added to .env');

        const device: ANDROID_DEVICE_BUILD = randomDevice();
        const deviceID: string = randomUUID();
        const familyDeviceID: string = randomUUID();
        const adid: string = randomUUID();
        const machineID: string = random(24);

        let form: FORM_DATA = {
            adid,
            email: username,
            password,
            format: 'json',
            device_id: deviceID,
            cpl: 'true',
            family_device_id: familyDeviceID,
            locale: 'en_US',
            client_country_code: 'US',
            credentials_type: 'device_based_login_password',
            generate_session_cookies: '1',
            generate_analytics_claim: '1',
            generate_machine_id: '1',
            currently_logged_in_userid: '0',
            irisSeqID: '1',
            try_num: '1',
            enroll_misauth: 'false',
            meta_inf_fbmeta: 'NO_FILE',
            source: 'login',
            machine_id: machineID,
            fb_api_req_friendly_name: 'authenticate',
            fb_api_caller_class: 'com.facebook.account.login.protocol.Fb4aAuthHandler',
            api_key: '882a8490361da98702bf97a021ddc14d',
            access_token: '350685531728|62f8ce9f74b12f84c123cc23437a4a32',
            advertiser_id: adid,
            device_platform: 'android',
            app_version: '392.0.0.0.66',
            network_type: 'WIFI'
        }

        form.sig = encodeSig(sort(form));

        let data: Data = await fetchData(form, device);

        if (data.error && data.error.code === 401)
            return cout.warn('Enviroment.getOrRefreshDtsg', 'Wrong username/password.');

        if (data.error && data.error.code === 406) {
            const twofactor: string | undefined = process.env.FACEBOOK_TWO_FACTOR;

            if (!twofactor)
                return cout.warn('Enviroment.getOrRefreshDtsg', 'FACEBOOK_TWO_FACTOR isn\'t added to .env');

            const otp: string = totp.generate(decodeURI(twofactor).replace(/\s+/g, '').toUpperCase()).otp;

            form = {
                ...form,
                twofactor_code: otp,
                encrypted_msisdn: '',
                userid: data?.error?.error_data?.uid,
                machine_id: data?.error?.error_data?.machine_id ?? machineID,
                first_factor: data?.error?.error_data?.login_first_factor,
                credentials_type: 'two_factor'
            }
            form.sig = encodeSig(sort(form));
            data = await fetchData(form, device);
        }

        if (data.error && data.error.code === 401)
            return cout.warn('Enviroment.getOrRefreshDtsg', 'Can\'t authenticate with twofactor code.');

        process.env.FACEBOOK_TOKEN = data.access_token;
        const cookies: string = data.session_cookies.map((item: SessionCookie): string => item.name + '=' + item.value).join('; ');
        process.env.FACEBOOK_COOKIE = cookies;

        const jar: Session = new Session(cookies, 'https://business.facebook.com/');
        const response: RequestURL.Response<string> = await request.get<string>('https://business.facebook.com/content_management', jar, { type: 'text' });
        const body: string = response.body;

        const dtsg: RegExpMatchArray | null = body.match(/"DTSGInitData",\[],\{"token":"([^"]+)",/);

        if (!dtsg)
            return cout.warn('Enviroment.getOrRefreshDtsg', 'Unable to get dtsg.');

        process.env.DTSG = dtsg[1];
        cout.info('Environment', firstRun ? 'Retrieved token and dtsg.' : 'Refreshed token and dtsg.');
    } catch (error: any) {
        cout.error('Enviroment.getOrRefreshDtsg', error);
    } finally {
        setTimeout(getOrRefreshDtsg, 24 * 3600 * 1000, false);
    }
}

async function applySpace(): Promise<void> {
    space.client = await getGoogleAuth();
    space.database = await database();
}

function getSSL(): Record<string, string> {
    const dirSSL: string = resolve(cwd, 'ssl');

    if (!existsSync(dirSSL))
        mkdirSync(dirSSL, { recursive: true });

    const key: string = resolve(dirSSL, (process.env.SSL_KEY ?? 'server.key'));
    const cert: string = resolve(dirSSL, (process.env.SSL_CERT ?? 'server.crt'));

    if (!existsSync(key) || !existsSync(cert)) {
        cout.warn('SSL', 'SSL key or certificate not found.');
        return {}
    }

    return {
        key: readFileSync(key, 'utf-8'),
        cert: readFileSync(cert, 'utf-8')
    }
}

!(async function (): Promise<void> {
    cout.wall('=', 100);

    await checkAndUpdate();
    await getOrRefreshDtsg();
    await applySpace();

    const PORT: string | number = process.env.PORT || 3000;
    const app: Express = express();
    const SSL: Record<string, string> = getSSL();
    const server: Server | Express = process.env.SSL === 'true' && (Object.keys(SSL).length === 2) ? createServer(SSL, app) : app;

    app.set('view engine', 'ejs');
    app.set('json spaces', 2);
    app.set('views', dirViews);

    app.use(Cookie());
    app.use(Cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/s', express.static(dirStatic));

    await userController(app);
    await applyRoutes(app);

    app.use('*', function (req: Request, res: Response): void {
        res.status(404);
        res.render('404');
    });

    server.listen(PORT, async (): Promise<void> => {
        cout.info('Server', 'Listening on port ' + PORT);
        cout.wall('=', 100);
    });
})();