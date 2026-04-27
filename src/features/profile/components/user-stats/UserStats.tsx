import type { UserProfile } from "../../types/responses";
import styles from "./UserStats.module.css";
import TwoSwordsImg from "@assets/icons/two-swords.png";

interface UserStatsProps {
    profile: UserProfile;
}

const UserStats = (props: UserStatsProps) => {
    return (  
        <div className={styles["stats-section"]}>
            <h3 className={styles["section-title"]}>
                <img className={styles["title-icon"]} src={TwoSwordsImg} alt="" />
                Боевая статистика
            </h3>
            <div className={styles["stats-grid"]}>
                <div className={styles["stat-card"]}>
                    <span className={styles["stat-value"]}>{props.profile.stats.totalGames}</span>
                    <span className={styles["stat-label"]}>Всего битв</span>
                </div>
                <div className={styles["stat-card"]}>
                    <span className={styles["stat-value"]}>{props.profile.stats.wins}</span>
                    <span className={styles["stat-label"]}>Побед</span>
                </div>
                <div className={styles["stat-card"]}>
                    <span className={styles["stat-value"]}>
                        {props.profile.stats.totalGames > 0 
                            ? Math.round((props.profile.stats.wins / props.profile.stats.totalGames) * 100) 
                            : 0}%
                    </span>
                    <span className={styles["stat-label"]}>Процент побед</span>
                </div>
                <div className={styles["stat-card"]}>
                    <span className={styles["stat-value"]}>{props.profile.stats.winSeries}</span>
                    <span className={styles["stat-label"]}>Текущая серия</span>
                </div>
            </div>
        </div>
    );
}

export default UserStats;