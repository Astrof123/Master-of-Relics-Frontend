import { useAppSelector } from "@/app/store";
import styles from "./PlayerPanel.module.css";
import clsx from "clsx";
import rageImg from "@assets/icons/rage.svg";
import agilityImg from "@assets/icons/agility.svg";
import destructionManaImg from "@assets/icons/destruction_mana.svg";
import lightManaImg from "@assets/icons/light_mana.svg";
import darkManaImg from "@assets/icons/dark_mana.svg";
import spellBook from "@assets/icons/spellbook.png";
import { EFFECTS } from "@/features/game/constants/effects";
import movePointsImg from "@assets/icons/move_points.jpg";
import type { GameForClient } from "@/features/game/types/state/game-for-client";
import { useGameSocket } from "@/features/game/hooks/useGameSocket";
import { useCallback } from "react";
import { useCardModal } from "@/features/modal/hooks/useCardModal";
import { CARD_MODAL_TYPE, type OpenCardModalData } from "@/features/modal/types/modal";
import { MINIPHASE } from "@/features/game/types/state/phase";
import type { ToggleReadyMovementData } from "@/features/action/types/action-evens-data";

interface PlayerPanelProps {
    isYour: boolean;
}

const PlayerPanel = (props: PlayerPanelProps) => {
    
    const { endTurn, endRound, toggleReadyMovement } = useGameSocket();
    const { openCardModal } = useCardModal();
    const isChoice = useAppSelector((state) => state.choice.isChoice);

    let playerState;
    const gameState = useAppSelector(state => state.game.gameState) as GameForClient;

    if (props.isYour) {
        playerState = useAppSelector((state) => state.game.gameState?.player);
    }
    else {
        playerState = useAppSelector((state) => state.game.gameState?.enemy);
    }

    const containerStyles = [styles["container"]];
    const turnStyles = [styles["turn"]];

    if (props.isYour) {
        containerStyles.push(styles["container--player"]);
        turnStyles.push(styles["turn--player"])
    }
    else {
        containerStyles.push(styles["container--enemy"]);
        turnStyles.push(styles["turn--enemy"])
    }

    if (gameState.currentTurn === playerState?.id && gameState.miniPhase !== MINIPHASE.MOVEMENT) {
        containerStyles.push(styles["container--turn"]);
    }

    if (playerState?.isReady) {
        containerStyles.push(styles["container--end-round"])
    }

    const handleEndTurn = () => {
        endTurn(gameState.id)
    }

    const handleEndRound = () => {
        if (!confirm("Вы уверены, что хотите закончить раунд?")) {
            return;
        }
        endRound(gameState.id)
    }

    const handleToggleReadyMovement = () => {
        const data: ToggleReadyMovementData = {
            gameId: gameState.id,
            artifactsWithNewPosition: gameState.player.temporaryArtifacts
        }
        toggleReadyMovement(data)
    }

    const handleSpellBookClick = useCallback(() => {
        if (isChoice) {
            return;
        }

        // if (gameState.miniPhase === MINIPHASE.MOVEMENT || isMoving) {
        //     return null;
        // }

        const data: OpenCardModalData = {
            details: null,
            modalType: CARD_MODAL_TYPE.SPELL_BOOK,
            valueLeftTop: null,
            valueRightTop: null,
            isArtifact: true
        }

        openCardModal(data);
    }, [openCardModal]);

    return (
        <div className={clsx(containerStyles)}>
            {gameState.currentTurn === playerState?.id && gameState.miniPhase !== MINIPHASE.MOVEMENT && (
                <div className={clsx(turnStyles)}>
                    Ходит...
                </div>
            )}
            {playerState?.isReady && (
                gameState.miniPhase !== MINIPHASE.MOVEMENT ? (
                    <div className={clsx(turnStyles, styles.round)}>
                        Закончил раунд
                    </div>
                ) : (
                    <div className={clsx(turnStyles, styles.round)}>
                        Готов
                    </div>
                )

            )}
            <div className={clsx(styles["buffs"])}>
                <div title="Очки действий" className={clsx(styles["buff-wrapper"])}>
                    <span>{playerState?.movePoints}</span>
                    <img 
                        className={clsx(styles.buff, styles["buff--positive"])} 
                        src={movePointsImg} 
                        alt="Очки действий" 
                    />
                </div>

                {playerState?.effects.map((effect, index) => (
                    <div key={effect.id + index} title={EFFECTS[effect.id].title} className={clsx(styles["buff-wrapper"])}>
                        <span>{effect.number}</span>
                        <img
                            src={EFFECTS[effect.id].img} 
                            alt={EFFECTS[effect.id].name}
                            className={clsx(styles.buff, effect.type === "negative" ? styles["buff--negative"] : styles["buff--positive"])}  
                        />
                    </div>
                ))}
            </div>
            <div className={clsx(styles["resources"])}>
                <div className={clsx(styles["resource"])}>
                    <span>{playerState?.resources.rage}/100</span>
                    <img src={rageImg} alt="rage" />
                </div>
                <div className={clsx(styles["resource"])}>
                    <span>{playerState?.resources.agility}/100</span>
                    <img src={agilityImg} alt="agility" />
                </div>
                <div className={clsx(styles["resource"])}>
                    <span>{playerState?.resources.destruction_mana}/100</span>
                    <img src={destructionManaImg} alt="destruction mana" />
                </div>
                <div className={clsx(styles["resource"])}>
                    <span>{playerState?.resources.light_mana}/100</span>
                    <img src={lightManaImg} alt="light mana" />
                </div>
                <div className={clsx(styles["resource"])}>
                    <span>{playerState?.resources.dark_mana}/100</span>
                    <img src={darkManaImg} alt="dark mana" />
                </div>
            </div>
            {props.isYour && (
                <div className={clsx(styles["player-buttons"])}>
                    <div  onClick={handleSpellBookClick} className={clsx(styles.spellbook, isChoice ? styles["spellbook--disabled"] : null)} title="Книга заклинаний">
                        <img src={spellBook} alt="Spellbook" />
                    </div>
                    <div className={clsx(styles["end-buttons"])}>
                        {gameState.miniPhase === MINIPHASE.MOVEMENT ? (
                                <button
                                    onClick={handleToggleReadyMovement} 
                                    className={clsx(styles["end-round"])}
                                >
                                    Поменять готовность
                                </button>     
                        ) : (
                            <>
                                <button
                                    disabled={gameState.currentTurn === playerState?.id && !isChoice ? false : true}
                                    onClick={handleEndRound}
                                    className={clsx(styles["end-round"])}
                                >
                                    Закончить раунд
                                </button>
                                <button
                                    disabled={
                                        gameState.currentTurn === playerState?.id && !isChoice && gameState.player.extraData.countActionsSinceStartTurn > 0
                                        ? false
                                        : true}
                                    onClick={handleEndTurn} 
                                    className={clsx(styles["end-turn"])}
                                >
                                    Закончить ход
                                </button>      
                            </>
                        )}
          
                    </div>                
                </div>
            )}        
        </div>
    )
}

export default PlayerPanel;