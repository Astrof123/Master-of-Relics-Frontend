import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardForView } from '@/features/game/types/card';
import type { ModalType, OpenModalData } from '../types/modal';
import type { ModalsDetails } from '../types/details';

interface ModalState {
    isOpen: boolean;
    card: CardForView | null;
    modalType: ModalType | null;
    details: ModalsDetails;
    valueLeftTop: number | null;
    valueRightTop: number | null;
    isArtifact: boolean | null;
}

const initialState: ModalState = {
    isOpen: false,
    card: null,
    modalType: null,
    details: null,
    valueLeftTop: null,
    valueRightTop: null,
    isArtifact: null
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<OpenModalData>) => {
            state.isOpen = true;
            state.card = action.payload.details ? action.payload.details["cardForView"] ?? null : null;
            state.modalType = action.payload.modalType;
            state.details = action.payload.details
            state.valueLeftTop = action.payload.valueLeftTop;
            state.valueRightTop = action.payload.valueRightTop;
            state.isArtifact = action.payload.isArtifact;
        },
        closeModal: (state) => {
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

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;