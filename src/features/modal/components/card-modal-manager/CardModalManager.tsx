import CardModal from '@/features/modal/components/card-modal/CardModal';
import { useMemo } from 'react';
import { CARD_MODAL_TYPE } from '../../types/modal';
import DraftModalActions from '../draft-modal-actions/DraftModalActions';
import BattleCardModal from '../battle-card-modal/BattleCardModal';
import BattleModalActions from '../battle-modal-actions/BattleModalActions';
import type { ModalBattleDetails, ModalCollectionDetails, ModalDraftDetails, ModalSpellDetails } from '../../types/details';
import CollectionModalActions from '../collection-modal-actions/CollectionModalActions';
import SpellBookModal from '../spell-book-modal/SpellBookModal';
import SpellModalActions from '../spell-modal-actions/SpellModalActions';
import { MINIPHASE } from '@/features/game/types/state/phase';
import { useCardModal } from '../../hooks/useCardModal';

const CardModalManager = () => {
    const { 
        selectedCard, 
        modalType, 
        isOpen, 
        closeCardModal, 
        details, 
        valueLeftTop, 
        valueRightTop,
        isArtifact
    } = useCardModal();

    const actions = useMemo(() => {
        switch (modalType) {
            case CARD_MODAL_TYPE.DRAFT:
                const detailsDraft = details as ModalDraftDetails;
                if (!selectedCard) {
                    return null;
                } 

                return (
                    <DraftModalActions 
                        card={selectedCard}
                        details={detailsDraft}
                        onClose={closeCardModal}
                    />
                );
            case CARD_MODAL_TYPE.SPELL:
                const detailsSpell = details as ModalSpellDetails;

                if (!selectedCard) {
                    return null;
                } 

                return (
                    <SpellModalActions 
                        details={detailsSpell}
                        onClose={closeCardModal}
                    />
                );
            case CARD_MODAL_TYPE.COLLECTION:
                if (!selectedCard) {
                    return null;
                } 

                const detailsCollection = details as ModalCollectionDetails;

                return (
                    <CollectionModalActions 
                        card={selectedCard}
                        details={detailsCollection}
                        onClose={closeCardModal}
                    />
                );         
            case CARD_MODAL_TYPE.BATTLE:
                if (!selectedCard) {
                    return null;
                } 

                const detailsBattle = details as ModalBattleDetails;

                if (!selectedCard) {
                    return null;
                } 

                if (!detailsBattle.isYour || (!(detailsBattle.gameState.currentTurn === detailsBattle.gameState.player.id) && detailsBattle.gameState.miniPhase !== MINIPHASE.MOVEMENT )) {
                    return null;
                }

                return (
                    <BattleModalActions 
                        card={selectedCard}
                        details={details as ModalBattleDetails}
                        onClose={closeCardModal}
                    />
                );

            case CARD_MODAL_TYPE.SHOW:
                return null;

            default:
                return null;
        }
    }, [modalType, selectedCard, details, closeCardModal]);

    const battleCardModalRender = () => {
        const detailsBattle = details as ModalBattleDetails;

        return (
            <BattleCardModal
                player={detailsBattle.isYour ? detailsBattle.gameState.player : detailsBattle.gameState.enemy}
                artifactGameId={detailsBattle.artifactGameId}
                gameState={detailsBattle.gameState}
                card={selectedCard}
                isOpen={isOpen}
                onClose={closeCardModal}
                actions={actions}
            />
        )
    }

    if (!isOpen) return null;

    return (
        modalType === CARD_MODAL_TYPE.SPELL_BOOK ? (
            <SpellBookModal
                isOpen={isOpen}
                onClose={closeCardModal}
            />       
        ) : modalType === CARD_MODAL_TYPE.BATTLE ? (
            battleCardModalRender()
        ) : (
            <CardModal
                valueLeftTop={valueLeftTop}
                valueRightTop={valueRightTop}
                card={selectedCard}
                isOpen={isOpen}
                onClose={closeCardModal}
                actions={actions}
                isArtifact={isArtifact ?? true}
            />
        )
    );
};

export default CardModalManager;