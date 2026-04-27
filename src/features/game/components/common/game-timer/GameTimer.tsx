import { useGameTimer } from '@/features/game/hooks/useGameTimer';
import ClockImg from "@assets/icons/wait.png";
import styles from "./GameTimer.module.css";


export const GameTimer = () => {
    const {
        formattedTime,
    } = useGameTimer();

    return (
        <div className={styles["timer-wrapper"]}>
            <img src={ClockImg} className={styles["timer-icon"]} />
            <span className={styles["timer"]}>
                {formattedTime}
            </span>
        </div>
    );
};