export interface UserProfile {
    id: number;
    nickname: string;
    isOnline: boolean;
    relationship: Relationship;
    relationshipInitiator: number | null;
    friends: Friend[];
    stats: Stats;
    isReported: boolean;
    offersFriendship: OfferFriendship[] | null; 
}

export interface Friend {
    id: number;
    nickname: string;
    friendId: number;
    isOnline: boolean;
}

export interface Stats {
    totalGames: number;
    wins: number;
    winSeries: number;
}

export const RELATIONSHIP  = {
    FRIEND: 'friend',
    STRANGER: "stranger",
    OFFER: "offer"
};

export type Relationship  = typeof RELATIONSHIP [keyof typeof RELATIONSHIP];

export interface OfferFriendship {
    id: number;
    nickname: string;
    requesterId: number;
}