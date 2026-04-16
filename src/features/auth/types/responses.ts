export interface User {
    id: number;
    nickname: string;
    gold: number;
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
