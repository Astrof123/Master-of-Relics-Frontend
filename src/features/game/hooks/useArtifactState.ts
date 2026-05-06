import { ARTIFACT_STATE, type ArtifactState } from "../types/state/game";

export const useArtifactState = (state: ArtifactState) => {
    const getStateStyles = () => {
        switch (state) {
            case ARTIFACT_STATE.READY_TO_USE:
                return { className: 'state--ready', name: 'Готов' };
            case ARTIFACT_STATE.COOLDOWN:
                return { className: 'state--cooldown', name: 'Перезарядка' };
            case ARTIFACT_STATE.STUNNED:
                return { className: 'state--stunned', name: 'Оглушен' };
            case ARTIFACT_STATE.ROOTED:
                return { className: 'state--rooted', name: 'Оцепенение' };
            case ARTIFACT_STATE.DREAM:
                return { className: 'state--dreamed', name: 'Во сне' };
            case ARTIFACT_STATE.BREAKEN:
                return { className: 'state--breaken', name: 'Сломан' };
            default:
                return { className: '', name: '' };
        }
    };

    return getStateStyles();
};