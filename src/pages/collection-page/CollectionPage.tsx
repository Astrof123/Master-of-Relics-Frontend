import { useCollection } from "@/features/collection/hooks/useCollection";
import { ARTIFACTS } from "@/features/game/constants/artifacts";
import ContentLayout from "@/widgets/content-layout/ContentLayout";
import { useCallback, useEffect, useState } from "react";
import styles from "./CollectionPage.module.css"
import clsx from "clsx";
import Coin from '@assets/icons/coin.png';
import type { CardForView } from "@/features/game/types/card";
import { MODALTYPE, type OpenModalData } from "@/features/modal/types/modal";
import { useModal } from "@/features/modal/hooks/useModal";
import type { ModalCollectionDetails } from "@/features/modal/types/details";
import type { CardData } from "@/features/collection/types/responses";
import { GameHelper } from "@/features/game/helpers/game-helper";

function CollectionPage() {
    const { collection, handleGetOwnCollection } = useCollection();
    const [filter, setFilter] = useState<"all" | "owned" | "locked">("all");
    const { openModal } = useModal();

    useEffect(() => {
        handleGetOwnCollection();
    }, []);

    const filteredCards = () => {
        if (!collection?.cards) return [];
        switch(filter) {
            case "owned": return collection.cards.filter(card => card.hasCard);
            case "locked": return collection.cards.filter(card => !card.hasCard);
            default: return collection.cards;
        }
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

        const data: OpenModalData = {
            details: details,
            modalType: MODALTYPE.COLLECTION,
            valueLeftTop: card.maxHp,
            valueRightTop: card.skillCost,
            isArtifact: true
        }

        openModal(data);
    }, [openModal]);

    return ( 
        <ContentLayout>
            <div className={styles["collection"]}>
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

                <div className={styles["grid"]}>
                    {filteredCards().map((card) => {
                        const [valueLeftTopStyles, valueRightTopStyles] = GameHelper.getStylesForCornerValues(styles, card.maxHp, card.skillCost, true);

                        return (
                            <div 
                                onClick={() => handleCardClick(card)}
                                key={card.id}
                                className={clsx(styles["card"])}
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
        </ContentLayout>
    );
}

export default CollectionPage;