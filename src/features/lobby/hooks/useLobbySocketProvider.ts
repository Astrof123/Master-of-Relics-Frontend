import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import type { Lobby } from '../types/lobby';
import { LOBBY_EVENT_NAME } from '../types/lobby-events-name';
import { setCurrentLobby, setLobbies, setOnlinePlayers, setInvitations } from '../store/lobbySlice';
import { useNavigate } from 'react-router-dom';
import type { GetLobbyListData, LobbyInvitation } from '../types/lobby-socket-data-responses';
import type { SocketCallbackResponse } from '@/features/socket/types/response';

export const useLobbySocketProvider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const getLobbies = useCallback(() => {
        socketService.emit(LOBBY_EVENT_NAME.GET_LOBBY_LIST, null, (response: SocketCallbackResponse<GetLobbyListData>) => {
            if (response.success) {
                dispatch(setLobbies(response.data.lobbies))
                console.log('Получены лобби:', response.data.lobbies);
            } else {
                toast.error(response.message);
            }
        });
    }, []);

    useEffect(() => {
        const handleLobbyListUpdated = () => {
            getLobbies()
        };

        const handleOnlinePlayersUpdated = (data: number) => {
            dispatch(setOnlinePlayers(data))
        };

        const handleYouInvited = (data: LobbyInvitation[]) => {
            console.log("Получены приглашения", data)
            dispatch(setInvitations(data))
        };
        
        const handleLobbyUpdate = (data: Lobby) => {
            dispatch(setCurrentLobby(data))
            console.log('Получено текущее лобби:', data);
        };

        const handleGameStartedUpdate = (gameId: string) => {
            navigate(`/game/${gameId}`)
            console.log('Игра началась');
        };

        socketService.on(LOBBY_EVENT_NAME.YOU_INVITED, handleYouInvited);
        socketService.on(LOBBY_EVENT_NAME.COUNT_ONLINE_PLAYERS_UPDATED, handleOnlinePlayersUpdated);
        socketService.on(LOBBY_EVENT_NAME.LOBBY_LIST_UPDATED, handleLobbyListUpdated);
        socketService.on(LOBBY_EVENT_NAME.LOBBY_UPDATE, handleLobbyUpdate);
        socketService.on(LOBBY_EVENT_NAME.GAME_STARTED, handleGameStartedUpdate);

        return () => {
            socketService.off(LOBBY_EVENT_NAME.YOU_INVITED, handleYouInvited);
            socketService.off(LOBBY_EVENT_NAME.COUNT_ONLINE_PLAYERS_UPDATED, handleOnlinePlayersUpdated);
            socketService.off(LOBBY_EVENT_NAME.LOBBY_LIST_UPDATED, handleLobbyListUpdated);
            socketService.off(LOBBY_EVENT_NAME.LOBBY_UPDATE, handleLobbyUpdate);
            socketService.off(LOBBY_EVENT_NAME.GAME_STARTED, handleGameStartedUpdate);
        };
    }, [dispatch]);

    return {};
};