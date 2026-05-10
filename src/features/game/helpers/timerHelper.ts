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

    init(dispatch: AppDispatch) {
        this.dispatch = dispatch;
    }

    setOnExpiredCallback(callback: () => void) {
        this.onExpiredCallback = callback;
    }

    private clearTimerInterval() {
        if (this.intervalRef) {
            clearInterval(this.intervalRef);
            this.intervalRef = null;
        }
    }

    private getActualRemaining(serverRemaining: number, serverTime: number): number {
        const clientTime = Date.now();
        const elapsed = (clientTime - serverTime) / 1000;

        return Math.max(0, Math.floor(serverRemaining - elapsed));
    }

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
                this.clearTimerInterval();
                
                if (this.dispatch) {
                    this.dispatch(setTimer({
                        ...this.currentTimerState,
                        active: false,
                        remaining: 0,
                    }));
                }
                
                if (this.onExpiredCallback) {
                    this.onExpiredCallback();
                }
                
                this.currentTimerState = null;
                return;
            }

            if (newRemaining !== this.currentTimerState.remaining) {
                this.currentTimerState = {
                    ...this.currentTimerState,
                    remaining: newRemaining,
                };
                
                if (this.dispatch) {
                    this.dispatch(setTimerRemaining(newRemaining));
                }
            }
        }, 1000);
    }
    startTimer(timerData: TimerSyncData): void {
        
        if (!this.dispatch) {
            return;
        }

        this.stopTimer();
        const actualRemaining = this.getActualRemaining(timerData.remaining, timerData.timeOnServer);

        if (actualRemaining <= 0) {
            this.dispatch(setTimer(null));
            if (this.onExpiredCallback) {
                this.onExpiredCallback();
            }
            return;
        }

        this.currentTimerState = {
            ...timerData,
            remaining: actualRemaining,
            active: true,
        };

        this.dispatch(setTimer(this.currentTimerState));

        this.startLocalCountdown();
    }

    syncTimer(timerData: TimerSyncData): void {
        
        if (!this.dispatch) {
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

        const needRestart = this.currentTimerState && 
            Math.abs(this.currentTimerState.remaining - actualRemaining) > 2;

        this.currentTimerState = newTimerState;
        this.dispatch(setTimer(newTimerState));

        if (needRestart) {
            this.clearTimerInterval();
            this.startLocalCountdown();
        }
    }

    stopTimer(): void {
        this.clearTimerInterval();
        this.currentTimerState = null;
        
        if (this.dispatch) {
            this.dispatch(setTimer(null));
        }
    }

    getCurrentTimer(): TimerSyncData | null {
        return this.currentTimerState;
    }
    isActive(): boolean {
        return this.currentTimerState?.active || false;
    }

    getRemaining(): number {
        return this.currentTimerState?.remaining || 0;
    }
}