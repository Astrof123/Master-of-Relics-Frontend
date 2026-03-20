export const MODALTYPE  = {
    DRAFT: 'draft',
    SHOW: 'show',
    BATTLE: 'battle'
};

export type ModalType  = typeof MODALTYPE [keyof typeof MODALTYPE];


