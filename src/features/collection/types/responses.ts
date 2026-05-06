import type { ArtifactType } from "@/features/game/types/game/artifact";

export interface CardData {
    id: number;
    innerCardId: string;
    price: number;
    isForSale: boolean;
    hasCard: boolean;
    maxHp: number;
    skillCost: number | null;
    type: ArtifactType;
    position?: number;
}

export interface CollectionData {
    cards: CardData[];
}

export interface DecksData {
    decks: DeckData[];
}

export interface DeckData {
    id: number;
    cards: CardData[];
    indexNumber: number;
    isActive: boolean;
}