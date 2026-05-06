import type { CardModalsDetails, GeneralModalsDetails } from "./details";

export const CARD_MODAL_TYPE  = {
    DRAFT: 'draft',
    SHOW: 'show',
    BATTLE: 'battle',
    COLLECTION: 'collection',
    EDITING_DECK: 'editing_deck',
    SPELL_BOOK: 'spell_book',
    SPELL: 'spell',
};

export type CardModalType  = typeof CARD_MODAL_TYPE [keyof typeof CARD_MODAL_TYPE];

export const GENERAL_MODAL_TYPE  = {
    REPORT: 'report',
    BAN: "ban",
    REPLACE_DECK_CARD: "replace_deck_card"
};

export type GeneralModalType  = typeof GENERAL_MODAL_TYPE [keyof typeof GENERAL_MODAL_TYPE];

export interface OpenCardModalData {
    valueLeftTop: number | null;
    valueRightTop: number | null;
    modalType: CardModalType;
    details: CardModalsDetails;
    isArtifact: boolean;
}

export interface OpenGeneralModalData {
    modalType: GeneralModalType;
    details: GeneralModalsDetails;
}
