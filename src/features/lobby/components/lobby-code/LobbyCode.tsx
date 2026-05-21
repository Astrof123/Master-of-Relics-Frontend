import { useState } from "react";
import type { Lobby } from "../../types/lobby";
import styles from "./LobbyCode.module.css";
import clsx from "clsx";

interface LobbyCodeProps {
    currentLobby: Lobby
}

const LobbyCode = (props: LobbyCodeProps) => {
    const [showCode, setShowCode] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyCode = async () => {
        if (props.currentLobby?.code) {
            try {
                await navigator.clipboard.writeText(props.currentLobby.code);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            } catch (err) {
                console.error('Не удалось скопировать код');
            }
        }
    };

    return (
        <div className={styles["code-container"]}>
            <div className={styles["code-header"]}>
                {/* <img src={KeyImg} className={styles["code-icon"]} /> */}
                <span className={styles["code-label"]}>Код для приглашения</span>
                <button 
                    className={styles["code-visibility-btn"]}
                    onClick={() => setShowCode(!showCode)}
                    title={showCode ? "Скрыть код" : "Показать код"}
                >
                    {showCode ? 'Скрыть код' : 'Показать код'}
                </button>
            </div>
            <div className={styles["code-wrapper"]}>
                <div className={styles["code-value"]}>
                    {showCode ? props.currentLobby.code : '*'.repeat(props.currentLobby.code?.length || 6)}
                </div>
                <button 
                    className={clsx(styles["code-copy-btn"], copySuccess && styles["code-copy-btn--success"])}
                    onClick={handleCopyCode}
                    title="Копировать код"
                >
                    {copySuccess ? 'Скопировано' : 'Копировать'}
                </button>
            </div>
        </div>
    )
}

export default LobbyCode;