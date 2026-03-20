import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ConnectionGame } from '../types/state/game';
import type { GameForClient } from '../types/state/game-for-client';

interface GameSocketState {
    gameState: GameForClient|null,
    playersOnline: Record<string, ConnectionGame>,
}

const initialState: GameSocketState = {
    gameState: null,
    playersOnline: {},
};

const gameSocketSlice = createSlice({
    name: 'gameSocket',
    initialState,
    reducers: {
        setGameState: (state, action: PayloadAction<GameForClient>) => {
            state.gameState = action.payload;
            console.log(action.payload)
        },
        setPlayersOnline: (state, action: PayloadAction<Record<string, ConnectionGame>>) => {
            state.playersOnline = action.payload;
        },
        setDraftedArtifact: (state, action: PayloadAction<string>) => {
            if (state.gameState) {
                state.gameState.player.draft.pickedArtifact = action.payload;
            }
        },
    },
});

export const {
    setGameState,
    setPlayersOnline,
    setDraftedArtifact

} = gameSocketSlice.actions;

export default gameSocketSlice.reducer;