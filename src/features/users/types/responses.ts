import type { User } from "@/features/auth/types/responses";

export interface GetUsersResponseData {
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}