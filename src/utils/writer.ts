import { Readable } from 'stream';
import { EventEmitter } from 'events';
import { Request } from './request';
import { resolve, extname, basename } from 'path';
import { createWriteStream, WriteStream, mkdirSync, existsSync } from 'fs';

type ResCallback = (value: Writer.Response) => void;
type RejCallback = (value: Error) => void;

const mine2ext: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'application/pdf': '.pdf',
    'text/plain': '.txt',
    'application/json': '.json',
    'text/html': '.html',
}

export class Writer extends EventEmitter {
    private request: Request = new Request({ responseType: 'stream' });
    private baseDir: string = resolve(__dirname, '..', 'database', 'cache');

    constructor(request?: Request, baseDir?: string) {
        super();

        if (baseDir)
            this.baseDir = baseDir;

        if (!existsSync(this.baseDir))
            mkdirSync(this.baseDir, { recursive: true });

        if (request)
            this.request = request;
    }

    async download(url: string, name?: string): Promise<Writer.Response> {
        let ori: string | undefined, ext: string | undefined;

        const response: RequestURL.Response<Readable> = await this.request.get<Readable>(url);
        const streamer: Readable = response.body;

        const disposition: string = response.headers['content-disposition'];
        if (disposition && disposition.includes('filename=')) {
            const match: RegExpMatchArray | null = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);

            if (match?.[1]) {
                ori = match[1].replace(/^["']|["']$/g, '');
                ext = extname(ori);
            }
        }

        if (!ori) {
            ori = basename(url.split('?')[0]);
            ext = extname(ori);
        }

        if (!ext && name && !extname(name)) {
            const mime: string = response.headers['content-type'];
            ext = mine2ext[mime] || '';
        }

        const filename: string = (name || ori || String(Date.now())).replace(/\.[^.]+$/, '') + ext;;
        const save_location: string = resolve(this.baseDir, filename);
        const writer: WriteStream = createWriteStream(save_location);

        return await new Promise((resolve: ResCallback, reject: RejCallback): void => {
            let size: number = 0;
            const start: number = Date.now();

            streamer.on('data', (chunk: Buffer): number => size += chunk.length);

            streamer.pipe(writer);

            writer.on('finish', (): void => {
                const result: Writer.Response = {
                    download_time_ms: Date.now() - start,
                    item_size: size,
                    extension: ext || '',
                    filename,
                    save_location
                }

                this.emit('finish', result);
                resolve(result);
            });
            writer.on('error', (error: Error): void => {
                this.emit('error', error);
                reject(error);
            });
        });
    }
}

export const writer: Writer = new Writer();
export default writer;