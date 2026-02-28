import CardModal from '@/features/modal/components/card-modal/CardModal';
import { useModal } from '../../hooks/useModal';
import { useMemo } from 'react';
import { MODALTYPE } from '../../types/modal';
import DraftModalActions from '../draft-modal-actions/DraftModalActions';


const ModalManager = () => {
    const { selectedCard, modalType, isOpen, closeModal, details } = useModal();

    const actions = useMemo(() => {
        if (!modalType || !selectedCard) {
            return null;
        } 

        switch (modalType) {
            case MODALTYPE.DRAFT:
                return (
                    <DraftModalActions 
                        card={selectedCard}
                        details={details}
                        onClose={closeModal}
                    />
                );
            
            case MODALTYPE.SHOW:
                return null;

            default:
                return null;
        }
    }, [modalType, selectedCard, details, closeModal]);

    if (!isOpen) return null;

    return (
        <CardModal
            card={selectedCard}
            isOpen={isOpen}
            onClose={closeModal}
            actions={actions}
        />
    );
};

export default ModalManager;