import { useAppSelector } from "@/app/store";
import type { GameForClient } from "@/features/game/types/state/game-for-client";
import clsx from "clsx";
import styles from "./Clue.module.css";
import { useDispatch } from "react-redux";
import { setDefault } from "@/features/game/store/choiceSlice";
import { useGameSocket } from "@/features/game/hooks/useGameSocket";

interface ClueProps {
    gameState: GameForClient
}

const Clue = (props: ClueProps) => {
    const { useFace, useSkill } = useGameSocket();
    const dispatch = useDispatch();
    let message = "";
    const choiceState = useAppSelector(state => state.choice);

    if (props.gameState.currentTurn === props.gameState.player.id) {
        message = "Сделайте ход...";

        if (choiceState.isChoice) {
            if (choiceState.countTargetAllies > 0 && choiceState.countTargetEnemies > 0) {
                message = `Выберите ${choiceState.countTargetAllies} союзных артефакта и ${choiceState.countTargetEnemies} вражеских артефакта.`
            }
            else if (choiceState.countTargetAllies > 0) {
                message = `Выберите ${choiceState.countTargetAllies} союзных артефакта.`

                if (choiceState.countTargetAllies == 1) {
                    message = `Выберите ${choiceState.countTargetAllies} союзный артефакт.`
                }
            }
            else if (choiceState.countTargetEnemies > 0) {
                message = `Выберите ${choiceState.countTargetEnemies} вражеских артефакта.`

                if (choiceState.countTargetEnemies == 1) {
                    message = `Выберите ${choiceState.countTargetEnemies} вражеский артефакт.`
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
        if (choiceState.selectedTargets[0].length !== choiceState.countTargetAllies) {
            alert(`Вам нужно выбрать ${choiceState.countTargetAllies} союзных артефакта. Вы выбрали ${choiceState.selectedTargets[0].length}.`);
            return;
        }

        if (choiceState.selectedTargets[1].length !== choiceState.countTargetEnemies) {
            alert(`Вам нужно выбрать ${choiceState.countTargetEnemies} вражеских артефакта. Вы выбрали ${choiceState.selectedTargets[1].length}.`);
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
        dispatch(setDefault());
    }

    return (
        <div className={clsx(styles["clue"])}>
            {message}
            {choiceState.isChoice && (
                <div className={clsx(styles["clue-buttons"])}>
                    <button onClick={handleReady} className={clsx(styles["ready-button"])}>Готово</button>
                    <button onClick={handleCancel} className={clsx(styles["cancel-button"])}>Отмена</button>
                </div>
            )}
        </div>
    )
}

export default Clue;