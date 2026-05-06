export interface User {
    id: string;
    nickname: string;
    gold: number;
    friendCode: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    bannedUntil: Date | null;
    banReason: string | null;
}


export interface LoginCredentials {
    login: string;
    password: string;
}


export interface RegisterData {
    inviteCode: string;
    nickname: string;
    login: string;
    password: string;
}


export interface AuthResponse {
    accessToken: string;
}
