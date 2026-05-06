import { useState, type ChangeEvent } from "react";
import styles from "./CreateLobby.module.css";
import clsx from "clsx";
import LockImg from "@assets/icons/lock.png";
import TimerImg from "@assets/icons/wait.png";
import type { CreateLobbyData } from "../../types/lobby-socket-data-requests";
import { useAppSelector } from "@/app/store";

interface CreateLobbyProps {
    onCreateLobby: (data: CreateLobbyData) => void
}

const CreateLobby = (props: CreateLobbyProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const isBanned = !!user?.bannedUntil && new Date(user.bannedUntil) > new Date();
    const [formData, setFormData] = useState({
        name: "",
        isPrivate: false,
        useTimers: false,
        turnTime: 30,
        movementTime: 60,
        draftTime: 40
    })

    const [touched, setTouched] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleCreateLobby = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name.trim()) {
            setTouched(true);
            return;
        }
        
        if (formData.name.length < 3 || formData.name.length > 20) {
            setTouched(true);
            return;
        }

        props.onCreateLobby({
            name: formData.name,
            isPrivate: formData.isPrivate,
            withTimers: formData.useTimers,
            timerDraft: formData.draftTime,
            timerMovement: formData.movementTime,
            timerTurn: formData.turnTime
        });
        
        setFormData(prev => ({
            ...prev, 
            name: "",
            isPrivate: false,
            useTimers: false,
            turnTime: 60,
            movementTime: 45,
            draftTime: 45
        }))
        setTouched(false);
    }

    const getInputClass = () => {
        if (!touched) return styles.input;
        if (formData.name.length >= 3 && formData.name.length <= 20) {
            return clsx(styles.input, styles.valid);
        }
        return clsx(styles.input, styles.invalid);
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Создание лобби</h2>
            <form onSubmit={handleCreateLobby}>
                <label className={styles.label}>
                    Название лобби
                    <input 
                        className={getInputClass()}
                        type="text" 
                        name="name" 
                        placeholder="Введите название (3-20 символов)"
                        value={formData.name}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={20}
                        required
                        disabled={isBanned}
                    />
                </label>
                
                {touched && formData.name.length > 0 && formData.name.length < 3 && (
                    <div className={styles["helper-text"]}>
                        Слишком короткое имя (минимум 3 символа)
                    </div>
                )}
                
                {touched && formData.name.length > 20 && (
                    <div className={styles["helper-text"]}>
                        Слишком длинное имя (максимум 20 символов)
                    </div>
                )}

                {/* Приватное лобби */}
                <label className={clsx(styles.label, styles["checkbox-label"])}>
                    <div className={styles["checkbox-label-inner-wrapper"]}>
                        <span className={styles["checkbox-text"]}>
                            <img className={styles["checkbox-icon"]} src={LockImg} alt="" />
                            Приватное лобби
                        </span>
                        <input 
                            type="checkbox" 
                            name="isPrivate"
                            checked={formData.isPrivate}
                            onChange={handleChange}
                            className={styles["checkbox-input"]}
                            disabled={isBanned}
                        />
                        <span className={styles["checkbox-custom"]}></span>
                    </div>
                    <span className={styles["checkbox-description"]}>
                        {formData.isPrivate ? 
                            "Лобби будет скрыто от общего списка. Доступ только по коду или по приглашению." : 
                            "Лобби будет видно всем игрокам."}
                    </span>
                </label>

                {/* Таймеры */}
                <label className={clsx(styles.label, styles["checkbox-label"])}>
                    <div className={styles["checkbox-label-inner-wrapper"]}>
                        <span className={styles["checkbox-text"]}>
                            <img className={styles["checkbox-icon"]} src={TimerImg} alt="" />
                            Игра с таймерами
                        </span>
                        <input 
                            type="checkbox" 
                            name="useTimers"
                            checked={formData.useTimers}
                            onChange={handleChange}
                            className={styles["checkbox-input"]}
                            disabled={isBanned}
                        />
                        <span className={styles["checkbox-custom"]}></span>
                    </div>
                    <span className={styles["checkbox-description"]}>
                        {formData.useTimers ? 
                            "Время на ходы будет ограничено." : 
                            "Игра без ограничения времени."}
                    </span>
                </label>

                {/* Настройки таймеров (показываются только если useTimers = true) */}
                {formData.useTimers && (
                    <div className={styles["timers-section"]}>
                        <div className={styles["timers-header"]}>
                            <span className={styles["timers-icon"]}>⏱️</span>
                            <span className={styles["timers-title"]}>Настройка времени</span>
                        </div>
                        
                        <div className={styles["timer-group"]}>
                            <label className={styles["timer-label"]}>
                                <span className={styles["timer-label-text"]}>Время на ход</span>
                                <div className={styles["timer-input-wrapper"]}>
                                    <input 
                                        type="number" 
                                        name="turnTime"
                                        value={formData.turnTime}
                                        onChange={handleChange}
                                        min={15}
                                        max={300}
                                        step={5}
                                        className={styles["timer-input"]}
                                        disabled={isBanned}
                                    />
                                    <span className={styles["timer-unit"]}>сек</span>
                                </div>
                            </label>
                            <div className={styles["timer-hint"]}>
                                Ограничение времени на один ход (15-300 секунд)
                            </div>
                        </div>

                        <div className={styles["timer-group"]}>
                            <label className={styles["timer-label"]}>
                                <span className={styles["timer-label-text"]}>Время на расстановку</span>
                                <div className={styles["timer-input-wrapper"]}>
                                    <input 
                                        type="number" 
                                        name="movementTime"
                                        value={formData.movementTime}
                                        onChange={handleChange}
                                        min={15}
                                        max={300}
                                        step={5}
                                        className={styles["timer-input"]}
                                        disabled={isBanned}
                                    />
                                    <span className={styles["timer-unit"]}>сек</span>
                                </div>
                            </label>
                            <div className={styles["timer-hint"]}>
                                Ограничение времени на фазу расстановки артефактов (15-300 секунд)
                            </div>
                        </div>

                        <div className={styles["timer-group"]}>
                            <label className={styles["timer-label"]}>
                                <span className={styles["timer-label-text"]}>Время на выбор карты (драфт)</span>
                                <div className={styles["timer-input-wrapper"]}>
                                    <input 
                                        type="number" 
                                        name="draftTime"
                                        value={formData.draftTime}
                                        onChange={handleChange}
                                        min={15}
                                        max={300}
                                        step={5}
                                        className={styles["timer-input"]}
                                        disabled={isBanned}
                                    />
                                    <span className={styles["timer-unit"]}>сек</span>
                                </div>
                            </label>
                            <div className={styles["timer-hint"]}>
                                Ограничение времени на выбор артефакта (15-300 секунд)
                            </div>
                        </div>
                    </div>
                )}

                <button disabled={isBanned} className={styles.button} type="submit">
                    Создать лобби
                </button>
            </form>
        </div>
    );
}

export default CreateLobby;