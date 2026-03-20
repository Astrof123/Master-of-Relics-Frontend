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

interface PlayerPanelProps {
    isYour: boolean;
}

const PlayerPanel = (props: PlayerPanelProps) => {
    const { endTurn, endRound } = useGameSocket();

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

    if (gameState.currentTurn === playerState?.id) {
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

    return (
        <div className={clsx(containerStyles)}>
            {gameState.currentTurn === playerState?.id && (
                <div className={clsx(turnStyles)}>
                    Ходит...
                </div>
            )}
            {playerState?.isReady && (
                <div className={clsx(turnStyles, styles.round)}>
                    Закончил раунд
                </div>
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

                {playerState?.effects.map((effect) => (
                    <div key={effect.id} title={EFFECTS[effect.id].title} className={clsx(styles["buff-wrapper"])}>
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
                    <div className={clsx(styles.spellbook)} title="Книга заклинаний">
                        <img src={spellBook} alt="Spellbook" />
                    </div>
                    <div className={clsx(styles["end-buttons"])}>
                        <button
                            disabled={gameState.currentTurn === playerState?.id ? false : true}
                            onClick={handleEndRound}
                            className={clsx(styles["end-round"])}
                        >
                            Закончить раунд
                        </button>
                        <button
                            disabled={gameState.currentTurn === playerState?.id ? false : true}
                            onClick={handleEndTurn} 
                            className={clsx(styles["end-turn"])}
                        >
                            Закончить ход
                        </button>                
                    </div>                
                </div>
            )}        
        </div>
    )
}

export default PlayerPanel;