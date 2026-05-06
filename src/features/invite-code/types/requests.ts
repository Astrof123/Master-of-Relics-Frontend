import type { InviteCodeStatus } from "./invite-code";

export interface ChangeStatusData {
    inviteCodeId: string;
    newStatus: InviteCodeStatus;
}

export interface CreateInviteCodesData {
    count: number;
}

export interface DeleteInviteCodeData {
    inviteCodeId: string;
}

export interface DeleteInviteCodeData {
    inviteCodeId: string;
}

export interface GetInviteCodesData {
    page?: number;
    inviteCodeId?: string;
    limit?: number;
    status?: InviteCodeStatus
    startDate?: string;
    endDate?: string;
}