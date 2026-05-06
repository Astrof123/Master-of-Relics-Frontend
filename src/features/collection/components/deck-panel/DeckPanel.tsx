import { useCallback, useEffect, useState } from "react";
import styles from "./DeckPanel.module.css";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getDecks, changeActiveDeck, changeDeckCards } from "../../store/actions";
import { ARTIFACTS } from "@/features/game/constants/artifacts";
import clsx from "clsx";
import type { CardData } from "../../types/responses";
import { GameHelper } from "@/features/game/helpers/game-helper";
import { changeActiveDeckAfterResponse, setIsEditing, resetTemporaryDeck } from "../../store/deckSlice";
import type { CardForView } from "@/features/game/types/card";
import { CARD_MODAL_TYPE, GENERAL_MODAL_TYPE, type OpenCardModalData, type OpenGeneralModalData } from "@/features/modal/types/modal";
import type { ModalReplaceCardDetails, ModalShowDetails } from "@/features/modal/types/details";
import { useCardModal } from "@/features/modal/hooks/useCardModal";
import { useGeneralModal } from "@/features/modal/hooks/useGeneralModal";
import ReplaceImg from "@assets/icons/replace.png";

function DeckPanel() {
    const dispatch = useAppDispatch();
    const decks = useAppSelector(state => state.deck.deckData);
    const temporaryDeckData = useAppSelector(state => state.deck.temporaryDeckData);
    const isEditing = useAppSelector(state => state.deck.isEditing);
    const isLoading = useAppSelector(state => state.deck.isLoading);
    const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);
    const { openCardModal } = useCardModal();
    const { openGeneralModal } = useGeneralModal();

    // Определяем displayData до всех useEffect
    const displayData = isEditing && temporaryDeckData ? temporaryDeckData : decks;

    useEffect(() => {
        dispatch(getDecks());
    }, [dispatch]);

    // Автоматический выбор активной колоды при загрузке данных
    useEffect(() => {
        if (!displayData) return;
        
        const activeDeck = displayData.decks.find(deck => deck.isActive === true);
        if (activeDeck) {
            setSelectedDeckId(activeDeck.id);
        } else if (displayData.decks.length > 0 && selectedDeckId === null) {
            setSelectedDeckId(displayData.decks[0].id);
        }
    }, [displayData]);

    const handleChangeActiveDeck = async (deckId: number) => {
        try {
            await dispatch(changeActiveDeck({ deckId })).unwrap();
            dispatch(changeActiveDeckAfterResponse(deckId));
            setSelectedDeckId(deckId);
        } catch {
            // ошибка
        }
    };

    const handleStartEditing = () => {
        dispatch(setIsEditing(true));
    };

    const handleEndEditing = async () => {
        if (!temporaryDeckData) return;
        
        const activeDeck = temporaryDeckData.decks.find(deck => deck.isActive);
        if (!activeDeck) return;
        
        // Сортируем карты по позиции перед отправкой
        const sortedCards = [...activeDeck.cards].sort((a, b) => (a.position || 0) - (b.position || 0));
        
        const cardsForRequest = sortedCards.map((card, index) => ({
            cardId: card.id,
            position: index + 1
        }));
        
        try {
            await dispatch(changeDeckCards({ deckId: activeDeck.id, cards: cardsForRequest })).unwrap();
            await dispatch(getDecks());
            dispatch(setIsEditing(false));
        } catch (error) {
            console.error('Ошибка при сохранении колоды:', error);
        }
    };

    const handleCancelEditing = () => {
        dispatch(resetTemporaryDeck());
    };

    const handleCardClick = useCallback((card: CardData, deckId: number) => {
        if (!isEditing) {
            const cardView: CardForView = {
                id: card.innerCardId,
                img: ARTIFACTS[card.innerCardId].imgCardNoStats
            };
            const details: ModalShowDetails = { cardForView: cardView };
            const data: OpenCardModalData = {
                details: details,
                modalType: CARD_MODAL_TYPE.SHOW,
                valueLeftTop: card.maxHp,
                valueRightTop: card.skillCost,
                isArtifact: true
            };
            openCardModal(data);
        } else {
            const detailsReplaceCard: ModalReplaceCardDetails = {
                replacedCardId: card.id,
                deckId: deckId
            }

            const data: OpenGeneralModalData = {
                details: detailsReplaceCard,
                modalType: GENERAL_MODAL_TYPE.REPLACE_DECK_CARD
            }

            openGeneralModal(data);
        }
    }, [isEditing, openCardModal, openGeneralModal]);

    // Функция для сортировки карт по позиции
    const sortCardsByPosition = (cards: CardData[]) => {
        return [...cards].sort((a, b) => (a.position || 0) - (b.position || 0));
    };

    if (isLoading) {
        return (
            <div className={styles["loading"]}>
                <div className={styles["loading-spinner"]}></div>
                <span>Загрузка колод...</span>
            </div>
        );
    }

    if (!displayData || displayData.decks.length === 0) {
        return (
            <div className={styles["empty"]}>
                <p>Нет доступных колод</p>
            </div>
        );
    }

    const sortedDecks = [...displayData.decks].sort((a, b) => a.indexNumber - b.indexNumber);
    const selectedDeck = sortedDecks.find(deck => deck.id === selectedDeckId);
    
    // Сортируем карты выбранной колоды по позиции
    const sortedCards = selectedDeck ? sortCardsByPosition(selectedDeck.cards) : [];

    return (
        <div className={styles["deck-container"]}>
            <h1 className={styles["title"]}>Мои колоды</h1>
            
            <div className={styles["deck-tabs"]}>
                {sortedDecks.map((deck) => (
                    <button
                        key={deck.id}
                        className={clsx(
                            styles["deck-tab"],
                            selectedDeckId === deck.id && styles["deck-tab--selected"]
                        )}
                        onClick={() => setSelectedDeckId(deck.id)}
                    >
                        <span className={styles["deck-tab-name"]}>Колода {deck.indexNumber}</span>
                        {deck.isActive && (
                            <span className={styles["active-badge"]}>Активна</span>
                        )}
                    </button>
                ))}
            </div>

            {selectedDeck && (
                <div className={styles["deck-content"]}>
                    <div className={styles["deck-header"]}>
                        <div className={styles["deck-info"]}>
                            <h2 className={styles["deck-name"]}>Колода {selectedDeck.indexNumber}</h2>
                            {/* {selectedDeck.isActive && (
                                <span className={styles["active-deck-badge"]}>Активная колода</span>
                            )} */}
                        </div>
                        <div className={styles["deck-actions"]}>
                            {!selectedDeck.isActive && (
                                <button
                                    className={styles["activate-btn"]}
                                    onClick={() => handleChangeActiveDeck(selectedDeck.id)}
                                >
                                    Сделать активной
                                </button>
                            )}
                            {selectedDeck.isActive && (
                                isEditing ? (
                                    <>
                                        <button
                                            className={styles["cancel-btn"]}
                                            onClick={handleCancelEditing}
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            className={styles["confirm-btn"]}
                                            onClick={handleEndEditing}
                                        >
                                            Подтвердить
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className={styles["edit-btn"]}
                                        onClick={handleStartEditing}
                                    >
                                        Редактировать
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className={styles["cards-grid"]}>
                        {sortedCards.map((card) => {
                            const [valueLeftTopStyles, valueRightTopStyles] = GameHelper.getStylesForCornerValues(
                                styles, 
                                card.maxHp, 
                                card.skillCost, 
                                true
                            );

                            return (
                                <div
                                    onClick={() => handleCardClick(card, selectedDeck.id)}
                                    key={`${selectedDeck.id}-${card.id}`}
                                    className={clsx(styles["card"], isEditing && styles["card--editable"])}
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
                                    {isEditing && (
                                        <div className={styles["edit-overlay"]}>
                                            <img className={styles["edit-icon"]} src={ReplaceImg} alt="" />
                                            <span className={styles["edit-text"]}>Заменить</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeckPanel;