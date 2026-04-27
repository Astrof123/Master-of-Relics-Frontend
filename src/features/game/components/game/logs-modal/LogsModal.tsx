import type { GameForClient } from "@/features/game/types/state/game-for-client";
import clsx from "clsx";
import styles from "./LogsModal.module.css";
import type { LogState } from "@/features/game/types/state/game";
import { useEffect, useRef } from "react";

interface LogsModalProps {
    gameState: GameForClient
}

const LogsModal = (props: LogsModalProps) => {
    const logs = props.gameState.logs.slice(-8);

    const logsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
        }
    }, []);

    if (logs.length === 0) {
        return (
            <div className={clsx(styles["logs-modal"])}>
                <div className={styles["logs-modal-empty"]}>
                    Журнал битвы пуст
                </div>
            </div>
        );
    }

    return (
        <div className={clsx(styles["logs-modal"])} ref={logsContainerRef}>
            {logs.map((log: LogState, index: number) => {
                return (
                    <span 
                        key={"log" + index} 
                        data-type={log.type}
                    >
                        {log.text}
                    </span>
                );
            })}
        </div>
    );
}

export default LogsModal;