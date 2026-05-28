import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import type { Lobby } from '../types/lobby';
import { LOBBY_EVENT_NAME } from '../types/lobby-events-name';
import { setCurrentLobby, setLobbies, setOnlinePlayers, setInvitations } from '../store/lobbySlice';
import { useNavigate } from 'react-router-dom';
import type { GetLobbyListData, LobbyInvitation } from '../types/lobby-socket-data-responses';
import type { SocketCallbackResponse } from '@/features/socket/types/response';
import { toast } from 'sonner';
import { useAppSelector } from '@/app/store';

export const useLobbySocketProvider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isConnected = useAppSelector((state) => state.connectSocket.isConnected);
    
    const getLobbies = useCallback(() => {
        socketService.emit(LOBBY_EVENT_NAME.GET_LOBBY_LIST, null, (response: SocketCallbackResponse<GetLobbyListData>) => {
            if (response.success) {
                dispatch(setLobbies(response.data.lobbies))
            } else {
                toast.error(response.message);
            }
        });
    }, []);

    useEffect(() => {
        if (!isConnected) {
            return;
        }

        const handleLobbyListUpdated = () => {
            getLobbies()
        };

        const handleOnlinePlayersUpdated = (data: number) => {
            dispatch(setOnlinePlayers(data))
        };

        const handleYouInvited = (data: LobbyInvitation[]) => {
            dispatch(setInvitations(data))
        };
        
        const handleLobbyUpdate = (data: Lobby) => {
            dispatch(setCurrentLobby(data))
        };

        const handleGameStartedUpdate = (gameId: string) => {
            navigate(`/game/${gameId}`)
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
    }, [dispatch, isConnected]);

    return {};
};