import { useAppSelector } from "@/app/store";
import type { GameForClient } from "@/features/game/types/state/game-for-client";
import clsx from "clsx";
import styles from "./Clue.module.css";
import { useDispatch } from "react-redux";
import { setDefault } from "@/features/game/store/choiceSlice";
import { useGameSocket } from "@/features/game/hooks/useGameSocket";
import type { ReactNode } from "react";
import Coin from "@assets/icons/coin.png";
import { MINIPHASE } from "@/features/game/types/state/phase";
import type { ExtraActionData } from "@/features/action/types/action-evens-data";
import { EXTRA_ACTION } from "@/features/action/types/action";
import { deactivateMoving } from "@/features/game/store/gameSlice";

interface ClueProps {
    gameState: GameForClient
}

const Clue = (props: ClueProps) => {
    const { useFace, useSkill, useSpell, extraAction } = useGameSocket();
    const dispatch = useDispatch();
    let message = "";
    const choiceState = useAppSelector(state => state.choice);
    const isMoving = useAppSelector(state => state.game.isMoving);
    const movedArtifact = useAppSelector(state => state.game.movedArtifact);

    if (props.gameState.miniPhase === MINIPHASE.MOVEMENT) {
        message = props.gameState.player.isReady ? "Ждите пока закончит противник..." : "Расположите ваши артефакты...";
    }
    else if (props.gameState.currentTurn === props.gameState.player.id) {
        message = "Сделайте ход...";

        if (choiceState.isChoice) {
            const allies = choiceState.countTargetAllies || 0;
            const enemies = choiceState.countTargetEnemies || 0;
            const any = choiceState.countTargetAny || 0;
            
            if (any > 0) {
                const minTotal = allies + enemies;
                const maxTotal = allies + enemies + any;
                
                if (minTotal === maxTotal) {
                    message = `Выберите ${allies} союзных и ${enemies} вражеских артефакта.`;
                } else {
                    if (allies > 0 && enemies > 0) {
                        message = `Выберите от ${allies} до ${maxTotal} целей (из них минимум ${allies} союзных и ${enemies} вражеских).`;
                    } else if (allies > 0) {
                        message = `Выберите от ${allies} до ${maxTotal} целей (из них минимум ${allies} союзных).`;
                    } else if (enemies > 0) {
                        message = `Выберите от ${enemies} до ${maxTotal} целей (из них минимум ${enemies} вражеских).`;
                    } else {
                        message = `Выберите до ${maxTotal} любых целей.`;
                    }
                }
            } 
            else if (allies > 0 && enemies > 0) {
                message = `Выберите ${allies} союзных артефакта и ${enemies} вражеских артефакта.`;
            }
            else if (allies > 0) {
                if (allies === 1) {
                    message = `Выберите ${allies} союзный артефакт.`;
                } else {
                    message = `Выберите ${allies} союзных артефакта.`;
                }
            }
            else if (enemies > 0) {
                if (enemies === 1) {
                    message = `Выберите ${enemies} вражеский артефакт.`;
                } else {
                    message = `Выберите ${enemies} вражеских артефакта.`;
                }
            }
        }
    }
    else {
        message = "Ждите пока сходит противник...";
    }

    const handleCancel = () => {
        dispatch(setDefault());
    }

    const handleReady = () => {
        const allies = choiceState.countTargetAllies || 0;
        const enemies = choiceState.countTargetEnemies || 0;
        const any = choiceState.countTargetAny || 0;

        const selectedAllies = choiceState.selectedTargets[0].length;
        const selectedEnemies = choiceState.selectedTargets[1].length;
        const totalSelected = selectedAllies + selectedEnemies;

        const minTotal = allies + enemies;
        const maxTotal = allies + enemies + any;

        if (totalSelected < minTotal || totalSelected > maxTotal) {
            if (minTotal === maxTotal) {
                alert(`Вам нужно выбрать ровно ${minTotal} целей (${allies} союзных и ${enemies} вражеских). Вы выбрали ${totalSelected} (${selectedAllies} союзных, ${selectedEnemies} вражеских).`);
            } else {
                alert(`Вам нужно выбрать от ${minTotal} до ${maxTotal} целей. Вы выбрали ${totalSelected} (${selectedAllies} союзных, ${selectedEnemies} вражеских).`);
            }
            return;
        }

        if (selectedAllies < allies) {
            alert(`Вам нужно выбрать минимум ${allies} союзных артефакта. Вы выбрали ${selectedAllies}.`);
            return;
        }

        if (selectedEnemies < enemies) {
            alert(`Вам нужно выбрать минимум ${enemies} вражеских артефакта. Вы выбрали ${selectedEnemies}.`);
            return;
        }

        if (choiceState.typeAction === "face") {
            useFace({
                gameId: props.gameState.id,
                healTarget: choiceState.selectedTargets[0].length > 0 ? choiceState.selectedTargets[0][0] : null,
                artifactGameId: choiceState.attackerArtifactId!,
                attackTarget: choiceState.selectedTargets[1].length > 0 ? choiceState.selectedTargets[1][0] : null
            });
        }
        else if (choiceState.typeAction === "skill") {
            useSkill({
                gameId: props.gameState.id,
                artifactGameId: choiceState.attackerArtifactId!,
                skillId: choiceState.actionId!,
                targets: [choiceState.selectedTargets[0], choiceState.selectedTargets[1]]
            });
        }
        else if (choiceState.typeAction === "spell") {
            useSpell({
                gameId: props.gameState.id,
                spellId: choiceState.actionId!,
                targets: [choiceState.selectedTargets[0], choiceState.selectedTargets[1]]
            });
        }
        dispatch(setDefault());
    }

    const handleCancelMoving = () => {
        dispatch(deactivateMoving());
    }

    const handleReadyMoving = () => {
        const data: ExtraActionData = {
            gameId: props.gameState.id,
            artifactGameId: movedArtifact!,
            type: EXTRA_ACTION.MOVE,
            details: {
                newPosition: props.gameState.player.temporaryArtifacts[movedArtifact!].position,
                newLine: props.gameState.player.temporaryArtifacts[movedArtifact!].line,
            }
        }

        extraAction(data);
    }

    const endGameRender = (): ReactNode => {
        let result;
        let prize;
        let resultClass = "";
        let prizeClass = "";

        if (props.gameState.end!.winner === null) {
            result = "Ничья";
            prize = props.gameState.end!.draw_prize;
            resultClass = "result-draw";
            prizeClass = "prize-draw";
        }
        else {
            if (props.gameState.end!.winner === props.gameState.player.id) {
                result = "Победа";
                prize = props.gameState.end!.winner_prize;
                resultClass = "result-win";
                prizeClass = "prize-win";
            }
            else {
                result = "Поражение";
                prize = props.gameState.end!.loser_prize;                
                resultClass = "result-lose";
                prizeClass = "prize-lose";
            }
        }

        return (
            <div className={styles["endgame-container"]}>
                <div className={clsx(styles["endgame-result"], styles[resultClass])}>
                    <span className={styles["result-icon"]}>
                        {result === "Победа" && "🏆"}
                        {result === "Поражение" && "💀"}
                        {result === "Ничья" && "🤝"}
                    </span>
                    <span className={styles["result-text"]}>{result}</span>
                </div>
                <div className={clsx(styles["endgame-prize"], styles[prizeClass])}>
                    <img className={clsx(styles["prize-img"])} src={Coin} alt="" />
                    <span className={styles["prize-text"]}>Вы получили {prize} золота</span>
                </div>
            </div>
        )
    }

    return (
        <div className={clsx(styles["clue"])}>
            {props.gameState.end ? (
                endGameRender()
            ) : (
                <>
                    <span>{message}</span>
                    {choiceState.isChoice && (
                        <div className={clsx(styles["clue-buttons"])}>
                            <button onClick={handleReady} className={clsx(styles["ready-button"])}>Готово</button>
                            <button onClick={handleCancel} className={clsx(styles["cancel-button"])}>Отмена</button>
                        </div>
                    )}
                    {isMoving && (
                        <div className={clsx(styles["clue-buttons"])}>
                            <button onClick={handleReadyMoving} className={clsx(styles["ready-button"])}>Готово</button>
                            <button onClick={handleCancelMoving} className={clsx(styles["cancel-button"])}>Отмена</button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Clue;