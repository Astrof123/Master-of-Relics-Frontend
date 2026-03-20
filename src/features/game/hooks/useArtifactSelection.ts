import { useCallback } from 'react';
import { useAppSelector } from '@/app/store';
import { useDispatch } from 'react-redux';
import { setSelectedTargets } from '@/features/game/store/choiceSlice';
import type { SelectFaceTarget } from '@/features/game/types/game/select';

export const useArtifactSelection = (artifactGameId: string, isYour: boolean, typeIndex: number) => {
    const dispatch = useDispatch();
    const isChoice = useAppSelector(state => state.choice.isChoice);
    const possibleTargets = useAppSelector(state => state.choice.possibleTargets);
    const selectedTargets = useAppSelector(state => state.choice.selectedTargets);

    const isPossibleTarget = possibleTargets[typeIndex]?.includes(artifactGameId) || false;
    const isSelected = selectedTargets[typeIndex]?.includes(artifactGameId) || false;

    const handleSelection = useCallback(() => {
        if (!isChoice || !isPossibleTarget) return false;

        const select: SelectFaceTarget = {
            targetArtifactGameId: artifactGameId,
            type: isYour ? "ALLIED" : "ENEMY"
        };

        dispatch(setSelectedTargets(select));

        return true;
    }, [isChoice, isPossibleTarget, artifactGameId, isYour, dispatch]);

    return { isPossibleTarget, isSelected, handleSelection };
};