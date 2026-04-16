import type { ModalsDetails } from "./details";

export const MODALTYPE  = {
    DRAFT: 'draft',
    SHOW: 'show',
    BATTLE: 'battle',
    COLLECTION: 'collection',
    SPELL_BOOK: 'spell_book',
    SPELL: 'spell',
};

export type ModalType  = typeof MODALTYPE [keyof typeof MODALTYPE];


export interface OpenModalData {
    valueLeftTop: number | null;
    valueRightTop: number | null;
    modalType: ModalType;
    details: ModalsDetails;
    isArtifact: boolean;
}