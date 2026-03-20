import type { ConnectionGame } from "../state/game";
import type { GameForClient } from "../state/game-for-client";


export interface JoinGameData {
    gameState: GameForClient;
    playersOnline: Record<string, ConnectionGame>;
}

export interface GetGameStateData {
    gameState: GameForClient;
}