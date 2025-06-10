import { Request } from '@utils/request';

const request: Request = new Request({ core: 'fetch', maxRedirects: 1 });


export async function getRedirect(url: string): Promise<string> {
    const response: Request.Response<string> = await request.head<string>(url);
    const location: string | undefined = response.headers.location;

    if (!location) {
        const error: Error = new Error();
        error.name = '404';
        error.message = 'Redirect location not found or location isn\'t public';
        throw error;
    }

    return location;
}