export interface GetUserID {
    data: SerpData;
}

interface SerpData {
    serpResponse: {
        results: {
            edges: Array<ProfileEdge>;
        }
    }
}

interface ProfileEdge {
    relay_rendering_strategy: {
        view_model: {
            profile: {
                id: string;
            }
        }
    }
}
