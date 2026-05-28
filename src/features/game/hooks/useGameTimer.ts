import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/store';
import socketService from '../../socket/socket';
import { GAME_EVENT_NAME } from '../types/socket/game-events-name';
import type { TimerSyncData } from '../types/socket/game-socket-data-responses';
import { TimerService } from '../helpers/timerHelper';

export const useGameTimer = () => {
    const timerState = useAppSelector(state => state.game.timer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        TimerService.getInstance().init(dispatch);
    }, [dispatch]);

    const handleTimerStart = useCallback((data: TimerSyncData) => {
        TimerService.getInstance().startTimer(data);
    }, []);

    const handleTimerSync = useCallback((data: TimerSyncData) => {
        TimerService.getInstance().syncTimer(data);
    }, []);

    const handleTimerExpired = useCallback((data: { timerType: string }) => {
        TimerService.getInstance().stopTimer();
    }, []);

    useEffect(() => {
        socketService.on(GAME_EVENT_NAME.TIMER_START, handleTimerStart);
        socketService.on(GAME_EVENT_NAME.TIMER_SYNC, handleTimerSync);
        socketService.on(GAME_EVENT_NAME.TIMER_EXPIRED, handleTimerExpired);

        return () => {
            socketService.off(GAME_EVENT_NAME.TIMER_START, handleTimerStart);
            socketService.off(GAME_EVENT_NAME.TIMER_SYNC, handleTimerSync);
            socketService.off(GAME_EVENT_NAME.TIMER_EXPIRED, handleTimerExpired);
        };
    }, [handleTimerStart, handleTimerSync, handleTimerExpired]);

    const formatTime = useCallback((seconds: number): string => {
        if (seconds < 0) seconds = 0;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    return {
        timer: timerState,
        formattedTime: timerState ? formatTime(timerState.remaining) : '0:00',
        isActive: timerState?.active || false,
        timerType: timerState?.timerType || null,
        remaining: timerState?.remaining || 0,
    };
};