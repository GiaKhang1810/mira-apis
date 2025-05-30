export namespace GetStory {
    export interface ComponentNail {
        id: string;
        height: number;
        width: number;
        url: string;
    }

    export interface OutputVideo {
        id: string;
        url: string;
        thumbnails: Array<ComponentNail>;
    }

    export interface OutputDetails {
        userID: string;
        name: string;
        title: string;
        publishedAt: number;
        react_total: number;
        videos: Array<OutputVideo>;
    }

    export interface OwnerDetails {
        id: string;
        name: string;
    }

    export interface Media {
        blurred_image: {
            uri: string;
        }
        preferred_thumbnail: {
            image: {
                uri: string;
            }
        }
        previewImage: {
            uri: string;
        }
        image: {
            height: number;
            width: number;
        }
        title: {
            text: string;
        }
        publish_time: number;
        videoDeliveryLegacyFields: {
            browser_native_hd_url: string;
            browser_native_sd_url: string;
        },
        videoId: string;
    }

    export interface Edges {
        attachments: [
            {
                media: Media;
            }
        ];
        story_card_info: {
            feedback_summary: {
                total_reaction_count: number;
            }
            story_thumbnail: {
                uri: string;
            }
        }
    }

    export interface OriDetails {
        data: {
            nodes: [
                {
                    owner: OwnerDetails;
                    unified_stories: {
                        edges: [
                            {
                                node: Edges;
                            }
                        ];
                    }
                }
            ];
        }
        extensions: {
            all_video_dash_prefetch_representations: Array<{ video_id: string; }>;
        }
    }
}