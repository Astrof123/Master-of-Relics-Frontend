import type { PickArtifactData } from "@/features/game/types/draft/draft-evens-data";
import type { DRAFT_EVENT_NAME } from "@/features/game/types/draft/draft-events-name";
import type { ExtraActionData, ToggleReadyMovementData, UseFaceData, UseSkillData, UseSpellData } from "@/features/action/types/action-evens-data";
import type { ACTION_EVENT_NAME } from "@/features/action/types/action-events-name";
import type { AnimationData } from "@/features/game/types/game/animation";
import type { GAME_EVENT_NAME } from "@/features/game/types/socket/game-events-name";
import type { ConnectionGame } from "@/features/game/types/state/game";
import type { Lobby } from "@/features/lobby/types/lobby";
import { LOBBY_EVENT_NAME } from "@/features/lobby/types/lobby-events-name";
import type { SocketCallbackResponse } from "./response";
import type { GameNotificationData, JoinGameData, TimerSyncData } from "@/features/game/types/socket/game-socket-data-responses";
import type { FriendForInvite, GetLobbyListData, JoinHallData, LobbyInvitation } from "@/features/lobby/types/lobby-socket-data-responses";
import type { CreateLobbyData, InviteFriendData, UpdateOptionsLobbyData } from "@/features/lobby/types/lobby-socket-data-requests";

export interface ClientToServerEvents {
    [LOBBY_EVENT_NAME.GET_LOBBY_LIST]: (data: null, callback: (response: SocketCallbackResponse<GetLobbyListData>) => void) => void;
    [LOBBY_EVENT_NAME.GET_FRIENDS_FOR_INVITE]: (data: null, callback: (response: SocketCallbackResponse<FriendForInvite[]>) => void) => void;
    [LOBBY_EVENT_NAME.JOIN_HALL]: (data: null, callback: (response: SocketCallbackResponse<JoinHallData>) => void) => void;
    [LOBBY_EVENT_NAME.CREATE_LOBBY]: (data: CreateLobbyData, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [LOBBY_EVENT_NAME.UPDATE_OPTIONS]: (data: UpdateOptionsLobbyData, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [LOBBY_EVENT_NAME.JOIN_LOBBY]: (lobbyId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [LOBBY_EVENT_NAME.JOIN_LOBBY_BY_CODE]: (code: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [LOBBY_EVENT_NAME.JOIN_LOBBY_BY_INVITATION]: (invitationId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [LOBBY_EVENT_NAME.DELETE_LOBBY]: (lobbyId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [LOBBY_EVENT_NAME.LEAVE_LOBBY]: (lobbyId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [LOBBY_EVENT_NAME.TOGGLE_READY_LOBBY]: (lobbyId: string, callback: (response: SocketCallbackResponse<Lobby>) => void) => void;
    [LOBBY_EVENT_NAME.INVITE_FRIEND]: (data: InviteFriendData, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [LOBBY_EVENT_NAME.DECLINE_INVITATION]: (data: LobbyInvitation, callback: (response: SocketCallbackResponse<null>) => void) => void;
    
    [GAME_EVENT_NAME.JOIN_GAME]: (gameId: string, callback: (response: SocketCallbackResponse<JoinGameData>) => void) => void;
    
    [GAME_EVENT_NAME.CREATE_GAME]: (lobbyId: string, callback: (response: SocketCallbackResponse<{ gameId: string }>) => void) => void;
    [DRAFT_EVENT_NAME.PICK_ARTIFACT]: (data: PickArtifactData, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [DRAFT_EVENT_NAME.TOGGLE_READY_DRAFT]: (gameId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.USE_FACE]: (data: UseFaceData, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.END_TURN]: (gameId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.GIVE_UP]: (gameId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.OFFER_DRAW]: (gameId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.CANCEL_DRAW]: (gameId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.EXTRA_ACTION]: (data: ExtraActionData, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.END_ROUND]: (gameId: string, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.USE_SKILL]: (data: UseSkillData, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.USE_SPELL]: (data: UseSpellData, callback: (response: SocketCallbackResponse<null>) => void) => void;
    [ACTION_EVENT_NAME.TOGGLE_READY_MOVEMENT]: (data: ToggleReadyMovementData, callback: (response: SocketCallbackResponse<null>) => void) => void;
}

export interface ServerToClientEvents {
    [LOBBY_EVENT_NAME.YOU_INVITED]: (data: LobbyInvitation[]) => void;
    [LOBBY_EVENT_NAME.COUNT_ONLINE_PLAYERS_UPDATED]: (data: number) => void;
    [LOBBY_EVENT_NAME.LOBBY_LIST_UPDATED]: () => void;
    [LOBBY_EVENT_NAME.LOBBY_UPDATE]: (data: Lobby) => void;
    [GAME_EVENT_NAME.NEW_NOTIFICATION]: (data: GameNotificationData) => void;
    [GAME_EVENT_NAME.GAME_STATE_UPDATED]: (gameId: string) => void;
    [GAME_EVENT_NAME.TIMER_START]: (data: TimerSyncData) => void;
    [GAME_EVENT_NAME.TIMER_EXPIRED]: () => void;
    [GAME_EVENT_NAME.TIMER_SYNC]: (data: TimerSyncData) => void;
    [GAME_EVENT_NAME.PLAYERS_ONLINE_UPDATED]: (data: Record<string, ConnectionGame>) => void;
    [LOBBY_EVENT_NAME.GAME_STARTED]: (lobbyId: string) => void;
    [ACTION_EVENT_NAME.ANIMATION]: (data: AnimationData) => void;

    'connected': (data: { socketId: string; userId?: string }) => void;
    'user-connected': (data: { socketId: string; userId?: string }) => void;
    'disconnected': (reason: string) => void;
    'error': (error: { code: string; message: string }) => void;
    'pong': () => void;
}

export type SocketEvent = keyof ClientToServerEvents | keyof ServerToClientEvents;

export type SocketEventPayload<E extends SocketEvent> = 
  E extends keyof ServerToClientEvents 
    ? Parameters<ServerToClientEvents[E]>[0]
    : E extends keyof ClientToServerEvents
    ? Parameters<ClientToServerEvents[E]>[0]
    : never;