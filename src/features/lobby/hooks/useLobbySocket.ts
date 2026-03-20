import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import { useAppSelector } from '@app/store';
import type { SocketCallbackResponse } from '@/features/socket/types/response';
import type { JoinHallData, StartGameData } from '../types/lobby-socket-data-responses';
import type { Lobby } from '../types/lobby';
import { LOBBY_EVENT_NAME } from '../types/lobby-events-name';
import { setCurrentLobby, setJoinedHall, setLobbies, setLeaveLobby } from '../store/lobbySlice';
import { useNavigate } from 'react-router-dom';
import { GAME_EVENT_NAME } from '@/features/game/types/socket/game-events-name';


export const useLobbySocket = () => {
    const dispatch = useDispatch();
    const isConnected = useAppSelector((state) => state.connectSocket.isConnected);
    const navigate = useNavigate();

    const joinHall = useCallback(() => {
        if (!isConnected) {
            console.warn('Нельзя присоединиться к залу игр: нет подключения');
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.JOIN_HALL, null, (response: SocketCallbackResponse<JoinHallData>) => {
            if (response.success) {
                dispatch(setJoinedHall(true));
                dispatch(setLobbies(response.data.lobbies))
                if (response.data.currentLobby !== null) {
                    dispatch(setCurrentLobby(response.data.currentLobby))
                }
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);
    

    const createLobby = useCallback((data: Partial<Lobby>) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.CREATE_LOBBY, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                console.log(response.message);
                navigate("/my-lobby")
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const startGame = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }
        console.log("Запуск игры")

        socketService.emit(GAME_EVENT_NAME.CREATE_GAME, lobbyId, (response: SocketCallbackResponse<StartGameData>) => {
            if (response.success) {
                console.log(response.message);
                navigate(`/game/${response.data.gameId}`)
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const joinLobby = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.JOIN_LOBBY, lobbyId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                console.log(response.message);
                navigate("/my-lobby")
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const deleteLobby = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.DELETE_LOBBY, lobbyId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                console.log(response.message);
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const leaveLobby = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.LEAVE_LOBBY, lobbyId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                console.log(response.message);
                dispatch(setLeaveLobby());
                navigate("/")
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const toggleReadyLobby = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.TOGGLE_READY_LOBBY, lobbyId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                console.log(response.message);
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const enterGame = useCallback((gameId: string) => {
        navigate(`/game/${gameId}`)
    }, [isConnected]);

    return {        
        joinHall,
        createLobby,
        joinLobby,
        deleteLobby,
        leaveLobby,
        toggleReadyLobby,
        startGame,
        enterGame
    };
};