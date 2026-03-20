import { useAppSelector, type RootState } from "@/app/store";
import styles from "./CurrentLobby.module.css"
import clsx from "clsx";
import { LOBBYSTATETYPE, type Lobby, type LobbyPlayer } from "../../types/lobby";
import { useLobbySocket } from "../../hooks/useLobbySocket";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CurrentLobby() {
    const navigate = useNavigate();
    const currentLobby = useAppSelector((state: RootState) => state.lobby.currentLobby)
    const user = useAppSelector((state: RootState) => state.auth.user)
    const {
        leaveLobby,
        toggleReadyLobby,
        deleteLobby,
        startGame,
        enterGame
    } = useLobbySocket();

    useEffect(() => {
        if (currentLobby === null) {
            navigate("/");
        }
    }, [currentLobby, navigate]);

    const getStateClass = (state: string) => {
        switch(state.toLowerCase()) {
            case LOBBYSTATETYPE.WAITING:
                return styles["lobby-state-open"];
            case LOBBYSTATETYPE.PLAYING:
                return styles["lobby-state-in-game"];
            default:
                return styles["lobby-state-other"];
        }
    };

    const getStateText = (state: string) => {
        switch(state.toLowerCase()) {
            case LOBBYSTATETYPE.WAITING:
                return 'Ожидание игроков';
            case LOBBYSTATETYPE.PLAYING:
                return 'Игра началась';
            default:
                return state;
        }
    };

    const renderButtons = (lobby: Lobby) => {
        const buttons = [];
        
        if (user === null) {
            return;
        }

        const playerLobby = lobby.players[user.id]

        if (lobby.state === LOBBYSTATETYPE.WAITING) {
            if (playerLobby) {
                buttons.push(
                    <button className={clsx(styles["red-button"])} key={lobby.id + "leave"} onClick={() => leaveLobby(lobby.id)} type='button'>
                        Покинуть лобби
                    </button>
                )

                buttons.push(
                    <button
                        className={clsx(playerLobby?.isReady ? styles["red-button"] : clsx(styles["green-button"]))}
                        key={lobby.id + "toggle"} 
                        onClick={() => toggleReadyLobby(lobby.id)} 
                        type='button'
                    >
                        {playerLobby?.isReady ? <span>⏳</span> : <span>✅</span>}
                        {playerLobby?.isReady ? "Не готов" : "Готов"}
                    </button>
                )     

                const players = Object.values(lobby.players);

                if (playerLobby?.isHost && Object.keys(lobby.players).length > 1 && !players.find((player) => player.isReady === false)) {
                    buttons.push(
                        <button className={clsx(styles["green-button"])} key={lobby.id + "start"} onClick={() => startGame(lobby.id)} type='button'>
                            Начать битву
                        </button>
                    )                
                }
            }
        }
        else if (lobby.state === LOBBYSTATETYPE.PLAYING && playerLobby) {
            buttons.push(
                <button className={clsx(styles["green-button"])} key={lobby.id + "enter"} onClick={() => enterGame(lobby.id)} type='button'>
                    Войти в игру
                </button>
            )
        }

        buttons.push(
            <button className={clsx(styles["red-button"])} key={lobby.id + "delete"} onClick={() => deleteLobby(lobby.id)} type='button'>
                Удалить лобби
            </button>
        )
        return <div className={styles["lobby-actions"]}>{buttons}</div>;
    }

    if (currentLobby === null) {
        return (
            <div className={styles.container}>
                <h1 className={styles["error-message"]}>Ваше лобби не найдено</h1>
            </div>
        )
    }

    return (  
        <div className={styles.container}>
            <div key={currentLobby.id} className={styles["lobby-card"]}>
                <div className={styles["lobby-header"]}>
                    <span className={styles["lobby-name"]}>{currentLobby.name}</span>
                    <span className={clsx(styles["lobby-state"], getStateClass(currentLobby.state))}>
                        {getStateText(currentLobby.state)}
                    </span>
                </div>
                
                <div className={styles["players-list"]}>
                    <strong>Игроки ({Object.keys(currentLobby.players).length}/2)</strong>
                    <div>
                        {Object.values(currentLobby.players).map((player: LobbyPlayer) => (
                            <span 
                                key={player.id} 
                                className={clsx(
                                    styles["player-item"], 
                                    player.isHost && styles["host"]
                                )}
                            >
                                <span>{player.nickname}</span>
                                {currentLobby.state === LOBBYSTATETYPE.WAITING && (
                                    <span>{player.isReady ? "✅" : "⏳"}</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
                {renderButtons(currentLobby)}
            </div>
        </div>
    );
}

export default CurrentLobby;