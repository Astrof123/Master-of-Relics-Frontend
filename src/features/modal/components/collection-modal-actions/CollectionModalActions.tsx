import { useCallback } from 'react';
import type { CardForView } from '@/features/game/types/card';
import styles from './CollectionModalActions.module.css';
import type { ModalCollectionDetails } from '../../types/details';
import { useAppSelector } from '@/app/store';
import { useCollection } from '@/features/collection/hooks/useCollection';

interface CollectionModalActions {
    card: CardForView;
    details: ModalCollectionDetails;
    onClose: () => void;
}

const CollectionModalActions = ({ details, onClose }: CollectionModalActions) => {
    const { handleBuyArtifact } = useCollection();
    const user = useAppSelector((state) => state.auth.user);

    const canBuy = user && user.gold >= details.card.price;

    const handlePick = useCallback(() => {
        if (canBuy) {
            handleBuyArtifact(details.card.id);
            onClose();
        }
    }, [canBuy, handleBuyArtifact, details.card.id, onClose]);

    return (
        <div className={styles["collection-actions"]}>
            <h2>Действия</h2>
            {!details.card.hasCard && details.card.isForSale && (
                <>
                    <button 
                        disabled={!canBuy}
                        className={styles["pick-button"]}
                        onClick={handlePick}
                        type="button"
                    >
                        Купить за {details.card.price} золота
                    </button>
                    {!canBuy && user && (
                        <div className={styles["insufficient-funds"]}>
                            Недостаточно золота для покупки
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CollectionModalActions;