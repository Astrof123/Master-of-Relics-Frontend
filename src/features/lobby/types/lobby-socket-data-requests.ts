export interface InviteFriendData {
    lobbyId: string;
    friendId: number;
}

export interface UpdateOptionsLobbyData {
    lobbyId: string;
    withTimers: boolean;
    timerTurn: number | null;
    timerMovement: number | null;
    timerDraft: number | null;
}

export interface CreateLobbyData {
    name: string;
    isPrivate: boolean;
    withTimers: boolean;
    timerTurn: number;
    timerMovement: number;
    timerDraft: number;
}
