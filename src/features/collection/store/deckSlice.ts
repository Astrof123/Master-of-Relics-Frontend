import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DecksData, CardData } from '../types/responses';
import { changeActiveDeck, changeDeckCards, getDecks } from './actions';


interface DeckState {
    deckData: DecksData | null;
    isLoading: boolean;
    error: string | null;
    temporaryDeckData: DecksData | null;
    isEditing: boolean;
}


const initialState: DeckState = {
    deckData: null,
    isLoading: false,
    error: null,
    temporaryDeckData: null,
    isEditing: false
};


const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        changeActiveDeckAfterResponse: (state, action: PayloadAction<number>) => {
            const currentDeck = state.deckData?.decks.find(deck => deck.isActive);
            const newActiveDeck = state.deckData?.decks.find(deck => deck.id === action.payload);

            if (currentDeck && newActiveDeck) {
                newActiveDeck.isActive = true;
                currentDeck.isActive = false;
            }
        },
        setIsEditing: (state, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;

            if (state.isEditing) {
                state.temporaryDeckData = JSON.parse(JSON.stringify(state.deckData));
            } else {
                state.temporaryDeckData = null;
            }
        },
        updateTemporaryDeckCards: (state, action: PayloadAction<{ deckId: number; cards: CardData[] }>) => {
            if (!state.temporaryDeckData) return;
            
            const deckToUpdate = state.temporaryDeckData.decks.find(deck => deck.id === action.payload.deckId);
            if (deckToUpdate) {
                deckToUpdate.cards = action.payload.cards;
            }
        },
        resetTemporaryDeck: (state) => {
            state.temporaryDeckData = null;
            state.isEditing = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDecks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDecks.fulfilled, (state, action: PayloadAction<DecksData>) => {
                state.isLoading = false;
                state.deckData = action.payload;
            })
            .addCase(getDecks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Не удалось получить колоды';
            })
            .addCase(changeActiveDeck.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeActiveDeck.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changeActiveDeck.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Не удалось поменять активную колоду';
            })
            .addCase(changeDeckCards.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeDeckCards.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changeDeckCards.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Не удалось поменять карты в колоде';
            })
    },
});

export const {
    changeActiveDeckAfterResponse,
    setIsEditing,
    updateTemporaryDeckCards,
    resetTemporaryDeck
} = deckSlice.actions;

export default deckSlice.reducer;