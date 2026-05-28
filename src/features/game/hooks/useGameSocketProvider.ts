import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import { deactivateMoving, setGameState, setPlayersOnline } from '../store/gameSlice';
import type { ConnectionGame } from '../types/state/game';
import type { SocketCallbackResponse } from '@/features/socket/types/response';
import { GAME_EVENT_NAME } from '../types/socket/game-events-name';
import type { GameNotificationData, GetGameStateData } from '../types/socket/game-socket-data-responses';
import { ACTION_EVENT_NAME } from '../../action/types/action-events-name';
import type { AnimationData } from '../types/game/animation';
import { pushAnimation } from '../store/animationSlice';
import { useAppSelector } from '@/app/store';
import { toast } from 'sonner';

export const useGameSocketProvider = () => {
    const dispatch = useDispatch();
    const isMoving = useAppSelector(state => state.game.isMoving);
    const gameState = useAppSelector(state => state.game.gameState);
    
    const getGameState = useCallback((gameId: string) => {
        socketService.emit(GAME_EVENT_NAME.GET_GAME_STATE, gameId, (response: SocketCallbackResponse<GetGameStateData>) => {
            if (response.success) {
                dispatch(setGameState(response.data.gameState));
                if (isMoving) {
                    dispatch(deactivateMoving());
                }

            } else {
                toast.error(response.message);
            }
        });
    }, [isMoving]);
    
    const handleTimerSync = useCallback(() => {
    }, []);

    useEffect(() => {
        const handleGameStateUpdated = (gameId: string) => {
            getGameState(gameId);
        };

        const handleNewNotification = (data: GameNotificationData) => {
            if (data.receiverId === gameState?.player.id) {
                toast.info(data.text, {
                    duration: 5000,
                    position: 'top-center',
                });
            }
        };

        const handleNewAnimation = (data: AnimationData) => {
            dispatch(pushAnimation(data));
        };

        const handlePlayersOnlineUpdated = (data: Record<string, ConnectionGame>) => {
            dispatch(setPlayersOnline(data));
        };

        socketService.on(GAME_EVENT_NAME.GAME_STATE_UPDATED, handleGameStateUpdated);
        socketService.on(GAME_EVENT_NAME.PLAYERS_ONLINE_UPDATED, handlePlayersOnlineUpdated);
        socketService.on(ACTION_EVENT_NAME.ANIMATION, handleNewAnimation);
        socketService.on(GAME_EVENT_NAME.TIMER_SYNC, handleTimerSync);
        socketService.on(GAME_EVENT_NAME.NEW_NOTIFICATION, handleNewNotification);

        return () => {
            socketService.off(GAME_EVENT_NAME.GAME_STATE_UPDATED, handleGameStateUpdated);
            socketService.off(GAME_EVENT_NAME.PLAYERS_ONLINE_UPDATED, handlePlayersOnlineUpdated);
            socketService.off(ACTION_EVENT_NAME.ANIMATION, handleNewAnimation);
            socketService.off(GAME_EVENT_NAME.TIMER_SYNC, handleTimerSync);
            socketService.off(GAME_EVENT_NAME.NEW_NOTIFICATION, handleNewNotification);
        };
    }, [dispatch, gameState]);

    return {};
};