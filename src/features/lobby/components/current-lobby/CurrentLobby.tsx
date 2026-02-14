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
        deleteLobby
    } = useLobbySocket();


    useEffect(() => {
        if (currentLobby === null) {
            navigate("/");
        }
    }, [currentLobby, navigate]);

    const getStateClass = (state: string) => {
        switch(state.toLowerCase()) {
            case LOBBYSTATETYPE.WAITING:
                return styles.lobbyStateOpen;
            case LOBBYSTATETYPE.PLAYING:
                return styles.lobbyStateInGame;
            default:
                return styles.lobbyStateOther;
        }
    };


    const renderButtons = (lobby: Lobby) => {
        const buttons = [];
        
        if (user === null) {
            return;
        }

        const playerLobby = lobby.players[user.id]
        if (playerLobby) {
            buttons.push(
                <button key={lobby.id + "leave"} onClick={() => leaveLobby(lobby.id)} type='button'>Выйти</button>
            )

            buttons.push(
                <button key={lobby.id + "toggle"} onClick={() => toggleReadyLobby(lobby.id)} type='button'>{playerLobby?.isReady ? "Не готов" : "Готов"}</button>
            )     
            if (playerLobby?.isHost && Object.keys(lobby.players).length > 1) {
                buttons.push(
                    <button key={lobby.id + "start"} type='button'>Начать</button>
                )                
            }
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
            <div key={currentLobby.id} className={styles.lobbyCard}>
                <div className={styles.lobbyName}>{currentLobby.name}</div>
                
                <div className={clsx(styles.lobbyState, getStateClass(currentLobby.state))}>
                    {currentLobby.state}
                </div>
                
                <div className={styles.playersList}>
                    Игроки:
                    <div>
                        {Object.values(currentLobby.players).map((player: LobbyPlayer) => (
                            <span key={player.id} className={styles.playerItem}>
                                {player.nickname}
                                {player.isReady ? "✅️" : "❌"}
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