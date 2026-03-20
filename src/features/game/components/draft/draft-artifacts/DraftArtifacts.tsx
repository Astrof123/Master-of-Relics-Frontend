import clsx from "clsx";
import styles from "./DraftArtifacts.module.css"
import { useAppSelector } from "@/app/store";
import { useCallback, useState } from "react";
import type { CardForView } from "../../../types/card";
import DraftDeck from "../draft-deck/DraftDeck";
import { useModal } from "@/features/modal/hooks/useModal";
import { MODALTYPE } from "@/features/modal/types/modal";
import { CONNECTIONGAME } from "@/features/game/types/state/game";

function DraftArtifacts() {
    const playersOnline = useAppSelector((state) => state.game.playersOnline);
    const gameState = useAppSelector((state) => state.game.gameState);
    const [isYourDeck, setIsYourDeck] = useState(true);
    const gameId = useAppSelector(state => state.game.gameState?.id);
    
    const { openCardModal } = useModal();

    const deckPlayer = useAppSelector(state => state.game.gameState?.player.draft.deck);
    const deckEnemy = useAppSelector(state => state.game.gameState?.enemy.draft.deck);

    if (!deckPlayer || !deckEnemy || !gameId) {
        return null;
    }

    const handleCardClick = useCallback((card: CardForView) => {
        const details = {
            isYourDeck,
            gameId,
        }
        openCardModal(card, MODALTYPE.DRAFT, details);
    }, [openCardModal, isYourDeck, gameId]);

    return (  
        <div className={clsx(styles["draft-artifacts-wrapper"])}>
            <div className={clsx(styles["draft-artifacts-top"])}>
                <h2>Выберите артефакт</h2>
                <div className={styles["players-status"]}>
                    {/* <p>Игроки:</p> */}
                    <div className={styles["player-connection-wrapper"]}>
                        {Object.entries(playersOnline).map((playerOnline) => (
                            <div key={playerOnline[0]} className={styles["player-connection"]}>
                                <span className={styles["player-name"]}>{playerOnline[0]}</span>
                                <div className={styles["player-connection-status-wrapper"]}>
                                    <span className={styles["connection-status"]}>
                                        {playerOnline[1] === CONNECTIONGAME.ONLINE ? "🟢" : "🔴"}
                                    </span>
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