export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface ItemThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Thumbnails {
    default: ItemThumbnail;
    medium: ItemThumbnail;
    high: ItemThumbnail;
    standard?: ItemThumbnail;
    maxres?: ItemThumbnail;
}

export interface DetailsSnippet {
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    tags: string[];
}

export interface DetailsStatistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
}

export interface ItemsDetailsResponse {
    id: { videoId: string } | string;
    snippet: DetailsSnippet;
    statistics: DetailsStatistics;
}

export interface AxiosResponse {
    kind: string;
    etag: string;
    items: Array<ItemsDetailsResponse>;
    pageInfo: PageInfo;
}

export interface Details {
    videoID: string;
    title: string;
    channel: string;
    desc: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    viewCount?: string;
    likeCount?: string;
    favoriteCount?: string;
    commentCount?: string;
    url?: string;
}