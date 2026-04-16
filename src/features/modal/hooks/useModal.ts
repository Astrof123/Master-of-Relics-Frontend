import { useAppDispatch, useAppSelector } from '@/app/store';
import { openModal, closeModal } from '../store/modalSlice';
import type { OpenModalData } from '../types/modal';

export const useModal = () => {
    const dispatch = useAppDispatch();
    const { 
        card, 
        isOpen, 
        modalType, 
        details, 
        valueLeftTop, 
        valueRightTop,
        isArtifact
    } = useAppSelector(state => state.modal);


    return {
        selectedCard: card,
        modalType,
        isOpen,
        details,
        valueLeftTop,
        valueRightTop,
        isArtifact,
        openModal: (data: OpenModalData) => {
            dispatch(openModal(data));
        },
        closeModal: () => dispatch(closeModal()),
    };
};