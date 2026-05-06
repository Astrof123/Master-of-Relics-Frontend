import type { User } from "@/features/auth/types/responses";

export interface UserProfile {
    id: string;
    nickname: string;
    isOnline: boolean;
    relationship: Relationship;
    relationshipInitiator: string | null;
    friends: Friend[];
    stats: Stats;
    isReported: boolean;
    offersFriendship: OfferFriendship[] | null; 
    isBanned: boolean; 
}

export interface Friend {
    id: number;
    nickname: string;
    friendId: string;
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
    requesterId: string;
}

export class ReportResponseData {
    id!: number;
    text!: string;
    reportType!: string;
    reportedUserId!: string;
    reportedUser!: User;
    requesterUserId!: string;
    requesterUser!: User;
    createdAt!: Date;
    isProcessed!: boolean;
}


export class GetReportsResponseDto {
    data!: ReportResponseData[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}