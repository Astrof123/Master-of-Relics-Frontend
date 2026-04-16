
export interface CardData {
    id: number;
    innerCardId: string;
    price: number;
    isForSale: boolean;
    hasCard: boolean;
    maxHp: number;
    skillCost: number | null;
}

export interface CollectionData {
    cards: CardData[];
}