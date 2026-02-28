import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import { setGameState, setPlayersOnline } from '../store/gameSlice';
import { GAME_EVENT_NAME } from '../types/game-events-name';
import type { ConnectionGame } from '../types/game';
import { useAppSelector } from '@/app/store';
import type { SocketCallbackResponse } from '@/features/socket/types/response';
import type { GetGameStateData } from '../types/game-socket-data-responses';

export const useGameSocketProvider = () => {
    const dispatch = useDispatch();
    
    const getGameState = useCallback((gameId: string) => {
        socketService.emit(GAME_EVENT_NAME.GET_GAME_STATE, gameId, (response: SocketCallbackResponse<GetGameStateData>) => {
            if (response.success) {
                dispatch(setGameState(response.data.gameState));
                console.log('Получено новое состояние игры:', response.data.gameState);
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, []);
    
    useEffect(() => {
        console.log("Гейм провайдер")

        const handleGameStateUpdated = (gameId: string) => {
            getGameState(gameId);
        };

        const handlePlayersOnlineUpdated = (data: Record<string, ConnectionGame>) => {
            dispatch(setPlayersOnline(data))
            console.log('Получено состояние подключения игроков:', data);
        };

        socketService.on(GAME_EVENT_NAME.GAME_STATE_UPDATED, handleGameStateUpdated);
        socketService.on(GAME_EVENT_NAME.PLAYERS_ONLINE_UPDATED, handlePlayersOnlineUpdated);

        return () => {
            socketService.off(GAME_EVENT_NAME.GAME_STATE_UPDATED, handleGameStateUpdated);
            socketService.off(GAME_EVENT_NAME.PLAYERS_ONLINE_UPDATED, handlePlayersOnlineUpdated);
        };
    }, [dispatch]);

    return {};
};