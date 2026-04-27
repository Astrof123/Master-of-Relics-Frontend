import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Lobby } from '../types/lobby';
import type { FriendForInvite, LobbyInvitation } from '../types/lobby-socket-data-responses';


interface LobbySocketState {
    isJoinedHall: boolean
    lobbies: Lobby[],
    currentLobby: Lobby|null;
    onlinePlayers: number;
    invitations: LobbyInvitation[];
    friendsForInvite: FriendForInvite[];
}

const initialState: LobbySocketState = {
    isJoinedHall: false,
    lobbies: [],
    currentLobby: null,
    onlinePlayers: 0,
    invitations: [],
    friendsForInvite: []
};

const lobbySocketSlice = createSlice({
    name: 'lobbySocket',
    initialState,
    reducers: {
        setJoinedHall: (state, action: PayloadAction<boolean>) => {
            state.isJoinedHall = action.payload;
        },  
        setLobbies: (state, action: PayloadAction<Lobby[]>) => {
            state.lobbies = action.payload;
        },
        setInvitations: (state, action: PayloadAction<LobbyInvitation[]>) => {
            state.invitations = action.payload;
        },
        setOnlinePlayers: (state, action: PayloadAction<number>) => {
            state.onlinePlayers = action.payload;
        },
        setCurrentLobby: (state, action: PayloadAction<Lobby>) => {
            state.currentLobby = action.payload;
        },
        setFriendsForInvite: (state, action: PayloadAction<FriendForInvite[]>) => {
            state.friendsForInvite = action.payload;
        },
        setLeaveLobby: (state) => {
            state.friendsForInvite = [];
            state.currentLobby = null;
        },
    },
});

export const {
    setLobbies,
    setJoinedHall,
    setCurrentLobby,
    setLeaveLobby,
    setOnlinePlayers,
    setInvitations,
    setFriendsForInvite
} = lobbySocketSlice.actions;

export default lobbySocketSlice.reducer;