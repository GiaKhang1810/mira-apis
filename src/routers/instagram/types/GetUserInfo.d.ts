export namespace GetUserInfo {
    export interface User {
        edge_followed_by: {
            count: number;
        }
        edge_follow: {
            count: number;
        }
        full_name: string;
        username: string;
        is_verified: boolean;
        profile_pic_url: string;
        profile_pic_url_hd: string;
        is_private: boolean;
        id: string;
        edge_owner_to_timeline_media: {
            count: number;
        }
    }

    export interface OutputDetails {
        userID: string;
        username: string;
        name: string;
        isVerified: boolean;
        avatar: string;
        isPrivate: boolean;
        postCount: number;
        followerCount: number;
        followingCount: number;
    }

    export interface OriDetails {
        data: {
            user: User;
        }
    }
}