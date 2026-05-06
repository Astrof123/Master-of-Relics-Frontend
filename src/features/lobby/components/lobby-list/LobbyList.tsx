import { useLobbySocket } from '@/features/lobby/hooks/useLobbySocket';
import { LOBBYSTATETYPE, type Lobby, type LobbyPlayer } from '@/features/lobby/types/lobby';
import clsx from 'clsx';
import styles from './LobbyList.module.css';
import { useAppSelector } from '@/app/store';
import TwoSwords from "@assets/icons/two-swords.png";
import WaitImg from "@assets/icons/wait.png";
import { Link } from 'react-router-dom';

interface LobbyListProps {
    searchText: string;
}

const LobbyList = (props: LobbyListProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const isJoinedHall = useAppSelector((state) => state.lobby.isJoinedHall);
    const lobbies = useAppSelector((state) => state.lobby.lobbies);
    const isBanned = !!user?.bannedUntil && new Date(user.bannedUntil) > new Date();

    const { joinLobby } = useLobbySocket();

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
        if (user === null || lobby.isPrivate || isBanned) return null;

        const playerLobby = lobby.players[user.id];
        const canJoin = !playerLobby && Object.keys(lobby.players).length < 2;

        return (
            <div className={styles["lobby-actions"]}>
                {canJoin && (
                    <button onClick={() => joinLobby(lobby.id)} type="button">
                        Присоединиться
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {isJoinedHall ? (
                <div>
                    <h2 className={styles.subtitle}>
                        <img src={TwoSwords} alt="" />
                        Доступные лобби
                    </h2>

                    {lobbies.length > 0 ? (
                        <div className={styles["lobbies-list"]}>
                            {lobbies.filter(l => l.name.includes(props.searchText)).map((lobby: Lobby) => (
                                <div key={lobby.id} className={clsx(styles["lobby-card"], lobby.isPrivate ? styles["lobby-card--private"] : null)}>
                                    <div className={styles["lobby-header"]}>
                                        <span className={styles["lobby-name"]}>{lobby.name}</span>
                                        <div className={styles["lobby-info"]}>
                                            {lobby.isPrivate && (
                                                <span className={styles["private-text"]}>Приватное</span>
                                            )}
                                            <span className={clsx(styles["lobby-state"], getStateClass(lobby.state))}>
                                                {lobby.state === LOBBYSTATETYPE.WAITING ? 'Ожидание' : 
                                                lobby.state === LOBBYSTATETYPE.PLAYING ? 'В игре' : lobby.state}
                                            </span>
                                            <span className={clsx(styles["lobby-timer-state"])}>
                                                {lobby.options.withTimers ? 'Таймер: Вкл' : "Таймер: Выкл"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles["players-list"]}>
                                        <strong>Игроки ({Object.keys(lobby.players).length}/2):</strong>
                                        <div>
                                            {Object.values(lobby.players).map((player: LobbyPlayer) => (
                                                <Link key={player.id} className={styles["player-item-link"]} to={`/profile/${player.id}`} > 
                                                    <div className={styles["player-item"]} >
                                                            <span className={styles["player-item-nickname"]}>
                                                                {player.nickname}
                                                            </span>
                                                            <img className={styles["player-item-icon"]} src={player.isReady ? TwoSwords : WaitImg} />                                                
                                                    </div>
                                                </Link>
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
                <h2 className={styles["error-message"]}>
                    Вы не в сети! Подключитесь к серверу
                </h2>
            )}
        </div>
    );
};

export default LobbyList;