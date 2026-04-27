import clsx from "clsx";
import type { Lobby } from "../../types/lobby";
import styles from "./LobbySettings.module.css"
import TimerImg from "@assets/icons/wait.png";
import { useState, type ChangeEvent } from "react";
import { useAppSelector, type RootState } from "@/app/store";
import { useLobbySocket } from "../../hooks/useLobbySocket";

interface LobbySettingsProps {
    lobby: Lobby;
    onSetEditingOptions: (value: boolean) => void;
    editingOptions: boolean;
}

const LobbySettings = (props: LobbySettingsProps) => {
    const { updateOptionsLobby} = useLobbySocket();

    const user = useAppSelector((state: RootState) => state.auth.user)
    const [formData, setFormData] = useState({
        useTimers: props.lobby.options.withTimers,
        turnTime: props.lobby.options.timerTurn,
        movementTime: props.lobby.options.timerMovement,
        draftTime: props.lobby.options.timerDraft
    })

    if (user === null) {
        return;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleUpdateOptions = () => {
        updateOptionsLobby({
            lobbyId: props.lobby.id,
            withTimers: formData.useTimers,
            timerDraft: formData.draftTime,
            timerMovement: formData.movementTime,
            timerTurn: formData.turnTime,
        });
        
        props.onSetEditingOptions(false);
    }

    const playerLobby = props.lobby.players[user.id];
    const canEdit = props.editingOptions && playerLobby.isHost;
    
    return (
        <div className={styles["options-wrapper"]}>
            <label className={clsx(styles.label, styles["checkbox-label"])}>
                <div className={styles["checkbox-label-inner-wrapper"]}>
                    <span className={styles["checkbox-text"]}>
                        <img className={styles["checkbox-icon"]} src={TimerImg} alt="" />
                        Игра с таймерами:
                    </span>
                    {canEdit ? (
                        <>
                            <input
                                disabled={!canEdit}
                                type="checkbox" 
                                name="useTimers"
                                checked={formData.useTimers}
                                onChange={handleChange}
                                className={styles["checkbox-input"]}
                            />
                            <span className={styles["checkbox-custom"]}></span>                        
                        </>
                    ) : (
                        <span className={styles["timer-text"]}>{formData.useTimers ? "Вкл" : "Выкл"}</span>
                    )}

                </div>
                <span className={styles["checkbox-description"]}>
                    {formData.useTimers ? 
                        "Время на ходы будет ограничено." : 
                        "Игра без ограничения времени."}
                </span>
            </label>
            <div className={styles["timers-section"]}>                        
                <div className={styles["timer-group"]}>
                    <label className={styles["timer-label"]}>
                        <span className={styles["timer-label-text"]}>Время на ход</span>
                        <div className={styles["timer-input-wrapper"]}>
                            <input
                                disabled={!formData.useTimers || !canEdit}
                                type="number" 
                                name="turnTime"
                                value={formData.turnTime ?? undefined}
                                onChange={handleChange}
                                min={15}
                                max={300}
                                step={5}
                                className={styles["timer-input"]}
                            />
                            <span className={styles["timer-unit"]}>сек</span>
                        </div>
                    </label>
                </div>

                <div className={styles["timer-group"]}>
                    <label className={styles["timer-label"]}>
                        <span className={styles["timer-label-text"]}>Время на расстановку</span>
                        <div className={styles["timer-input-wrapper"]}>
                            <input 
                                disabled={!formData.useTimers || !canEdit}
                                type="number" 
                                name="movementTime"
                                value={formData.movementTime ?? undefined}
                                onChange={handleChange}
                                min={15}
                                max={300}
                                step={5}
                                className={styles["timer-input"]}
                            />
                            <span className={styles["timer-unit"]}>сек</span>
                        </div>
                    </label>
                </div>

                <div className={styles["timer-group"]}>
                    <label className={styles["timer-label"]}>
                        <span className={styles["timer-label-text"]}>Время на выбор карты (драфт)</span>
                        <div className={styles["timer-input-wrapper"]}>
                            <input
                                disabled={!formData.useTimers || !canEdit}
                                type="number" 
                                name="draftTime"
                                value={formData.draftTime ?? undefined}
                                onChange={handleChange}
                                min={15}
                                max={300}
                                step={5}
                                className={styles["timer-input"]}
                            />
                            <span className={styles["timer-unit"]}>сек</span>
                        </div>
                    </label>
                </div>
            </div>
            {canEdit && (
                <button onClick={handleUpdateOptions} className={styles.button} type="submit">
                    Подтвердить
                </button>
            )}

        </div>
    );
}

export default LobbySettings;