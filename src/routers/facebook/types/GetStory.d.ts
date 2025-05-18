export namespace GetStory {
    export interface ComponentOtherURL {
        width: number;
        height: number;
        base_url: string;
        mime_type: string;
    }

    export interface OutputDetails {
        userID: string;
        name: string;
        title: string;
        publishedAt: number;
        height: number;
        width: number;
        download_url: {
            url_hd: string;
            url_sd: string;
        }
        images: {
            blurred: string;
            preferred: string;
            preview: string;
            thumbnail: string;
        }
        react_total: number;
        other_url?: Array<ComponentOtherURL>;
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
        }
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
            all_video_dash_prefetch_representations: [
                {
                    representations: Array<ComponentOtherURL>;
                }
            ];
        }
    }
}