import CardModal from '@/features/modal/components/card-modal/CardModal';
import { useModal } from '../../hooks/useModal';
import { useMemo } from 'react';
import { MODALTYPE } from '../../types/modal';
import DraftModalActions from '../draft-modal-actions/DraftModalActions';
import BattleCardModal from '../battle-card-modal/BattleCardModal';
import BattleModalActions from '../battle-modal-actions/BattleModalActions';
import type { ModalBattleDetails } from '../../types/details';


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
            
            case MODALTYPE.BATTLE:
                const detailsBattle = details as ModalBattleDetails;

                if (!detailsBattle.isYour || !(detailsBattle.gameState.currentTurn === detailsBattle.gameState.player.id)) {
                    return null;
                }

                return (
                    <BattleModalActions 
                        card={selectedCard}
                        details={details as ModalBattleDetails}
                        onClose={closeModal}
                    />
                );

            case MODALTYPE.SHOW:
                return null;

            default:
                return null;
        }
    }, [modalType, selectedCard, details, closeModal]);

    const battleCardModalRender = () => {
        const detailsBattle = details as ModalBattleDetails;

        return (
            <BattleCardModal
                player={detailsBattle.isYour ? detailsBattle.gameState.player : detailsBattle.gameState.enemy}
                artifactGameId={detailsBattle.artifactGameId}
                gameState={detailsBattle.gameState}
                card={selectedCard}
                isOpen={isOpen}
                onClose={closeModal}
                actions={actions}
            />
        )
    }

    if (!isOpen) return null;


    return (
        modalType === MODALTYPE.BATTLE ? (
            battleCardModalRender()
        ) : (
            <CardModal
                card={selectedCard}
                isOpen={isOpen}
                onClose={closeModal}
                actions={actions}
            />
        )
    );
};

export default ModalManager;