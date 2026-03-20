import { useAppSelector } from "@/app/store";
import styles from "./DraftedArtifacts.module.css"
import { useNavigate } from "react-router-dom";
import DraftNet from "../draft-net/DraftNet";
import { useDraftSocket } from "@/features/game/hooks/useDraftSocket";

function DraftedArtifacts() {
    const gameState = useAppSelector((state) => state.game.gameState);
    const navigate = useNavigate();
    const { toggleReadyDraft } = useDraftSocket();

    if (gameState === null) {
        return null;
    }

    const endChoice = async () => {
        if (gameState.player.draft.pickedArtifact === null) {
            console.log("Вы не выбрали артефакт!")
            return;
        }
        await toggleReadyDraft(gameState.id);
    }

    return (
        <div className={styles["drafted-wrapper"]}>
            <button 
                className={styles["exit-button"]} 
                type="button" 
                onClick={() => navigate("/")}
            >
                Покинуть
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
                        Выбрать
                    </button>
                )}
            </div>
        </div>
    );
}

export default DraftedArtifacts;