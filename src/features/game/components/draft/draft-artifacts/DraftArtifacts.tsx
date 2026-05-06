import clsx from "clsx";
import styles from "./DraftArtifacts.module.css"
import { useAppSelector } from "@/app/store";
import { useCallback, useState } from "react";
import type { CardForView } from "../../../types/card";
import DraftDeck from "../draft-deck/DraftDeck";
import { CARD_MODAL_TYPE, type OpenCardModalData } from "@/features/modal/types/modal";
import { type DeckArtifact } from "@/features/game/types/state/game";
import type { ModalDraftDetails } from "@/features/modal/types/details";
import { GameTimer } from "../../common/game-timer/GameTimer";
import { useCardModal } from "@/features/modal/hooks/useCardModal";

function DraftArtifacts() {
    const playersOnline = useAppSelector((state) => state.game.playersOnline);
    const gameState = useAppSelector((state) => state.game.gameState);
    const [isYourDeck, setIsYourDeck] = useState(true);
    const gameId = useAppSelector(state => state.game.gameState?.id);
    
    const { openCardModal } = useCardModal();

    const deckPlayer = useAppSelector(state => state.game.gameState?.player.draft.deck);
    const deckEnemy = useAppSelector(state => state.game.gameState?.enemy.draft.deck);

    if (!deckPlayer || !deckEnemy || !gameId) {
        return null;
    }

    const handleCardClick = useCallback((card: CardForView, cardInfo: DeckArtifact) => {
        const details: ModalDraftDetails = {
            isYourDeck,
            gameId,
            cardForView: card
        }

        const data: OpenCardModalData = {
            details: details,
            modalType: CARD_MODAL_TYPE.DRAFT,
            valueLeftTop: cardInfo.maxHp,
            valueRightTop: cardInfo.skillCost,
            isArtifact: true
        }

        openCardModal(data);
    }, [openCardModal, isYourDeck, gameId]);

    return (  
        <div className={clsx(styles["draft-artifacts-wrapper"])}>
            <div className={clsx(styles["draft-artifacts-top"])}>
                <h2>Выберите артефакт</h2>
                <div className={styles["players-status"]}>
                    <div className={styles["player-connection-wrapper"]}>
                        {Object.entries(playersOnline).map((playerOnline) => (
                            <div key={playerOnline[0]} className={styles["player-connection"]}>
                                <span className={styles["player-name"]}>{playerOnline[0]}</span>
                                <div className={styles["player-connection-status-wrapper"]}>
                                    {playerOnline[0] === gameState!.player.name && (
                                        gameState!.player.isReady ? (
                                            <span>Выбрал ✅</span>
                                        ) : (
                                            <span>Выбирает ⏳</span>
                                        )              
                                    )}
                                    {playerOnline[0] === gameState!.enemy.name && (
                                        gameState!.enemy.isReady ? (
                                            <span>Выбрал</span>
                                        ) : (
                                            <span>Выбирает ⏳</span>
                                        )              
                                    )}
                                    {playerOnline[1] === gameState!.player.name && (
                                        gameState!.player.isReady ? (
                                            <span>Выбрал ✅</span>
                                        ) : (
                                            <span>Выбирает ⏳</span>
                                        )              
                                    )}
                                    {playerOnline[1] === gameState!.enemy.name && (
                                        gameState!.enemy.isReady ? (
                                            <span>Выбрал ✅</span>
                                        ) : (
                                            <span>Выбирает ⏳</span>
                                        )              
                                    )}
                                </div>
                            </div>                
                        ))}
                    </div>
                    {gameState?.constants.timerDraft !== null && (
                        <GameTimer />
                    )}
                </div>   
                <button type="button" onClick={() => setIsYourDeck(!isYourDeck)}>
                    {isYourDeck ? "Колода соперника" : "Своя колода"}
                </button>
            </div>
            <div className={styles["deck-container"]}>
                {isYourDeck ? (
                    <DraftDeck isYour={isYourDeck} deck={deckPlayer} onHandleCardClick={handleCardClick} />
                ): (
                    <DraftDeck isYour={isYourDeck} deck={deckEnemy} onHandleCardClick={handleCardClick} />
                )}
            </div>
        </div>
    );
}

export default DraftArtifacts;