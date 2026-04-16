import { useCallback } from 'react';
import { useDraftSocket } from '@/features/game/hooks/useDraftSocket';
import type { CardForView } from '@/features/game/types/card';
import styles from './DraftModalActions.module.css';
import type { ModalDraftDetails } from '../../types/details';

interface DraftModalActionsProps {
    card: CardForView;
    details?: ModalDraftDetails;
    onClose: () => void;
}

const DraftModalActions = ({ card, details, onClose }: DraftModalActionsProps) => {
    const { pickArtifact } = useDraftSocket();

    const handlePick = useCallback(() => {
        if (details?.isYourDeck && details?.gameId) {
            pickArtifact(details.gameId, card.id);
            onClose();
        }
    }, [details?.isYourDeck, details?.gameId, pickArtifact, card.id, onClose]);

    if (!details?.isYourDeck) {
        return (
            <div className={styles["view-only-message"]}>
                <p>Просмотр колоды соперника</p>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>
                    Нельзя выбрать артефакт
                </p>
            </div>
        );
    }

    return (
        <div className={styles["draft-actions"]}>
            <h2>Действия</h2>
            <button 
                className={styles["pick-button"]}
                onClick={handlePick}
                type="button"
            >
                Выбрать
            </button>
        </div>
    );
};

export default DraftModalActions;