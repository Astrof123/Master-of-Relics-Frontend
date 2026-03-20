import { useAppDispatch, useAppSelector } from '@/app/store';
import { openCardModal, closeModal } from '../store/modalSlice';
import type { CardForView } from '@/features/game/types/card';
import type { ModalType } from '../types/modal';
import type { ModalBattleDetails, ModalDraftDetails } from '../types/details';

export const useModal = () => {
    const dispatch = useAppDispatch();
    const { isOpen, card, modalType, details } = useAppSelector(state => state.modal);


    return {
        selectedCard: card,
        modalType,
        isOpen,
        details,
        openCardModal: (card: CardForView, modalType: ModalType, details: ModalDraftDetails | ModalBattleDetails | null) => {
            dispatch(openCardModal({ card, modalType, details }));
        },
        closeModal: () => dispatch(closeModal()),
    };
};