import type { CardForView } from '@/features/game/types/card';
import { useAppDispatch, useAppSelector } from '@/app/store';
import type { ModalBattleDetails } from '../../types/details';
import { ARTIFACT_STATE, LINE } from '@/features/game/types/state/game';
import clsx from 'clsx';
import styles from "./BattleModalActions.module.css";
import { useAction } from '@/features/action/hooks/useAction';
import { EXTRA_ACTION, type ExtraAction } from '@/features/action/types/action';
import { MINIPHASE } from '@/features/game/types/state/phase';
import { activateMoving, changeLine } from '@/features/game/store/gameSlice';

interface BattleModalActionsProps {
    card: CardForView;
    details: ModalBattleDetails;
    onClose: () => void;
}

const BattleModalActions = ({ details, onClose }: BattleModalActionsProps) => {
    const dispatch = useAppDispatch();
    const movePoints = useAppSelector(state => state.game.gameState?.player.movePoints);
    const artifactState = useAppSelector(state => state.game.gameState?.player.artifacts[details.artifactGameId]);
    const gameState = useAppSelector(state => state.game.gameState);
    const { faceAction, extraAction, useSkill } = useAction();
    const movedArtifact = useAppSelector(state => state.game.movedArtifact);
    const isMoving = useAppSelector(state => state.game.isMoving);

    if (!artifactState || movePoints === undefined) {
        throw new Error("Произошла ошибка с состоянием артефакта");
    }

    const availableActions = artifactState.availableActions;

    const handleChangeLine = () => {
        dispatch(changeLine(artifactState.id));
        onClose();
    }

    const handleFaceAction = () => {
        faceAction(
            availableActions,
            details,
            onClose
        );
    }

    const handleExtraAction = (actionId: ExtraAction) => {
        if (actionId === EXTRA_ACTION.MOVE) {
            dispatch(activateMoving(details.artifactGameId))
            onClose();
            return;
        }

        extraAction(
            details.gameState.id,
            details.artifactGameId,
            actionId,
            onClose
        );
    }

    const handleUseSkillAction = (actionId: ExtraAction) => {
        useSkill(
            availableActions,
            details.gameState.id,
            details.artifactGameId,
            actionId,
            onClose
        );
    }

    const otherLine = gameState!.player.temporaryArtifacts[details.artifactGameId].line === LINE.FRONT ? LINE.BACK : LINE.FRONT;
    const countArtifactsOtherLine = Object.values(gameState!.player.temporaryArtifacts).filter(a => a.line === otherLine).length;

    return (
        <>
            <h2 className={clsx(styles["main-title"])}>
                Выберите действие:
            </h2>
            <div className={clsx(styles["button-wrapper"])}>
                {(gameState?.miniPhase === MINIPHASE.MOVEMENT || details.artifactGameId == movedArtifact) && (
                    <button 
                        onClick={handleChangeLine}
                        disabled={countArtifactsOtherLine >= gameState!.constants.maxCountArtifactsOnLine || gameState!.player.isReady}
                        className={clsx(styles.action)}
                    >
                        Сменить линию
                    </button>
                )}
                {gameState?.miniPhase !== MINIPHASE.MOVEMENT && !isMoving && (
                    <>
                        {movePoints <= 0 && (
                            <span>У вас закончились очки действия</span>
                        )}
                        {artifactState.state === ARTIFACT_STATE.READY_TO_USE && availableActions.face !== null && (
                            <button 
                                onClick={handleFaceAction}
                                disabled={movePoints <= 0}
                                className={clsx(styles.action)}
                            >
                                {availableActions.face.description}
                            </button>
                        )}
                        {availableActions.skills.map((action) => (
                            <button
                                key={action.id}
                                onClick={() => handleUseSkillAction(action.id)}
                                className={clsx(styles.action, styles["action--skill"])}
                                disabled={movePoints <= 0}
                            >
                                {action.description}
                            </button>                    
                        ))}
                        {availableActions.extraActions.map((action) => (
                            <button
                                key={action.id}
                                className={clsx(styles.action, styles["action--extra"])}
                                onClick={() => handleExtraAction(action.id)}
                            >
                                {action.description}
                            </button>                    
                        ))}                    
                    </>  
                )}
 
            </div>
        </>
    );
};

export default BattleModalActions;