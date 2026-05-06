import type { Lobby } from "./lobby";

export interface JoinHallData {
    lobbies: Lobby[];
    currentLobby: Lobby|null;
    onlinePlayers: number;
    invitations: LobbyInvitation
}

export interface StartGameData {
    gameId: string;
}

export interface GetLobbyListData {
    lobbies: Lobby[]
}

export interface LobbyInvitation {
    id: string;
    lobbyId: string,
    addresseeId: string,
    requesterNickname: string;
}

export interface FriendForInvite {
    isOnline: boolean;
    friendNickname: string;
    friendId: string;
    status: InviteStatus;
}

export const INVITE_STATUS  = {
    OFFER: 'offer',
    NO_OFFER: 'no_offer',
} as const;

export type InviteStatus  = typeof INVITE_STATUS [keyof typeof INVITE_STATUS];