import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Lobby } from '../types/lobby';


interface LobbySocketState {
    isJoinedHall: boolean
    lobbies: Lobby[],
    currentLobby: Lobby|null
}

const initialState: LobbySocketState = {
    isJoinedHall: false,
    lobbies: [],
    currentLobby: null
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
        setCurrentLobby: (state, action: PayloadAction<Lobby>) => {
            state.currentLobby = action.payload;
        },
        setLeaveLobby: (state) => {
            state.currentLobby = null;
        },
    },
});

export const {
    setLobbies,
    setJoinedHall,
    setCurrentLobby,
    setLeaveLobby

} = lobbySocketSlice.actions;

export default lobbySocketSlice.reducer;