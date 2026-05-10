import type { ConnectionGame } from "../state/game";
import type { GameForClient } from "../state/game-for-client";
import type { TimerType } from "../timer";


export interface JoinGameData {
    gameState: GameForClient;
    playersOnline: Record<string, ConnectionGame>;
    timer: TimerSyncData | null;
}

export interface GetGameStateData {
    gameState: GameForClient;
}

export interface TimerSyncData {
    timerType: TimerType;
    active: boolean;
    remaining: number;
    duration: number | null;
    startedAt: number | null;
    timeOnServer: number;
}

export interface GameNotificationData {
    receiverId: string;
    text: string;
    level: NotificationLevel
}

export const NOTIFICATION_LEVEL  = {
    WARNING: "warning",
    INFO: "info"
};

export type NotificationLevel  = typeof NOTIFICATION_LEVEL [keyof typeof NOTIFICATION_LEVEL];