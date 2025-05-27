import { extname } from 'path';

export function getContentType(filename: string): string {
    const ext = extname(filename).toLowerCase();

    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        case '.mp4':
            return 'video/mp4';
        case '.webm':
            return 'video/webm';
        case '.mp3':
            return 'audio/mpeg';
        case '.wav':
            return 'audio/wav';
        case '.ogg':
            return 'audio/ogg';
        case '.json':
            return 'application/json';
        case '.txt':
            return 'text/plain';
        case '.pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
}
export default getContentType;