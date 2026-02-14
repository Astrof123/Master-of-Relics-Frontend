export const SOCKETSTATUS  = {
    DISCONNECTED: 'DISCONNECTED',
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    ERROR: 'ERROR',
} as const;
export type SocketStatus  = typeof SOCKETSTATUS [keyof typeof SOCKETSTATUS];


export interface SocketMessage<T = any> {
    event: string;
    data: T;
    timestamp: number;
    error?: string;
}


const RoomType  = {
    GLOBAL: 'global',
    LOBBY: 'lobby',
    GAME: 'game'
} as const;
export type RoomType  = typeof RoomType [keyof typeof RoomType];


export interface Room {
    id: string;
    type: RoomType;
    name: string;
    participants: SocketUser[];
}

export interface SocketUser {
    socketId: string;
    userId: string;
    username: string;
}