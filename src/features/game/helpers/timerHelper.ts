import type { TimerSyncData } from '../types/socket/game-socket-data-responses';
import type { AppDispatch } from '@/app/store';
import { setTimer, setTimerRemaining } from '../store/gameSlice';

export class TimerService {
    private static instance: TimerService;
    private dispatch: AppDispatch | null = null;
    private intervalRef: ReturnType<typeof setInterval> | null = null;
    private currentTimerState: TimerSyncData | null = null;
    private onExpiredCallback: (() => void) | null = null;

    private constructor() {}

    static getInstance(): TimerService {
        if (!TimerService.instance) {
            TimerService.instance = new TimerService();
        }
        return TimerService.instance;
    }

    // Инициализация с dispatch из Redux
    init(dispatch: AppDispatch) {
        this.dispatch = dispatch;
    }

    // Установка колбэка на истечение таймера
    setOnExpiredCallback(callback: () => void) {
        this.onExpiredCallback = callback;
    }

    // Очистка интервала
    private clearTimerInterval() {
        if (this.intervalRef) {
            clearInterval(this.intervalRef);
            this.intervalRef = null;
        }
    }

    // Вычисление актуального оставшегося времени с учётом задержки
    private getActualRemaining(serverRemaining: number, serverTime: number): number {
        const clientTime = Date.now();
        const elapsed = (clientTime - serverTime) / 1000;

        console.log(elapsed, serverRemaining)

        return Math.max(0, Math.floor(serverRemaining - elapsed));
    }

    // Запуск локального обратного отсчёта
    private startLocalCountdown() {
        this.clearTimerInterval();

        if (!this.currentTimerState || !this.currentTimerState.active) {
            return;
        }

        this.intervalRef = setInterval(() => {
            if (!this.currentTimerState || !this.currentTimerState.active) {
                this.clearTimerInterval();
                return;
            }

            let newRemaining: number;

            newRemaining = Math.max(0, this.currentTimerState.remaining - 1);

            if (newRemaining <= 0) {
                // Таймер истёк
                this.clearTimerInterval();
                
                if (this.dispatch) {
                    this.dispatch(setTimer({
                        ...this.currentTimerState,
                        active: false,
                        remaining: 0,
                    }));
                }
                
                // Вызываем колбэк истечения
                if (this.onExpiredCallback) {
                    this.onExpiredCallback();
                }
                
                this.currentTimerState = null;
                return;
            }

            // Обновляем состояние только если изменилось
            if (newRemaining !== this.currentTimerState.remaining) {
                this.currentTimerState = {
                    ...this.currentTimerState,
                    remaining: newRemaining,
                };
                
                if (this.dispatch) {
                    this.dispatch(setTimerRemaining(newRemaining));
                }
            }
        }, 1000); // Обновляем каждую секунду
    }

    // Запуск нового таймера
    startTimer(timerData: TimerSyncData): void {
        console.log('TimerService: Starting timer', timerData);
        
        if (!this.dispatch) {
            console.error('TimerService: Dispatch not initialized');
            return;
        }

        // Очищаем старый таймер если есть
        this.stopTimer();
        const actualRemaining = this.getActualRemaining(timerData.remaining, timerData.timeOnServer);

        if (actualRemaining <= 0) {
            console.log('TimerService: Timer already expired');
            this.dispatch(setTimer(null));
            if (this.onExpiredCallback) {
                this.onExpiredCallback();
            }
            return;
        }

        // Сохраняем состояние
        this.currentTimerState = {
            ...timerData,
            remaining: actualRemaining,
            active: true,
        };

        // Сохраняем в Redux
        this.dispatch(setTimer(this.currentTimerState));

        // Запускаем локальный отсчёт
        this.startLocalCountdown();
    }

    // Синхронизация таймера (периодически вызывается с сервера)
    syncTimer(timerData: TimerSyncData): void {
        console.log('TimerService: Syncing timer', timerData);
        
        if (!this.dispatch) {
            console.error('TimerService: Dispatch not initialized');
            return;
        }

        if (!timerData.active) {
            this.stopTimer();
            this.dispatch(setTimer(null));
            return;
        }

        const clientNow = Date.now();
        const serverStartedAt = timerData.startedAt || clientNow;
        const actualRemaining = this.getActualRemaining(timerData.remaining, serverStartedAt);

        if (actualRemaining <= 0) {
            this.stopTimer();
            this.dispatch(setTimer(null));
            if (this.onExpiredCallback) {
                this.onExpiredCallback();
            }
            return;
        }

        const newTimerState = {
            ...timerData,
            remaining: actualRemaining,
            initialRemaining: timerData.remaining,
            startedAt: serverStartedAt,
            active: true,
        };

        // Проверяем, нужно ли перезапускать (если расхождение больше 2 секунд)
        const needRestart = this.currentTimerState && 
            Math.abs(this.currentTimerState.remaining - actualRemaining) > 2;

        this.currentTimerState = newTimerState;
        this.dispatch(setTimer(newTimerState));

        if (needRestart) {
            console.log('TimerService: Restarting due to desync');
            this.clearTimerInterval();
            this.startLocalCountdown();
        }
    }

    // Остановка таймера
    stopTimer(): void {
        console.log('TimerService: Stopping timer');
        this.clearTimerInterval();
        this.currentTimerState = null;
        
        if (this.dispatch) {
            this.dispatch(setTimer(null));
        }
    }

    // Получение текущего состояния таймера
    getCurrentTimer(): TimerSyncData | null {
        return this.currentTimerState;
    }

    // Проверка, активен ли таймер
    isActive(): boolean {
        return this.currentTimerState?.active || false;
    }

    // Оставшееся время
    getRemaining(): number {
        return this.currentTimerState?.remaining || 0;
    }
}