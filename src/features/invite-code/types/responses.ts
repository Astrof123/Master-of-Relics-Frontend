import type { User } from "@/features/auth/types/responses";
import type { InviteCodeStatus } from "./invite-code";

export interface GetInviteCodesResponseData {
    data: InviteCodeData[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface InviteCodeData {
    id: string;
    user: User;
    userId: string;
    status: InviteCodeStatus;
    usedAt: Date;
    createdAt: Date;
}