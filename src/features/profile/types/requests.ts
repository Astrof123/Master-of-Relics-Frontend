import type { ReportType } from "./report";

export interface FindFriendsData {
    searchQuery: string;
}

export interface SendReportUserData {
    reportedUserId: string;
    reportType: ReportType;
    text: string;
}

export interface GetReportsData {
    page?: number;
    limit?: number;
    reportedUserId?: string;
    startDate?: string;
    endDate?: string;
    isProcessed?: boolean;
}

export interface BanUserData {
    bannedUserId: string;
    bannedUntil: string;
    text: string;
}

export interface UnbanUserData{
    bannedUserId: string;
}