import { useAppDispatch, useAppSelector } from '@/app/store';
import type { OpenGeneralModalData } from '../types/modal';
import { closeGeneralModal, openGeneralModal } from '../store/generalModalSlice';

export const useGeneralModal = () => {
    const dispatch = useAppDispatch();
    const { 
        isOpen,
        modalType,
        details
    } = useAppSelector(state => state.generalModal);


    return {
        isOpen,
        modalType,
        details,
        openGeneralModal: (data: OpenGeneralModalData) => {
            dispatch(openGeneralModal(data));
        },
        closeGeneralModal: () => dispatch(closeGeneralModal()),
    };
};