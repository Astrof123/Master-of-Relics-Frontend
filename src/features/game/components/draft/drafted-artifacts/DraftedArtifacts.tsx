import { useAppDispatch, useAppSelector } from "@/app/store";
import styles from "./DraftedArtifacts.module.css"
import { useNavigate } from "react-router-dom";
import DraftNet from "../draft-net/DraftNet";
import { useDraftSocket } from "@/features/game/hooks/useDraftSocket";
import { useGameSocket } from "@/features/game/hooks/useGameSocket";
import { setLeaveLobby } from "@/features/lobby/store/lobbySlice";
import { toast } from "sonner";

function DraftedArtifacts() {
    const gameState = useAppSelector((state) => state.game.gameState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toggleReadyDraft } = useDraftSocket();
    const { giveUp } = useGameSocket();

    if (gameState === null) {
        return null;
    }

    const handleGiveUp = async () => {
        if (gameState.end !== null) {
            toast.info("Игра окончена");
            return;
        }

        await giveUp(gameState.id);

    }

    const endChoice = async () => {
        if (gameState.player.draft.pickedArtifact === null) {
            toast.warning("Вы не выбрали артефакт!");
            return;
        }

        if (gameState.end !== null) {
            toast.info("Игра окончена");
            return;
        }

        await toggleReadyDraft(gameState.id);
    }

    const exitMenuClick = () => {
        dispatch(setLeaveLobby())
        navigate("/")
    }

    return (
        <div className={styles["drafted-wrapper"]}>
            <button 
                className={styles["exit-button"]} 
                type="button" 
                onClick={exitMenuClick}
            >
                Выйти в главное меню
            </button>
            <button 
                className={styles["exit-button"]} 
                type="button" 
                onClick={handleGiveUp}
            >
                Сдаться
            </button>
            <div className={styles["net-container"]}>
                <DraftNet 
                    playerArtifacts={gameState.player.artifacts} 
                    enemyArtifacts={gameState.enemy.artifacts} 
                />
            </div>
            <div className={styles["draft-actions"]}>
                {gameState.player.isReady ? (
                    <button 
                        className={styles["cancel-button"]}
                        onClick={() => toggleReadyDraft(gameState.id)} 
                        type="button"
                    >
                        Отменить
                    </button>
                ) : (
                    <button 
                        className={styles["complete-button"]}
                        onClick={endChoice} 
                        type="button"
                    >
                        Закончить выбор
                    </button>
                )}
            </div>
        </div>
    );
}

export default DraftedArtifacts;