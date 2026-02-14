import type { Lobby } from "./lobby";

export interface JoinHallData {
    lobbies: Lobby[]
    currentLobby: Lobby|null
}


