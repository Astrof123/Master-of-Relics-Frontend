export interface GetUsersData {
    page?: number;
    limit?: number;
    userId?: string;
    isBanned?: boolean;
    isAdmin?: boolean; 
}

export interface SetAdminData {
    userId: string;
    isAdmin: boolean;
}