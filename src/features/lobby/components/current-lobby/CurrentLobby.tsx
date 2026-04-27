import { useAppSelector, type RootState } from "@/app/store";
import styles from "./CurrentLobby.module.css"
import clsx from "clsx";
import { LOBBYSTATETYPE, type LobbyPlayer } from "../../types/lobby";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SwordsImg from "@assets/icons/two-swords.png";
import WaitImg from "@assets/icons/wait.png";
import CrownImg from "@assets/icons/crown.png";
import LobbyCode from "../lobby-code/LobbyCode";
import LobbyButtons from "../lobby-buttons/LobbyButtons";
import InviteFriends from "../invite-friends/InviteFriends";
import LobbySettings from "../lobby-settings/LobbySettings";
import LobbySettingsView from "../lobby-settings-view/LobbySettingsView";

function CurrentLobby() {
    const navigate = useNavigate();
    const currentLobby = useAppSelector((state: RootState) => state.lobby.currentLobby)
    const [editingOptions, setEditingOptions] = useState(false);

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

    const getIsPrivateClass = (isPrivate: boolean) => {
        switch(isPrivate) {
            case true:
                return styles["lobby-private--yes"];
            case false:
                return styles["lobby-private--no"];
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

    if (currentLobby === null) {
        return (
            <div className={styles.container}>
                <h1 className={styles["error-message"]}>Ваше лобби не найдено</h1>
            </div>
        )
    }

    return (  
        <div className={styles.container}>
            <div className={styles["lobby-header"]}>
                <span className={styles["lobby-name"]}>{currentLobby.name}</span>
                <div className={styles["lobby-info"]}>
                    <span className={clsx(styles["lobby-private"], getIsPrivateClass(currentLobby.isPrivate))}>
                        {currentLobby.isPrivate ? "Приватное" : "Публичное"}
                    </span>                        
                    <span className={clsx(styles["lobby-state"], getStateClass(currentLobby.state))}>
                        {getStateText(currentLobby.state)}
                    </span>
                </div>
            </div>
            {editingOptions ? (
                <LobbySettings onSetEditingOptions={setEditingOptions} editingOptions={editingOptions} lobby={currentLobby} />
            ) : (
                <LobbySettingsView lobby={currentLobby} />
            )}
            <div className={styles["second-block"]}>
                <div className={styles["players-list"]}>
                    <strong>Игроки ({Object.keys(currentLobby.players).length}/2)</strong>
                    <div>
                        {Object.values(currentLobby.players).map((player: LobbyPlayer) => (
                            <Link key={player.id} className={styles["player-item-link"]} to={`/profile/${player.id}`} >
                                <div 
                                    className={clsx(
                                        styles["player-item"], 
                                        player.isHost && styles["host"]
                                    )}
                                >
                                    <span className={clsx(styles["player-item-nickname"])}>{player.nickname}</span>
                                    {currentLobby.state === LOBBYSTATETYPE.WAITING && (
                                        <img src={player.isReady ? SwordsImg : WaitImg} className={clsx(styles["player-item-icon"])}/>
                                    )}
                                    {player.isHost && (
                                        <img src={CrownImg} className={clsx(styles["player-item-icon"])}/>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <LobbyCode currentLobby={currentLobby} />
            </div>
            <LobbyButtons editingOptions={editingOptions} onSetEditingOptions={setEditingOptions} lobby={currentLobby} />
            {Object.keys(currentLobby.players).length === 1 && (
                <div className={styles["invite-friends"]}>
                    <InviteFriends lobbyId={currentLobby.id} />
                </div>
            )}
        </div>
    );
}

export default CurrentLobby;