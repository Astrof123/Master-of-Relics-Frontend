export interface ChangeActiveDeckData {
    deckId: number;
}

export interface ChangeDeckCardsData {
    deckId: number;
    cards: CardPosition[];
}

export interface CardPosition {
    cardId: number;
    position: number;
}


