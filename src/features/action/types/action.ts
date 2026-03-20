export interface ExtraActionState {
    id: ExtraAction;
    description: string;
}

export const EXTRA_ACTION = {
    THROW_DICE: "throw_dice",
    EXTRA_MOVE: "extra_move"
}

export type ExtraAction = typeof EXTRA_ACTION[keyof typeof EXTRA_ACTION];