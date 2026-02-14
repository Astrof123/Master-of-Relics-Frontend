import type { Lobby } from "@/features/lobby/types/lobby";
import { LOBBY_EVENT_NAME } from "@/features/lobby/types/lobby-events-name";

export interface ClientToServerEvents {
    
    [LOBBY_EVENT_NAME.JOIN_HALL]: (data: null, callback: Function) => void;
    [LOBBY_EVENT_NAME.CREATE_LOBBY]: (data: Partial<Lobby>, callback: Function) => void;
    [LOBBY_EVENT_NAME.JOIN_LOBBY]: (lobbyId: string, callback: Function) => void;
    [LOBBY_EVENT_NAME.DELETE_LOBBY]: (lobbyId: string, callback: Function) => void;
    [LOBBY_EVENT_NAME.LEAVE_LOBBY]: (lobbyId: string, callback: Function) => void;
    [LOBBY_EVENT_NAME.TOGGLE_READY_LOBBY]: (lobbyId: string, callback: Function) => void;
}


export interface ServerToClientEvents {
    [LOBBY_EVENT_NAME.LOBBY_LIST_UPDATE]: (data: Lobby[]) => void;
    [LOBBY_EVENT_NAME.LOBBY_UPDATE]: (data: Lobby) => void;




    'connected': (data: { socketId: string; userId?: string }) => void;
    'user-connected': (data: { socketId: string; userId?: string }) => void;
    'disconnected': (reason: string) => void;
    'error': (error: { code: string; message: string }) => void;
    'pong': () => void;
    
}


export type SocketEvent = 
  | keyof ClientToServerEvents 
  | keyof ServerToClientEvents;


export type SocketEventPayload<E extends SocketEvent> = 
  E extends keyof ServerToClientEvents 
    ? Parameters<ServerToClientEvents[E]>[0]
    : E extends keyof ClientToServerEvents
    ? Parameters<ClientToServerEvents[E]>[0]
    : never;
