import styles from "./LoadingScreen.module.css";

function LoadingScreen() {
    return (
        <div className={styles["loading-container"]}>
            <div className={styles["loading-content"]}>
                {/* Анимированный спиннер в виде руны */}
                <div className={styles["spinner"]}>
                    <div className={styles["spinner-ring"]}></div>
                    <div className={styles["spinner-ring"]}></div>
                    <div className={styles["spinner-ring"]}></div>
                </div>
                
                {/* Текст загрузки */}
                <h1 className={styles["loading-text"]}>Загрузка...</h1>
            </div>
        </div>
    );
}

export default LoadingScreen;