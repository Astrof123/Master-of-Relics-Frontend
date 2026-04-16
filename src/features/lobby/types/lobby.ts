export interface LobbyPlayer {
    id: number,
    nickname: string,
    isReady: boolean,
    isHost: boolean
}


export interface Lobby {
    id: string,
    name: string,
    players: Record<number, LobbyPlayer>,
    state: LobbyStateType,
    code: string | null;
    isPrivate: boolean;
    options: {
        mode: GameModeType
    }
}

export const LOBBYSTATETYPE  = {
    WAITING: 'waiting',
    PLAYING: 'playing'
} as const;

export type LobbyStateType  = typeof LOBBYSTATETYPE [keyof typeof LOBBYSTATETYPE];


const GAMEMODETYPE  = {
    CLASSIC: 'classic',
} as const;

export type GameModeType  = typeof GAMEMODETYPE [keyof typeof GAMEMODETYPE];