import { useGameSocket } from "@/features/game/hooks/useGameSocket";
import type { GameForClient } from "@/features/game/types/state/game-for-client";
import clsx from "clsx";
import styles from "./SettingsModal.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { setLeaveLobby } from "@/features/lobby/store/lobbySlice";

interface SettingsModalProps {
    gameState: GameForClient
}

const SettingsModal = (props: SettingsModalProps) => {
    const { giveUp, cancelDraw, offerDraw } = useGameSocket();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleGiveUp = () => {
        if (confirm("Вы уверены?")) {
            giveUp(props.gameState.id);
        }
    }

    const exitMenuClick = () => {
        if (props.gameState.end) {
            dispatch(setLeaveLobby())
            navigate("/")
        }
    }

    return (
        <div className={clsx(styles["settings-modal"])}>
            {!props.gameState.end && (
                <>
                    <button onClick={handleGiveUp} className={clsx(styles["settings-button"])}>Сдаться</button>
                    {props.gameState.enemy.offerDraw ? (
                        <>
                            <button onClick={() => offerDraw(props.gameState.id)} className={clsx(styles["settings-button"])}>
                                Принять ничью
                            </button>
                            <button onClick={() => cancelDraw(props.gameState.id)} className={clsx(styles["settings-button"])}>
                                Отклонить ничью
                            </button>
                        </>
                    ) : (
                        props.gameState.player.offerDraw ? (
                            <button 
                                onClick={() => cancelDraw(props.gameState.id)}
                                className={clsx(styles["settings-button"])}>
                                Отменить ничью
                            </button>
                        ) : (
                            <button 
                                onClick={() => offerDraw(props.gameState.id)}
                                className={clsx(styles["settings-button"])}>
                                Предложить ничью
                            </button>
                        )
                    )}
                </>
            )}

            <button onClick={exitMenuClick} className={clsx(styles["settings-button"])}>Выйти в главное меню</button>
        </div>



    )
}

export default SettingsModal;