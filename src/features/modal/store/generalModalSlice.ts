import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GeneralModalType, OpenGeneralModalData } from '../types/modal';
import type { GeneralModalsDetails } from '../types/details';

interface GeneralModalState {
    isOpen: boolean;
    modalType: GeneralModalType | null;
    details: GeneralModalsDetails;
}

const initialState: GeneralModalState = {
    isOpen: false,
    modalType: null,
    details: null
};

const generalModalSlice = createSlice({
    name: 'generalModal',
    initialState,
    reducers: {
        openGeneralModal: (state, action: PayloadAction<OpenGeneralModalData>) => {
            state.isOpen = true;
            state.modalType = action.payload.modalType;
            state.details = action.payload.details;
        },
        closeGeneralModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
            state.details = null;
        },
    },
});

export const { openGeneralModal, closeGeneralModal } = generalModalSlice.actions;
export default generalModalSlice.reducer;