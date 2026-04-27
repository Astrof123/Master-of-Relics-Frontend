import clsx from "clsx";
import type { Lobby } from "../../types/lobby";
import styles from "./LobbySettingsView.module.css"
import TimerImg from "@assets/icons/wait.png";

interface LobbySettingsViewProps {
    lobby: Lobby;
}

const LobbySettingsView = (props: LobbySettingsViewProps) => {
    const options = props.lobby.options;

    return (
        <div className={styles["options-wrapper"]}>
            <label className={clsx(styles.label, styles["checkbox-label"])}>
                <div className={styles["checkbox-label-inner-wrapper"]}>
                    <span className={styles["checkbox-text"]}>
                        <img className={styles["checkbox-icon"]} src={TimerImg} alt="" />
                        Игра с таймерами:
                    </span>
                    <span className={styles["timer-text"]}>{options.withTimers ? "Вкл" : "Выкл"}</span>
                </div>
            </label>
            <label className={clsx(styles.label, styles["checkbox-label"])}>
                <div className={styles["checkbox-label-inner-wrapper"]}>
                    <span className={styles["checkbox-text"]}>
                        Время на ход:
                    </span>
                    <span className={styles["timer-text"]}>{options.withTimers ? options.timerTurn + " сек" : "Выкл"}</span>
                </div>
            </label>
            <label className={clsx(styles.label, styles["checkbox-label"])}>
                <div className={styles["checkbox-label-inner-wrapper"]}>
                    <span className={styles["checkbox-text"]}>
                        Время на расстановку:
                    </span>
                    <span className={styles["timer-text"]}>{options.withTimers ? options.timerMovement + " сек" : "Выкл"}</span>
                </div>
            </label>
            <label className={clsx(styles.label, styles["checkbox-label"])}>
                <div className={styles["checkbox-label-inner-wrapper"]}>
                    <span className={styles["checkbox-text"]}>
                        Время на выбор карты (драфт):
                    </span>
                    <span className={styles["timer-text"]}>{options.withTimers ? options.timerDraft + " сек" : "Выкл"}</span>
                </div>
            </label>
        </div>
    );
}

export default LobbySettingsView;