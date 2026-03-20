import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import { setGameState, setPlayersOnline } from '../store/gameSlice';
import type { ConnectionGame } from '../types/state/game';
import { useAppSelector } from '@/app/store';
import type { SocketCallbackResponse } from '@/features/socket/types/response';
import { GAME_EVENT_NAME } from '../types/socket/game-events-name';
import type { GetGameStateData } from '../types/socket/game-socket-data-responses';
import { ACTION_EVENT_NAME } from '../../action/types/action-events-name';
import type { AnimationData } from '../types/game/animation';
import { pushAnimation } from '../store/animationSlice';

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
        const handleGameStateUpdated = (gameId: string) => {
            getGameState(gameId);
        };

        const handleNewAnimation = (data: AnimationData) => {
            dispatch(pushAnimation(data));
        };

        const handlePlayersOnlineUpdated = (data: Record<string, ConnectionGame>) => {
            dispatch(setPlayersOnline(data));
            console.log('Получено состояние подключения игроков:', data);
        };

        socketService.on(GAME_EVENT_NAME.GAME_STATE_UPDATED, handleGameStateUpdated);
        socketService.on(GAME_EVENT_NAME.PLAYERS_ONLINE_UPDATED, handlePlayersOnlineUpdated);
        socketService.on(ACTION_EVENT_NAME.ANIMATION, handleNewAnimation);

        return () => {
            socketService.off(GAME_EVENT_NAME.GAME_STATE_UPDATED, handleGameStateUpdated);
            socketService.off(GAME_EVENT_NAME.PLAYERS_ONLINE_UPDATED, handlePlayersOnlineUpdated);
            socketService.off(ACTION_EVENT_NAME.ANIMATION, handleNewAnimation);
        };
    }, [dispatch]);

    return {};
};