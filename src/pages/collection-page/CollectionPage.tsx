import { useCollection } from "@/features/collection/hooks/useCollection";
import { ARTIFACTS } from "@/features/game/constants/artifacts";
import { useCallback, useEffect, useState } from "react";
import styles from "./CollectionPage.module.css"
import clsx from "clsx";
import Coin from '@assets/icons/coin.png';
import type { CardForView } from "@/features/game/types/card";
import { CARD_MODAL_TYPE, type OpenCardModalData } from "@/features/modal/types/modal";
import { useCardModal } from "@/features/modal/hooks/useCardModal";
import type { ModalCollectionDetails } from "@/features/modal/types/details";
import type { CardData } from "@/features/collection/types/responses";
import { GameHelper } from "@/features/game/helpers/game-helper";
import { ARTIFACT_TYPE, type ArtifactType } from "@/features/game/types/game/artifact";
import TwoSwords from "@assets/icons/two-swords.png";
import Shield from "@assets/icons/shield.png";
import Bow from "@assets/icons/bow.png";
import Rage from "@assets/icons/rage.svg";
import Mage from "@assets/icons/mage.png";
import GreenHeart from "@assets/icons/green-love.png";
import Wings from "@assets/icons/wings.png";
import DeckPanel from "@/features/collection/components/deck-panel/DeckPanel";
import { toast } from "sonner";

const ARTIFACT_TYPE_NAMING: Record<ArtifactType, { name: string; icon: string; order: number }> = {
    [ARTIFACT_TYPE.DEFENDER]: { name: "Защита", icon: Shield, order: 1 },
    [ARTIFACT_TYPE.RANGE_DAMAGE]: { name: "Дальний бой", icon: Bow, order: 2 },
    [ARTIFACT_TYPE.MELEE_DAMAGE]: { name: "Ближний бой", icon: TwoSwords, order: 3 },
    [ARTIFACT_TYPE.RAGE_MAGE]: { name: "Маг ярости", icon: Rage, order: 4 },
    [ARTIFACT_TYPE.MAGE]: { name: "Маг", icon: Mage, order: 5 },
    [ARTIFACT_TYPE.SUPPORT]: { name: "Поддержка", icon: GreenHeart, order: 6 },
    [ARTIFACT_TYPE.GENERAL]: { name: "Общее", icon: Wings, order: 7 },
};

function CollectionPage() {
    const { collection, handleGetOwnCollection } = useCollection();
    const [filter, setFilter] = useState<"all" | "owned" | "locked">("all");
    const { openCardModal } = useCardModal();

    useEffect(() => {
        handleGetOwnCollection().catch(() => {
            toast.error('Не удалось загрузить коллекцию');
        });
    }, []);

    const filteredCards = () => {
        if (!collection?.cards) return [];
        switch(filter) {
            case "owned": return collection.cards.filter(card => card.hasCard);
            case "locked": return collection.cards.filter(card => !card.hasCard);
            default: return collection.cards;
        }
    };

    const groupCardsByType = (cards: CardData[]) => {
        const groups: Record<ArtifactType, { owned: CardData[]; locked: CardData[] }> = {} as Record<ArtifactType, { owned: CardData[]; locked: CardData[] }>;
        
        Object.values(ARTIFACT_TYPE).forEach(type => {
            groups[type as ArtifactType] = { owned: [], locked: [] };
        });
        
        cards.forEach(card => {
            const targetGroup = groups[card.type] || groups[ARTIFACT_TYPE.GENERAL];
            if (card.hasCard) {
                targetGroup.owned.push(card);
            } else {
                targetGroup.locked.push(card);
            }
        });
        
        return groups;
    };

    const handleCardClick = useCallback((card: CardData) => {
        const cardView: CardForView = {
            id: card.innerCardId,
            img: ARTIFACTS[card.innerCardId].imgCardNoStats
        }

        const details: ModalCollectionDetails = {
            card,
            cardForView: cardView
        }

        const data: OpenCardModalData = {
            details: details,
            modalType: CARD_MODAL_TYPE.COLLECTION,
            valueLeftTop: card.maxHp,
            valueRightTop: card.skillCost,
            isArtifact: true
        }

        openCardModal(data);
    }, [openCardModal]);

    const filteredGroupedCards = groupCardsByType(filteredCards());
    
    const sortedGroups = Object.entries(filteredGroupedCards)
        .sort((a, b) => {
            const orderA = ARTIFACT_TYPE_NAMING[a[0] as ArtifactType]?.order || 999;
            const orderB = ARTIFACT_TYPE_NAMING[b[0] as ArtifactType]?.order || 999;
            return orderA - orderB;
        })
        .filter(([, cards]) => cards.owned.length + cards.locked.length > 0)
        .map(([type, cards]) => ({
            type,
            cards: [...cards.owned, ...cards.locked],
            ownedCount: cards.owned.length,
            lockedCount: cards.locked.length
        }));

    return ( 
        <div className={styles["collection"]}>
            <DeckPanel />
            <h1 className={styles["title"]}>Ваша коллекция</h1>
            
            <div className={styles["filters"]}>
                <button 
                    className={clsx(styles["filter"], filter === "all" && styles["active"])}
                    onClick={() => setFilter("all")}
                >Все ({collection?.cards.length || 0})</button>
                <button 
                    className={clsx(styles["filter"], filter === "owned" && styles["active"])}
                    onClick={() => setFilter("owned")}
                >В коллекции ({collection?.cards.filter(c => c.hasCard).length || 0})</button>
                <button 
                    className={clsx(styles["filter"], filter === "locked" && styles["active"])}
                    onClick={() => setFilter("locked")}
                >Не открыты ({collection?.cards.filter(c => !c.hasCard).length || 0})</button>
            </div>

            {sortedGroups.map(({ type, cards }) => (
                <div key={type} className={styles["type-section"]}>
                    <div className={styles["type-header"]}>
                        <img className={styles["type-icon"]} src={ARTIFACT_TYPE_NAMING[type as ArtifactType]?.icon} alt="" />
                        <h2 className={styles["type-title"]}>{ARTIFACT_TYPE_NAMING[type as ArtifactType]?.name}</h2>
                        <span className={styles["type-count"]}>
                            <span className={styles["total-count"]}>всего {cards.length}</span>
                        </span>
                    </div>
                    <div className={styles["grid"]}>
                        {cards.map((card) => {
                            const [valueLeftTopStyles, valueRightTopStyles] = GameHelper.getStylesForCornerValues(styles, card.maxHp, card.skillCost, true);

                            return (
                                <div 
                                    onClick={() => handleCardClick(card)}
                                    key={card.id}
                                    className={clsx(styles["card"], !card.hasCard && styles["card--locked-wrapper"])}
                                >
                                    <div className={clsx(!card.hasCard && styles["card--locked"])}>
                                        <img 
                                            src={ARTIFACTS[card.innerCardId]?.imgCardNoStats} 
                                            alt={ARTIFACTS[card.innerCardId]?.name}
                                            className={styles["image"]}
                                        />
                                        <span 
                                            className={clsx(valueLeftTopStyles)}>
                                                {card.maxHp}
                                        </span>
                                        <span 
                                            className={clsx(valueRightTopStyles)}>
                                                {card.skillCost}
                                        </span>
                                    </div>

                                    {!card.hasCard && (
                                        <div className={styles["overlay"]}>
                                            <div className={styles["price-wrapper"]}>
                                                <img className={styles["price-icon"]} src={Coin} alt="coin" />
                                                <span className={styles["price"]}>{card.price}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CollectionPage;