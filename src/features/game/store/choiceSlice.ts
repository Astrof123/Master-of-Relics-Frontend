import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SelectFaceTarget } from '../types/game/select';

interface ChoiceState {
    attackerArtifactId: string | null;
    isChoice: boolean;
    possibleTargets: string[][],
    selectedTargets: string[][],
    countTargetAny: number;
    countTargetAllies: number;
    countTargetEnemies: number;
    typeAction: "extra_action" | "skill" | "spell" | "face" | null;
    actionId: string | null;
}

const initialState: ChoiceState = {
    attackerArtifactId: null,
    isChoice: false,
    possibleTargets: [[], []],
    selectedTargets: [[], []],
    countTargetAny: 0,
    countTargetAllies: 0,
    countTargetEnemies: 0,
    typeAction: null,
    actionId: null
};

const choiceSlice = createSlice({
    name: 'choice',
    initialState,
    reducers: {
        setChoice: (state, action: PayloadAction<Omit<ChoiceState, 'selectedTargets'>>) => {
            state.attackerArtifactId = action.payload.attackerArtifactId
            state.isChoice = action.payload.isChoice;
            state.possibleTargets = action.payload.possibleTargets;
            state.countTargetAny = action.payload.countTargetAny;
            state.countTargetAllies = action.payload.countTargetAllies;
            state.countTargetEnemies = action.payload.countTargetEnemies;
            state.typeAction = action.payload.typeAction;
            state.actionId = action.payload.actionId;
        },
        setDefault: (state) => {
            state.attackerArtifactId = initialState.attackerArtifactId
            state.isChoice = initialState.isChoice;
            state.possibleTargets = initialState.possibleTargets;
            state.selectedTargets = initialState.selectedTargets;
            state.countTargetAny = initialState.countTargetAny;
            state.countTargetAllies = initialState.countTargetAllies;
            state.countTargetEnemies = initialState.countTargetEnemies;
            state.typeAction = initialState.typeAction;
            state.actionId = initialState.actionId;
        },
        setSelectedTargets: (state, action: PayloadAction<SelectFaceTarget>) => {
            const typeIndex = action.payload.type === "ALLIED" ? 0 : 1;
            let list = state.selectedTargets[typeIndex];

            if (list.includes(action.payload.targetArtifactGameId)) {
                state.selectedTargets[typeIndex] = list.filter(id => id !== action.payload.targetArtifactGameId);
            }
            else {
                list.push(action.payload.targetArtifactGameId);
            }
        },
    },
});

export const {
    setChoice,
    setDefault,
    setSelectedTargets
} = choiceSlice.actions;

export default choiceSlice.reducer;