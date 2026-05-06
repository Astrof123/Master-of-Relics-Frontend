import { useAppDispatch, useAppSelector } from '@/app/store';
import { openCardModal, closeCardModal } from '../store/cardModalSlice';
import type { OpenCardModalData } from '../types/modal';

export const useCardModal = () => {
    const dispatch = useAppDispatch();
    const { 
        card, 
        isOpen, 
        modalType, 
        details, 
        valueLeftTop, 
        valueRightTop,
        isArtifact
    } = useAppSelector(state => state.cardModal);


    return {
        selectedCard: card,
        modalType,
        isOpen,
        details,
        valueLeftTop,
        valueRightTop,
        isArtifact,
        openCardModal: (data: OpenCardModalData) => {
            dispatch(openCardModal(data));
        },
        closeCardModal: () => dispatch(closeCardModal()),
    };
};