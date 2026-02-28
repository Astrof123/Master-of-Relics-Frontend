import { useCallback } from 'react';
import { useDraftSocket } from '@/features/game/hooks/useDraftSocket';
import type { CardForView } from '@/features/game/types/card';

interface Props {
    card: CardForView;
    details?: any;
    onClose: () => void;
}

const DraftModalActions = ({ card, details, onClose }: Props) => {
    const { pickArtifact } = useDraftSocket();

    const handlePick = useCallback(() => {
        if (details?.isYourDeck && details?.gameId) {
            pickArtifact(details.gameId, card.id);
            onClose();
        }
    }, [details?.isYourDeck, details?.gameId, pickArtifact, card.id, onClose]);

    if (!details?.isYourDeck) return null;

    return (
        <>
            <h2>Выберите действие</h2>
            <button onClick={handlePick}>
                Выбрать этот артефакт
            </button>
        </>

    );
};

export default DraftModalActions;