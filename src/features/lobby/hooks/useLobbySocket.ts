import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import { useAppSelector } from '@app/store';
import type { SocketCallbackResponse } from '@/features/socket/types/response';
import type { FriendForInvite, JoinHallData, LobbyInvitation, StartGameData } from '../types/lobby-socket-data-responses';
import type { Lobby } from '../types/lobby';
import { LOBBY_EVENT_NAME } from '../types/lobby-events-name';
import { setCurrentLobby, setJoinedHall, setLobbies, setLeaveLobby, setOnlinePlayers, setInvitations, setFriendsForInvite } from '../store/lobbySlice';
import { useNavigate } from 'react-router-dom';
import { GAME_EVENT_NAME } from '@/features/game/types/socket/game-events-name';
import type { CreateLobbyData, InviteFriendData, UpdateOptionsLobbyData } from '../types/lobby-socket-data-requests';
import { toast } from 'sonner';


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
                dispatch(setOnlinePlayers(response.data.onlinePlayers))
                dispatch(setInvitations(response.data.invitations))
                if (response.data.currentLobby !== null) {
                    dispatch(setCurrentLobby(response.data.currentLobby))
                }
            } else {
                toast.error(response.message);
                toast.error(response.message);
            }
        });
    }, [isConnected]);
    

    const createLobby = useCallback((data: CreateLobbyData) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.CREATE_LOBBY, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                toast.success(response.message);
                navigate("/my-lobby")
            } else {
                toast.error(response.message);
                toast.error(response.message);
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
                toast.success(response.message);
                navigate(`/game/${response.data.gameId}`)
            } else {
                toast.error(response.message);
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const startGameWithBot = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }
        console.log("Запуск игры")

        socketService.emit(GAME_EVENT_NAME.CREATE_GAME_WITH_BOT, lobbyId, (response: SocketCallbackResponse<StartGameData>) => {
            if (response.success) {
                toast.success(response.message);
                navigate(`/game/${response.data.gameId}`)
            } else {
                toast.error(response.message);
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const joinLobby = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.JOIN_LOBBY, lobbyId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                toast.success(response.message);
                navigate("/my-lobby")
            } else {
                toast.error(response.message);
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const joinLobbyByCode = useCallback((code: string) => {
        if (!isConnected) {
            return;
        }
        socketService.emit(LOBBY_EVENT_NAME.JOIN_LOBBY_BY_CODE, code, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                toast.success(response.message);
                navigate("/my-lobby")
            } else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const joinLobbyByInvitation = useCallback((invitationId: string) => {
        if (!isConnected) {
            return;
        }
        socketService.emit(LOBBY_EVENT_NAME.JOIN_LOBBY_BY_INVITATION, invitationId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                toast.success(response.message);
                navigate("/my-lobby")
            } else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const deleteLobby = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.DELETE_LOBBY, lobbyId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const leaveLobby = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.LEAVE_LOBBY, lobbyId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                dispatch(setLeaveLobby());
                navigate("/")
            } else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const toggleReadyLobby = useCallback((lobbyId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.TOGGLE_READY_LOBBY, lobbyId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
            } else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const inviteFriend = useCallback((data: InviteFriendData) => {
        return new Promise<void>((resolve, reject) => {
            socketService.emit(LOBBY_EVENT_NAME.INVITE_FRIEND, data, (response: SocketCallbackResponse<null>) => {
                if (response.success) {
                    resolve();
                } else {
                    toast.error(response.message);
                    reject(new Error(response.message));
                }
            });
        });
    }, [isConnected]);

    const declineInvitation = useCallback((data: LobbyInvitation) => {
        socketService.emit(LOBBY_EVENT_NAME.DECLINE_INVITATION, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
            } else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const getFriendsForInvite = useCallback(() => {
        socketService.emit(LOBBY_EVENT_NAME.GET_FRIENDS_FOR_INVITE, null, (response: SocketCallbackResponse<FriendForInvite[]>) => {
            if (response.success) {
                dispatch(setFriendsForInvite(response.data))
            } else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const updateOptionsLobby = useCallback((data: UpdateOptionsLobbyData) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(LOBBY_EVENT_NAME.UPDATE_OPTIONS, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
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
        enterGame,
        joinLobbyByCode,
        inviteFriend,
        declineInvitation,
        getFriendsForInvite,
        joinLobbyByInvitation,
        updateOptionsLobby,
        startGameWithBot
    };
};