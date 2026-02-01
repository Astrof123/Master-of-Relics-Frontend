export interface User {
    id: string;
    nickname: string;
    gold: number;
}


export interface LoginCredentials {
    login: string;
    password: string;
}


export interface RegisterData {
    nickname: string;
    login: string;
    password: string;
}


export interface AuthResponse {
    accessToken: string;
}
