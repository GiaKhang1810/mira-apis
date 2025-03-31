export interface Headers {
    "Cookie": string;
    "Priority": string;
    "Origin": string;
    "Sec-Ch-Ua": string;
    "Sec-Ch-Ua-Full-Version-List": string;
    "Sec-Ch-Ua-Mobile": string;
    "Sec-Ch-Ua-Model": string;
    "Sec-Ch-Ua-Platform": string;
    "Sec-Ch-Ua-Platform-Version": string;
    "Sec-Fetch-Dest": string;
    "Sec-Fetch-Mode": string;
    "Sec-Fetch-Site": string;
    "Sec-Fetch-User": string;
    "Upgrade-Insecure-Requests": string;
    "User-Agent": string;
}

export interface GetStoryID {
    albumid: string;
    storyid?: string;
}

export interface ItemThumbnail {
    id: string;
    height: number;
    width: number;
    uri: string;
}

export interface AxiosVideoResponse {
    id: string;
    description: string;
    created_time: string;
    source: string;
    thumbnails: {
        data: Array<ItemThumbnail>
    };
    reactions: {
        summary: {
            total_count: number;
        };
    };
    comments: {
        summary: {
            total_count: number;
        };
    };
    from: {
        name: string;
        id: string;
    };
}

export interface VideoDetails {
    videoID: string;
    userID: string;
    author: string;
    desc: string;
    publishedAt: string;
    reactCount: number;
    commentCount: number;
    url: string;
    thumbnails: Array<ItemThumbnail>
}

export interface StoryRepresentations {
    width: number;
    height: number;
    base_url: string;
    mime_type: string;
}

export interface PrefetchRepresentations {
    representations: Array<StoryRepresentations>;
}

export interface StoryOwner {
    id: string;
    name: string;
}

export interface StoryMedia {
    blurred_image: {
        uri: string;
    };
    preferred_thumbnail: {
        image: {
            uri: string;
        };
    };
    previewImage: {
        uri: string;
    };
    image: {
        height: number;
        width: number;
    };
    title: {
        text: string;
    };
    publish_time: number;
    videoDeliveryLegacyFields: {
        browser_native_hd_url: string;
        browser_native_sd_url: string;
    };
}

export interface StoryAttachment {
    media: StoryMedia;
}

export interface StoryCard {
    feedback_summary: {
        total_reaction_count: number;
    };
    story_thumbnail: {
        uri: string;
    };
}

export interface StoryEdges {
    attachments: [StoryAttachment];
    story_card_info: StoryCard;
}

export interface FirstStory {
    owner: StoryOwner;
    unified_stories: {
        edges: [{ node: StoryEdges }];
    };
}

export interface AxiosStoryDetails {
    data: {
        nodes: [FirstStory];
    };
    extensions: {
        all_video_dash_prefetch_representations: [PrefetchRepresentations];
    };
}

export interface StoryDetails {
    userID: string;
    name: string;
    title: string;
    publishedAt: number;
    height: number;
    width: number;
    url: {
        hd: string;
        sd: string;
    };
    images: {
        blurred: string;
        preferred: string;
        preview: string;
        thumbnail: string;
    };
    reactCount: number;
    other_url: StoryRepresentations[];
}

export interface AxiosUserIDResponse {
    data: {
        serpResponse: {
            results: {
                edges: [{
                    relay_rendering_strategy: {
                        view_model: {
                            profile: { 
                                id: string;
                            };
                        };
                    };
                }];
            };
        };
    };
}