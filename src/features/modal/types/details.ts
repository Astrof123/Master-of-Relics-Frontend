import type { CardData } from "@/features/collection/types/responses";
import type { CardForView } from "@/features/game/types/card";
import type { SpellGameState } from "@/features/game/types/state/game";
import type { GameForClient } from "@/features/game/types/state/game-for-client";

export interface ModalDraftDetails {
    isYourDeck: boolean;
    gameId: string;
    cardForView: CardForView;
}

export interface ModalCollectionDetails {
    card: CardData;
    cardForView: CardForView
}

export interface ModalShowDetails {
    cardForView: CardForView
}

export interface ModalBattleDetails {
    cardForView: CardForView
    gameState: GameForClient;
    artifactGameId: string;
    isYour: boolean;
}

export interface ModalSpellDetails {
    cardForView: CardForView;
    spell: SpellGameState;
    gameState: GameForClient;
}

export type ModalsDetails = ModalDraftDetails | ModalBattleDetails | ModalCollectionDetails | ModalShowDetails | null;