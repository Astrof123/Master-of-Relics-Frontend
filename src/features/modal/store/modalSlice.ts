import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardForView } from '@/features/game/types/card';
import type { ModalType } from '../types/modal';
import type { ModalBattleDetails, ModalDraftDetails } from '../types/details';

interface ModalState {
    isOpen: boolean;
    card: CardForView | null;
    modalType: ModalType | null;
    details: ModalDraftDetails | ModalBattleDetails | null;
}

const initialState: ModalState = {
    isOpen: false,
    card: null,
    modalType: null,
    details: null
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCardModal: (state, action: PayloadAction<{card: CardForView, modalType: ModalType, details: ModalDraftDetails | ModalBattleDetails | null}>) => {
            state.isOpen = true;
            state.card = action.payload.card;
            state.modalType = action.payload.modalType;
            state.details = action.payload.details
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.card = null;
            state.modalType = null;
            state.details = null;
        },
    },
});

export const { openCardModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;