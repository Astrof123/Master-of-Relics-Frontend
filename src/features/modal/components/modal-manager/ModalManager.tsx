import CardModal from '@/features/modal/components/card-modal/CardModal';
import { useModal } from '../../hooks/useModal';
import { useMemo } from 'react';
import { MODALTYPE } from '../../types/modal';
import DraftModalActions from '../draft-modal-actions/DraftModalActions';
import BattleCardModal from '../battle-card-modal/BattleCardModal';
import BattleModalActions from '../battle-modal-actions/BattleModalActions';
import type { ModalBattleDetails, ModalCollectionDetails, ModalDraftDetails, ModalSpellDetails } from '../../types/details';
import CollectionModalActions from '../collection-modal-actions/CollectionModalActions';
import SpellBookModal from '../spell-book-modal/SpellBookModal';
import SpellModalActions from '../spell-modal-actions/SpellModalActions';
import { MINIPHASE } from '@/features/game/types/state/phase';
import { useAppSelector } from '@/app/store';


const ModalManager = () => {
    const { 
        selectedCard, 
        modalType, 
        isOpen, 
        closeModal, 
        details, 
        valueLeftTop, 
        valueRightTop,
        isArtifact
    } = useModal();

    const isMoving = useAppSelector(state => state.game.isMoving);

    const actions = useMemo(() => {
        switch (modalType) {
            case MODALTYPE.DRAFT:
                const detailsDraft = details as ModalDraftDetails;
                if (!selectedCard) {
                    return null;
                } 

                return (
                    <DraftModalActions 
                        card={selectedCard}
                        details={detailsDraft}
                        onClose={closeModal}
                    />
                );
            case MODALTYPE.SPELL:
                const detailsSpell = details as ModalSpellDetails;

                if (!selectedCard) {
                    return null;
                } 

                if (detailsSpell.gameState.miniPhase === MINIPHASE.MOVEMENT || isMoving) {
                    return null;
                }

                return (
                    <SpellModalActions 
                        details={detailsSpell}
                        onClose={closeModal}
                    />
                );
            case MODALTYPE.COLLECTION:
                if (!selectedCard) {
                    return null;
                } 

                const detailsCollection = details as ModalCollectionDetails;

                return (
                    <CollectionModalActions 
                        card={selectedCard}
                        details={detailsCollection}
                        onClose={closeModal}
                    />
                );       
            case MODALTYPE.BATTLE:
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
        modalType === MODALTYPE.SPELL_BOOK ? (
            <SpellBookModal
                isOpen={isOpen}
                onClose={closeModal}
            />       
        ) : modalType === MODALTYPE.BATTLE ? (
            battleCardModalRender()
        ) : (
            <CardModal
                valueLeftTop={valueLeftTop}
                valueRightTop={valueRightTop}
                card={selectedCard}
                isOpen={isOpen}
                onClose={closeModal}
                actions={actions}
                isArtifact={isArtifact ?? true}
            />
        )
    );
};

export default ModalManager;