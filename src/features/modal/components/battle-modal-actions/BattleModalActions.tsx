import type { CardForView } from '@/features/game/types/card';
import { useAppSelector } from '@/app/store';
import type { ModalBattleDetails } from '../../types/details';
import { ARTIFACT_STATE } from '@/features/game/types/state/game';
import clsx from 'clsx';
import styles from "./BattleModalActions.module.css";
import { useAction } from '@/features/action/hooks/useAction';
import type { ExtraAction } from '@/features/action/types/action';

interface BattleModalActionsProps {
    card: CardForView;
    details: ModalBattleDetails;
    onClose: () => void;
}

const BattleModalActions = ({ details, onClose }: BattleModalActionsProps) => {
    const movePoints = useAppSelector(state => state.game.gameState?.player.movePoints);
    const artifactState = useAppSelector(state => state.game.gameState?.player.artifacts[details.artifactGameId]);
    const { faceAction, extraAction, useSkill } = useAction();

    if (!artifactState || movePoints === undefined) {
        throw new Error("Произошла ошибка с состоянием артефакта");
    }

    const availableActions = artifactState.availableActions;

    const handleFaceAction = () => {
        faceAction(
            availableActions,
            details,
            onClose
        );
    }

    const handleExtraAction = (actionId: ExtraAction) => {
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

    return (
        <>
            <h2 style={{ 
                color: '#f0e6d2', 
                textAlign: 'center', 
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                letterSpacing: '0.5px',
                borderBottom: '1px solid rgba(180, 150, 100, 0.4)',
                paddingBottom: '8px'
            }}>
                Выберите действие:
            </h2>
            <div className={clsx(styles["button-wrapper"])}>
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
            </div>
        </>
    );
};

export default BattleModalActions;