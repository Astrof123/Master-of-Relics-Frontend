import React from 'react';
import { useLobbySocket } from '@/features/lobby/hooks/useLobbySocket';
import { LOBBYSTATETYPE, type Lobby, type LobbyPlayer } from '@/features/lobby/types/lobby';
import clsx from 'clsx';
import styles from './LobbyList.module.css';
import { useAppSelector } from '@/app/store';

const LobbyList: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isJoinedHall = useAppSelector((state) => state.lobby.isJoinedHall);
    const lobbies = useAppSelector((state) => state.lobby.lobbies);

    const { 
        joinLobby, 
        deleteLobby
    } = useLobbySocket();

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

        if (!playerLobby && Object.keys(lobby.players).length < 2) {
            buttons.push(
                <button key={lobby.id + "join"} onClick={() => joinLobby(lobby.id)} type='button'>Присоединиться</button>
            )            
        }
        buttons.push(
            <button key={lobby.id + "delete"} onClick={() => deleteLobby(lobby.id)} type='button'>Удалить</button>
        )   

        return <>{buttons}</>;
    }


    return (
        <div className={styles.container}>
            {isJoinedHall ? (
                <div>
                    
                    <h2 className={styles.subtitle}>Доступные лобби:</h2> 

                    {lobbies.length > 0 ? (
                        <div className={styles["lobbies-list"]}>
                            {lobbies.map((lobby: Lobby) => (
                                <div key={lobby.id} className={styles["lobby-card"]}>
                                    <div className={styles["lobby-name"]}>{lobby.name}</div>
                                    
                                    <div className={clsx(styles["lobby-state"], getStateClass(lobby.state))}>
                                        {lobby.state}
                                    </div>
                                    
                                    <div className={styles["players-list"]}>
                                        Игроки:
                                        <div>
                                            {Object.values(lobby.players).map((player: LobbyPlayer) => (
                                                <span key={player.id} className={styles["player-item"]}>
                                                    {player.nickname}
                                                    {player.isReady ? "✅️" : "❌"}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {renderButtons(lobby)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles["empty-message"]}>
                            Ни одного лобби ещё не создано! Станьте первым
                        </div>
                    )}
                </div>
            ) : (
                <h2 className={styles["error-message"]}>Вы не в сети!</h2> 
            )}
        </div>
    );
};

export default LobbyList;