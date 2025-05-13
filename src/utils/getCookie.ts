export function parseCookies(cookies: string): Record<string, string> {
    const cookieArray: Array<string> = cookies.split('; ');
    const cookieObject: Record<string, string> = {}

    for (const cookie of cookieArray) {
        const [key, value] = cookie.split('=');
        cookieObject[key] = decodeURIComponent(value);
    }

    return cookieObject;
}

export function getCookie(name: string, cookies: string): string | undefined {
    const cookieObject: Record<string, string> = parseCookies(cookies);
    return cookieObject[name];
}

export default {
    parseCookies,
    getCookie
}