import styles from "./LoadingScreen.module.css";

function LoadingScreen() {
    return (
        <div className={styles["loading-container"]}>
            <div className={styles["loading-content"]}>
                <div className={styles["spinner"]}>
                    <div className={styles["spinner-ring"]}></div>
                    <div className={styles["spinner-ring"]}></div>
                    <div className={styles["spinner-ring"]}></div>
                </div>
                
                <h1 className={styles["loading-text"]}>Загрузка...</h1>
            </div>
        </div>
    );
}

export default LoadingScreen;