export function getUniqueID(tiktokURL: string): string {
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