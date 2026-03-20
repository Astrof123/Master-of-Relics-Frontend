import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AnimationData } from '../types/game/animation';


export interface AnimationState {
    animations: AnimationData[];
}


const initialState: AnimationState = {
    animations: []
};

const animationSlice = createSlice({
    name: 'animation',
    initialState,
    reducers: {
        pushAnimation: (state, action: PayloadAction<AnimationData>) => {
            state.animations.push(action.payload);
        },
        shiftAnimation: (state) => {
            state.animations.shift();
        },
        setDefault: (state) => {
            state.animations = initialState.animations;
        },
    },
});

export const {
    pushAnimation,
    shiftAnimation,
    setDefault,
} = animationSlice.actions;

export default animationSlice.reducer;