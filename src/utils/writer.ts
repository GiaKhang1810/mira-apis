import { Readable } from 'stream';
import { EventEmitter } from 'events';
import { resolve, extname, basename } from 'path';
import { createWriteStream, WriteStream, mkdirSync, existsSync } from 'fs';
import request, { Request, CookieManager } from './request';
import { randomUUID } from 'crypto';
import { getExtension } from 'mime';

type ResCallback = (value: Writer.Response) => void;
type RejCallback = (value: Error) => void;

export class Writer extends EventEmitter {
    private request: Request;
    private jar: CookieManager;
    private directory: string;
    private defaultOptions: Writer.Options = {
        headers: {
            'Prifilety': 'u=0, i',
            'Sec-Ch-Ua': 'Chromium;v=134, Not:A-Brand;v=24, Google Chrome;v=134',
            'Sec-Ch-Ua-Full-Version-List': 'Chromium;v=134.0.6998.119, Not:A-Brand;v=24.0.0.0, Google Chrome;v=134.0.6998.119',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Model': '',
            'Sec-Ch-Ua-Platform': 'Windows',
            'Sec-Ch-Ua-Platform-Version': '19.0.0',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
        }
    }

    constructor(options: Writer.Options = {}) {
        super();

        if (options.directory)
            this.defaultOptions.directory = resolve(options.directory);
        else
            this.defaultOptions.directory = resolve(__dirname, '..', 'database', process.env.CACHE_DIRECTORY ?? 'cache');

        if (!existsSync(this.defaultOptions.directory))
            mkdirSync(this.defaultOptions.directory, { recursive: true });

        this.directory = this.defaultOptions.directory;

        if (options.jar && options.jar instanceof CookieManager)
            this.jar = options.jar;
        else
            this.jar = new CookieManager();

        if (options.headers)
            this.defaultOptions.headers = {
                ...this.defaultOptions.headers,
                ...options.headers
            }

        this.request = request.defaults({
            jar: this.jar,
            headers: this.defaultOptions.headers,
            responseType: 'stream'
        });
    }

    public async download(url: string, name?: string): Promise<Writer.Response> {
        let file: string | undefined, ext: string | undefined;
        const response: RequestURL.Response<Readable> = await this.request.get<Readable>(url);
        const Streamer: Readable = response.body;

        const disposition: string = response.headers['content-disposition'];
        if (disposition && disposition.includes('filename=')) {
            const match: RegExpMatchArray | null = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);

            if (match?.[1]) {
                file = match[1].replace(/^["']|["']$/g, '');
                ext = extname(file);
            }
        }

        if (!file) {
            file = basename(url.split('?')[0]);
            ext = extname(file);
        }

        if (!ext) {
            const mime = response.headers['content-type'];
            ext = getExtension(mime) || '.bin';
        }

        if (ext && !ext.startsWith('.'))
            ext = '.' + ext;

        const baseName = name ?? file ?? randomUUID();
        const filename = extname(baseName) ? baseName : baseName + ext;
        const location: string = resolve(this.directory, filename);
        const writeStream: WriteStream = createWriteStream(location);

        const Promiser: Promise<Writer.Response> = new Promise<Writer.Response>((resolve: ResCallback, reject: RejCallback) => {
            let size: number = 0;
            const start: number = Date.now();

            Streamer.on('data', (chunk: Buffer): number => size += chunk.length);
            Streamer.pipe(writeStream);

            writeStream.on('finish', (): void => {
                const delay: number = Date.now() - start;
                const response: Writer.Response = {
                    delay,
                    size,
                    ext: ext ?? '',
                    name: filename,
                    location
                }

                this.emit('done', response);
                resolve(response);
            });

            writeStream.on('error', (error: Error): void => {
                this.emit('error', error);
                reject(error);
            });
        });

        return await Promiser;
    }

    public defaults(options: Writer.Options = {}): Writer {
        if (options.directory)
            this.defaultOptions.directory = resolve(options.directory);
        else
            this.defaultOptions.directory = resolve(__dirname, '..', 'database', process.env.CACHE_DIRECTORY ?? 'cache');

        if (!existsSync(this.defaultOptions.directory))
            mkdirSync(this.defaultOptions.directory, { recursive: true });

        this.directory = this.defaultOptions.directory;

        if (options.jar && options.jar instanceof CookieManager)
            this.jar = options.jar;

        if (options.headers)
            this.defaultOptions.headers = {
                ...this.defaultOptions.headers,
                ...options.headers
            }

        this.request = request.defaults({
            jar: this.jar,
            headers: this.defaultOptions.headers,
            responseType: 'stream'
        });

        return this;
    }
}

export const writer: Writer = new Writer();
export default writer;