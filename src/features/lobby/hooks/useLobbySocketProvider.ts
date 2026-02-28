import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import type { Lobby } from '../types/lobby';
import { LOBBY_EVENT_NAME } from '../types/lobby-events-name';
import { setCurrentLobby, setLobbies } from '../store/lobbySlice';
import { useNavigate } from 'react-router-dom';

export const useLobbySocketProvider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("Лобби провайдер")

        const handleLobbyListUpdate = (data: Lobby[]) => {
            dispatch(setLobbies(data))
            console.log('Получены лобби:', data);
        };

        const handleLobbyUpdate = (data: Lobby) => {
            dispatch(setCurrentLobby(data))
            console.log('Получено текущее лобби:', data);
        };

        const handleGameStartedUpdate = (gameId: string) => {
            navigate(`/game/${gameId}`)
            console.log('Игра началась');
        };

        socketService.on(LOBBY_EVENT_NAME.LOBBY_LIST_UPDATE, handleLobbyListUpdate);
        socketService.on(LOBBY_EVENT_NAME.LOBBY_UPDATE, handleLobbyUpdate);
        socketService.on(LOBBY_EVENT_NAME.GAME_STARTED, handleGameStartedUpdate);

        return () => {
            socketService.off(LOBBY_EVENT_NAME.LOBBY_LIST_UPDATE, handleLobbyListUpdate);
            socketService.off(LOBBY_EVENT_NAME.LOBBY_UPDATE, handleLobbyUpdate);
            socketService.off(LOBBY_EVENT_NAME.GAME_STARTED, handleGameStartedUpdate);
        };
    }, [dispatch]);

    return {};
};