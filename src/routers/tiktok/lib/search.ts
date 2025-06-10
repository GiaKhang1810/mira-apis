import { Request } from '@utils/request';
import { getAddr, GetAddrDetails } from './addr';

const request: Request = new Request({ core: 'fetch', maxRedirects: 1 });

type Query = {
    aweme_list: Array<{
        aweme_id: string;
    }>;
}

export async function searchQuery(query: string, length: number = 20): Promise<Array<GetAddrDetails.OutputDetails>> {
    const response: Request.Response<string> = await request.get<string>('https://api16-normal-c-alisg.tiktokv.com/aweme/v1/search/item/', undefined, {
        params: {
            count: length,
            keyword: query,
            version_code: '1.0.1',
            app_name: 'tiktok_snail',
            channel: 'App Store',
            device_id: '4564563',
            aid: '364225',
            os_version: '16.2',
            device_platform: 'iphone',
            iid: '7386407102867523334',
            device_brand: 'iphone',
            device_type: 'iPhone10,6'
        },
        headers: {
            'User-Agent': 'Whee 1.0.1 rv:10102 (iPhone; iOS 16.2; en_US) Cronet',
            'X-Khronos': Math.floor(Date.now() / 1000).toString()
        }
    });

    const queued: Array<Promise<GetAddrDetails.OutputDetails>> = [];
    const body: Query = JSON.parse(response.body);

    for (let item of body.aweme_list) 
        queued.push(getAddr(item.aweme_id));

    return await Promise.all(queued);
}