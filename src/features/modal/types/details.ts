import type { GameForClient } from "@/features/game/types/state/game-for-client";

export interface ModalDraftDetails {
    isYourDeck: boolean;
    gameId: string;
}

export interface ModalBattleDetails {
    gameState: GameForClient;
    artifactGameId: string;
    isYour: boolean;
}