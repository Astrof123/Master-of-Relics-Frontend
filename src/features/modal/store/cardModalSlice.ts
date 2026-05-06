import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardForView } from '@/features/game/types/card';
import type { CardModalType, OpenCardModalData } from '../types/modal';
import type { CardModalsDetails } from '../types/details';

interface CardModalState {
    isOpen: boolean;
    card: CardForView | null;
    modalType: CardModalType | null;
    details: CardModalsDetails;
    valueLeftTop: number | null;
    valueRightTop: number | null;
    isArtifact: boolean | null;
}

const initialState: CardModalState = {
    isOpen: false,
    card: null,
    modalType: null,
    details: null,
    valueLeftTop: null,
    valueRightTop: null,
    isArtifact: null
};

const cardModalSlice = createSlice({
    name: 'cardModal',
    initialState,
    reducers: {
        openCardModal: (state, action: PayloadAction<OpenCardModalData>) => {
            state.isOpen = true;
            state.card = action.payload.details ? action.payload.details["cardForView"] ?? null : null;
            state.modalType = action.payload.modalType;
            state.details = action.payload.details
            state.valueLeftTop = action.payload.valueLeftTop;
            state.valueRightTop = action.payload.valueRightTop;
            state.isArtifact = action.payload.isArtifact;
        },
        closeCardModal: (state) => {
            state.isOpen = false;
            state.card = null;
            state.modalType = null;
            state.details = null;
            state.valueLeftTop = null;
            state.valueRightTop = null;
            state.isArtifact = null;
        },
    },
});

export const { openCardModal, closeCardModal } = cardModalSlice.actions;
export default cardModalSlice.reducer;