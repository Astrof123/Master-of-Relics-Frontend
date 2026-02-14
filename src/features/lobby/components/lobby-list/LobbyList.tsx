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
                        <div className={styles.lobbiesList}>
                            {lobbies.map((lobby: Lobby) => (
                                <div key={lobby.id} className={styles.lobbyCard}>
                                    <div className={styles.lobbyName}>{lobby.name}</div>
                                    
                                    <div className={clsx(styles.lobbyState, getStateClass(lobby.state))}>
                                        {lobby.state}
                                    </div>
                                    
                                    <div className={styles.playersList}>
                                        Игроки:
                                        <div>
                                            {Object.values(lobby.players).map((player: LobbyPlayer) => (
                                                <span key={player.id} className={styles.playerItem}>
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
                        <div className={styles.emptyMessage}>
                            Ни одного лобби ещё не создано! Станьте первым
                        </div>
                    )}
                </div>
            ) : (
                <h2 className={styles.errorMessage}>Вы не в сети!</h2> 
            )}
        </div>
    );
};

export default LobbyList;