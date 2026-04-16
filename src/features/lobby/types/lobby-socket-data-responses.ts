import type { Lobby } from "./lobby";

export interface JoinHallData {
    lobbies: Lobby[]
    currentLobby: Lobby|null
}

export interface StartGameData {
    gameId: string;
}

export interface GetLobbyListData {
    lobbies: Lobby[]
}