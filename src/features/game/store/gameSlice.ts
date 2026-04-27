import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LINE, type ArtifactGameState, type ConnectionGame } from '../types/state/game';
import type { GameForClient } from '../types/state/game-for-client';
import type { TimerSyncData } from '../types/socket/game-socket-data-responses';

interface ReorderArtifactsPayload {
    front: string[];
    back: string[];
}


interface GameSocketState {
    gameState: GameForClient|null;
    playersOnline: Record<string, ConnectionGame>;
    isMoving: boolean;
    movedArtifact: string | null;
    timer: TimerSyncData | null;
}

const initialState: GameSocketState = {
    gameState: null,
    playersOnline: {},
    isMoving: false,
    movedArtifact: null,
    timer: null
};

const gameSocketSlice = createSlice({
    name: 'gameSocket',
    initialState,
    reducers: {
        setTimer: (state, action: PayloadAction<TimerSyncData | null>) => {
            state.timer = action.payload;
        },
        setTimerRemaining: (state, action: PayloadAction<number>) => {
            if (state.timer) {
                state.timer.remaining = action.payload;
            }
        },
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
        activateMoving: (state, action: PayloadAction<string>) => {
            state.movedArtifact = action.payload;
            state.isMoving = true
        },
        deactivateMoving: (state) => {
            state.movedArtifact = null;
            state.isMoving = false;
            Object.keys(state.gameState!.player.artifacts).forEach((artifactId) => {
                state.gameState!.player.temporaryArtifacts[artifactId].position = state.gameState!.player.artifacts[artifactId].position;
                state.gameState!.player.temporaryArtifacts[artifactId].line = state.gameState!.player.artifacts[artifactId].line;
            })
        },
        reorderArtifacts: (state, action: PayloadAction<ReorderArtifactsPayload>) => {
            const { front, back } = action.payload;
            const newArtifacts: Record<string, ArtifactGameState> = {};
            
            let index = 0;
            front.forEach(id => {
                if (state.gameState!.player.temporaryArtifacts[id]) {
                    newArtifacts[id] = state.gameState!.player.temporaryArtifacts[id];
                    newArtifacts[id].position = index;

                    index++;
                }
            });
            
            index = 0;
            back.forEach(id => {
                if (state.gameState!.player.temporaryArtifacts[id]) {
                    newArtifacts[id] = state.gameState!.player.temporaryArtifacts[id];
                    newArtifacts[id].position = index;

                    index++;
                }
            });
            
            state.gameState!.player.temporaryArtifacts = newArtifacts;
        },
        changeLine: (state, action: PayloadAction<string>) => {
            const artifacts = state.gameState!.player.temporaryArtifacts;
            const artifactInsert = artifacts[action.payload];
            const otherLine = artifactInsert.line === LINE.FRONT ? LINE.BACK : LINE.FRONT;
            const positionInsert = Object.values(artifacts).filter(a => a.line === otherLine).length

            for (const [_, artifact] of Object.entries(artifacts)) {
                if (artifact.position > artifactInsert.position && artifact.line === artifactInsert.line) {
                    artifact.position -= 1;
                }
            }
            
            artifactInsert.position = positionInsert;
            artifactInsert.line = otherLine;    
        },
    },
});

export const {
    setGameState,
    setPlayersOnline,
    setDraftedArtifact,
    reorderArtifacts,
    changeLine,
    activateMoving,
    deactivateMoving,
    setTimer,
    setTimerRemaining
} = gameSocketSlice.actions;

export default gameSocketSlice.reducer;