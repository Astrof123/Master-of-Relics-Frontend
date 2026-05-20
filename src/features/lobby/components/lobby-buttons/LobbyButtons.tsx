import clsx from "clsx";
import styles from "./LobbyButtons.module.css";
import { LOBBYSTATETYPE, type Lobby } from "../../types/lobby";
import { useAppSelector, type RootState } from "@/app/store";
import { useLobbySocket } from "../../hooks/useLobbySocket";

interface LobbyButtonsProps {
    lobby: Lobby;
    editingOptions: boolean;
    onSetEditingOptions: (value: boolean) => void
}

const LobbyButtons = (props: LobbyButtonsProps) => {
    const user = useAppSelector((state: RootState) => state.auth.user)

    const {
        leaveLobby,
        toggleReadyLobby,
        startGame,
        enterGame,
        startGameWithBot
    } = useLobbySocket();

    const buttons = [];
    
    if (user === null) {
        return;
    }

    const handleOptionsClick = () => {
        props.onSetEditingOptions(!props.editingOptions);
    }

    const playerLobby = props.lobby.players[user.id]

    if (props.lobby.state === LOBBYSTATETYPE.WAITING) {
        if (playerLobby) {
            buttons.push(
                <button className={clsx(styles["red-button"])} key={props.lobby.id + "leave"} onClick={() => leaveLobby(props.lobby.id)} type='button'>
                    Покинуть лобби
                </button>
            )

            buttons.push(
                <button
                    className={clsx(playerLobby?.isReady ? styles["red-button"] : styles["green-button"])}
                    key={props.lobby.id + "toggle"} 
                    onClick={() => toggleReadyLobby(props.lobby.id)} 
                    type='button'
                >
                    {playerLobby?.isReady ? "Не готов" : "Готов"}
                </button>
            )     

            const players = Object.values(props.lobby.players);

            if (playerLobby?.isHost && Object.keys(props.lobby.players).length > 1 && !players.find((player) => player.isReady === false)) {
                buttons.push(
                    <button className={clsx(styles["green-button"])} key={props.lobby.id + "start"} onClick={() => startGame(props.lobby.id)} type='button'>
                        Начать битву
                    </button>
                )                
            }
            if (playerLobby?.isHost) {
                buttons.push(
                    <button 
                        className={clsx(props.editingOptions ? styles["red-button"] : styles["green-button"])} 
                        key={props.lobby.id + "options"} 
                        onClick={() => handleOptionsClick()} 
                        type='button'
                    >
                        {props.editingOptions ? "Отмена настройки" : "Обновить настройки"}
                    </button>
                )                
            }
            if (Object.keys(props.lobby.players).length === 1) {
                buttons.push(
                    <button className={clsx(styles["green-button"])} key={props.lobby.id + "start-with-bot"} onClick={() => startGameWithBot(props.lobby.id)} type='button'>
                        Начать с ботом
                    </button>
                )                
            }
        }
    }
    else if (props.lobby.state === LOBBYSTATETYPE.PLAYING && playerLobby) {
        buttons.push(
            <button className={clsx(styles["green-button"])} key={props.lobby.id + "enter"} onClick={() => enterGame(props.lobby.id)} type='button'>
                Войти в игру
            </button>
        )
    }
    return <div className={styles["lobby-actions"]}>{buttons}</div>;
}

export default LobbyButtons;