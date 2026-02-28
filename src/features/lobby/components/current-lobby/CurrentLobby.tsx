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


    const renderButtons = (lobby: Lobby) => {
        const buttons = [];
        
        if (user === null) {
            return;
        }

        const playerLobby = lobby.players[user.id]

        if (lobby.state === LOBBYSTATETYPE.WAITING) {
            if (playerLobby) {
                buttons.push(
                    <button key={lobby.id + "leave"} onClick={() => leaveLobby(lobby.id)} type='button'>Выйти</button>
                )

                buttons.push(
                    <button key={lobby.id + "toggle"} onClick={() => toggleReadyLobby(lobby.id)} type='button'>{playerLobby?.isReady ? "Не готов" : "Готов"}</button>
                )     

                const players = Object.values(lobby.players);

                if (playerLobby?.isHost && Object.keys(lobby.players).length > 1 && !players.find((player) => player.isReady === false)) {
                    buttons.push(
                        <button key={lobby.id + "start"} onClick={() => startGame(lobby.id)} type='button'>Начать</button>
                    )                
                }
            }
        }
        else if (lobby.state === LOBBYSTATETYPE.PLAYING && playerLobby) {
            buttons.push(
                <button key={lobby.id + "enter"} onClick={() => enterGame(lobby.id)} type='button'>Войти в игру</button>
            )
        }

        buttons.push(
            <button key={lobby.id + "delete"} onClick={() => deleteLobby(lobby.id)} type='button'>Удалить</button>
        )
        return <>{buttons}</>;
    }

    if (currentLobby === null) {
        return (
            <h1>Ваше лобби не найдено</h1>
        )
    }


    return (  
        <>
            <div key={currentLobby.id} className={styles["lobby-card"]}>
                <div className={styles["lobby-name"]}>{currentLobby.name}</div>
                
                <div className={clsx(styles["lobby-state"], getStateClass(currentLobby.state))}>
                    {currentLobby.state}
                </div>
                
                <div className={styles["players-list"]}>
                    Игроки:
                    <div>
                        {Object.values(currentLobby.players).map((player: LobbyPlayer) => (
                            <span key={player.id} className={styles["player-item"]}>
                                {player.nickname}
                                {currentLobby.state === LOBBYSTATETYPE.WAITING && (
                                    player.isReady ? "✅️" : "❌"
                                )}
                                
                            </span>
                        ))}
                    </div>
                </div>
                {renderButtons(currentLobby)}
            </div>
        </>
    );
}

export default CurrentLobby;