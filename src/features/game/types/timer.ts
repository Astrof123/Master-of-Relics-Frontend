export const TIMER_TYPE  = {
    DRAFT: 'draft',
    MOVEMENT: 'movement',
    TURN: 'turn'
};

export type TimerType  = typeof TIMER_TYPE [keyof typeof TIMER_TYPE];

export interface TimerState {
    active: boolean;
    timerType: TimerType | null;
    remaining: number;
    duration: number | null;
    startedAt: number | null;
}