import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import type { Lobby } from '../types/lobby';
import { LOBBY_EVENT_NAME } from '../types/lobby-events-name';
import { setCurrentLobby, setLobbies } from '../store/lobbySlice';

export const useLobbySocketProvider = () => {
    const dispatch = useDispatch();
    
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

        socketService.on(LOBBY_EVENT_NAME.LOBBY_LIST_UPDATE, handleLobbyListUpdate);
        socketService.on(LOBBY_EVENT_NAME.LOBBY_UPDATE, handleLobbyUpdate);

        return () => {
            socketService.off(LOBBY_EVENT_NAME.LOBBY_LIST_UPDATE, handleLobbyListUpdate);
        };
    }, [dispatch]);

    return {};
};