export function isRedirectURL(tiktokURL: string): boolean {
    try {
        const url: URL = new URL(tiktokURL);

        return (
            (url.hostname === 'vm.tiktok.com' || url.hostname === 'vt.tiktok.com') &&
            url.pathname !== '/' &&
            /^\/\w+\/?$/.test(url.pathname)
        );
    } catch {
        const error: Error = new Error('Invalid TikTok URL.');
        error.name = '400';
        throw error;
    }
}
