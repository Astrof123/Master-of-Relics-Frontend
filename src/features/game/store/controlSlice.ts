import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ControlState {
    canUseSpells: boolean;
    canUseActions: boolean;
}

const initialState: ControlState = {
    canUseSpells: true,
    canUseActions: true
};

const controlSlice = createSlice({
    name: 'controlSlice',
    initialState,
    reducers: {
        setControls: (state, action: PayloadAction<ControlState>) => {
            state.canUseSpells = action.payload.canUseSpells;
            state.canUseActions = action.payload.canUseActions;
        },
    },
});

export const {
    setControls
} = controlSlice.actions;

export default controlSlice.reducer;