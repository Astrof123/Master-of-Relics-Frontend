import { useAppDispatch, useAppSelector } from '@/app/store';
import type { ModalReplaceCardDetails } from '../../types/details';
import styles from "./ReplaceCardModalContent.module.css"
import { GameHelper } from '@/features/game/helpers/game-helper';
import { useCallback, useMemo } from 'react';
import type { CardData } from '@/features/collection/types/responses';
import { ARTIFACTS } from '@/features/game/constants/artifacts';
import clsx from 'clsx';
import Plus from "@assets/icons/plus.png"
import { updateTemporaryDeckCards } from '@/features/collection/store/deckSlice';

interface ReplaceCardProps {
    onClose: () => void;
    details: ModalReplaceCardDetails;
}

const ReplaceCardModalContent = (props: ReplaceCardProps) => {
    const dispatch = useAppDispatch();
    const temporaryDeckData = useAppSelector(state => state.deck.temporaryDeckData);
    const collectionCards = useAppSelector(state => state.collection.collection?.cards);
    
    // Фильтруем карты: только открытые, не равные заменяемой, и которых нет в колоде
    const availableCards = useMemo(() => {
        if (!collectionCards) return [];
        
        // Находим текущую колоду
        const currentDeck = temporaryDeckData?.decks.find(deck => deck.id === props.details.deckId);
        if (!currentDeck) return [];
        
        // ID карт, которые уже есть в колоде (исключаем заменяемую карту)
        const deckCardIds = currentDeck.cards
            .filter(card => card.id !== props.details.replacedCardId)
            .map(card => card.id);
        
        // Фильтруем коллекцию
        return collectionCards.filter(card => 
            card.hasCard === true && 
            card.id !== props.details.replacedCardId &&
            !deckCardIds.includes(card.id)
        );
    }, [collectionCards, temporaryDeckData, props.details.deckId, props.details.replacedCardId]);

    const handleCardClick = useCallback((newCard: CardData) => {
        const { deckId, replacedCardId } = props.details;
        
        if (!temporaryDeckData) return;
        
        // Находим колоду во временных данных
        const deckToUpdate = temporaryDeckData.decks.find(deck => deck.id === deckId);
        if (!deckToUpdate) return;
        
        // Находим индекс заменяемой карты (позиция = индекс в массиве)
        const cardIndex = deckToUpdate.cards.findIndex(card => card.id === replacedCardId);
        if (cardIndex === -1) return;
        
        // Сохраняем позицию заменяемой карты
        const oldPosition = deckToUpdate.cards[cardIndex].position || (cardIndex + 1);
        
        // Создаем новую карту с сохранением позиции
        const cardWithPosition = {
            ...newCard,
            position: oldPosition
        };
        
        // Обновляем карту в колоде
        const updatedCards = [...deckToUpdate.cards];
        updatedCards[cardIndex] = cardWithPosition;
        
        // Обновляем временные данные
        dispatch(updateTemporaryDeckCards({
            deckId: deckId,
            cards: updatedCards
        }));
        
        props.onClose();
    }, [dispatch, props.details, temporaryDeckData, props.onClose]);

    // Фильтруем также карты, которые отображаются (не показываем дубликаты)
    const displayCards = useMemo(() => {
        return availableCards.filter(card => card.hasCard === true);
    }, [availableCards]);

    if (!displayCards || displayCards.length === 0) {
        return (
            <div className={styles["empty-cards"]}>
                <p>Нет доступных карт для замены</p>
                <p className={styles["empty-hint"]}>Все карты уже есть в колоде или коллекция пуста</p>
                <button className={styles["empty-close-btn"]} onClick={props.onClose}>
                    Закрыть
                </button>
            </div>
        );
    }

    return (
        <div className={styles["replace-modal"]}>
            <div className={styles["modal-header"]}>
                <h3>Выберите заменяющую карту</h3>
            </div>
            <div className={styles["cards-grid"]}>
                {displayCards.map((card) => {
                    const [valueLeftTopStyles, valueRightTopStyles] = GameHelper.getStylesForCornerValues(
                        styles, 
                        card.maxHp, 
                        card.skillCost, 
                        true
                    );

                    return (
                        <div
                            onClick={() => handleCardClick(card)}
                            key={"replace" + card.id}
                            className={styles["card"]}
                        >
                            <div>
                                <img 
                                    src={ARTIFACTS[card.innerCardId]?.imgBattle} 
                                    alt={ARTIFACTS[card.innerCardId]?.name}
                                    className={styles["image"]}
                                />
                                <span className={clsx(valueLeftTopStyles)}>
                                    {card.maxHp}
                                </span>
                                <span className={clsx(valueRightTopStyles)}>
                                    {card.skillCost}
                                </span>
                            </div>
                            <div className={styles["replace-overlay"]}>
                                <img className={styles["replace-icon"]} src={Plus} alt="" />
                                <span className={styles["replace-text"]}>Заменить</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReplaceCardModalContent;