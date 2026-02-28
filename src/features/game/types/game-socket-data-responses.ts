import type { ConnectionGame } from "./game";
import type { GameForClient } from "./game-for-client";

export interface JoinGameData {
    gameState: GameForClient;
    playersOnline: Record<string, ConnectionGame>;
}

export interface GetGameStateData {
    gameState: GameForClient;
}