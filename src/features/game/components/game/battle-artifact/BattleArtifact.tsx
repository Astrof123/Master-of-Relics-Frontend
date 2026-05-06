import { ARTIFACTS } from '@/features/game/constants/artifacts';
import { ARTIFACT_STATE, type ArtifactGameState, type Line } from '@/features/game/types/state/game';
import type { EnemyArtifact } from '@/features/game/types/state/game-for-client';
import clsx from 'clsx';
import styles from "./BattleArtifact.module.css";
import { FACES } from '@/features/game/constants/faces';
import { useMemo } from 'react';
import { useCardModal } from '@/features/modal/hooks/useCardModal';
import { useAppSelector } from '@/app/store';
import { CARD_MODAL_TYPE, type OpenCardModalData } from '@/features/modal/types/modal';
import { useArtifactAnimations } from '@/features/game/hooks/useArtifactAnimations';
import { useArtifactSelection } from '@/features/game/hooks/useArtifactSelection';
import { useArtifactState } from '@/features/game/hooks/useArtifactState';
import type { ModalBattleDetails } from '@/features/modal/types/details';
import { GameHelper } from '@/features/game/helpers/game-helper';

interface BattleArtifactProps {
    artifact: ArtifactGameState | EnemyArtifact; 
    index: number; 
    line: Line;
    isYour: boolean;
}

const BattleArtifact = (props: BattleArtifactProps) => {
    const { openCardModal } = useCardModal();
    const gameState = useAppSelector(state => state.game.gameState);
    const animations = useAppSelector(state => state.animation.animations);
    const typeIndex = props.isYour ? 0 : 1;

    const { 
        showDamage, 
        showHeal, 
        animationValue, 
        isAnimating 
    } = useArtifactAnimations(props.artifact.id, animations);
    
    const { isPossibleTarget, isSelected, handleSelection } = 
        useArtifactSelection(props.artifact.id, props.isYour, typeIndex);
    
    const stateInfo = useArtifactState(props.artifact.state);

    const animationDelay = useMemo(() => `${Math.random() * 0.8}s`, []);

    const handleCardClick = () => {
        if (handleSelection()) return;

        const details: ModalBattleDetails = {
            cardForView: {
                id: props.artifact.artifactId, 
                img: ARTIFACTS[props.artifact.artifactId].imgCardNoStats 
            },
            artifactGameId: props.artifact.id,
            isYour: props.isYour,
            gameState: gameState!
        };

        const data: OpenCardModalData = {
            details: details,
            modalType: CARD_MODAL_TYPE.BATTLE,
            valueLeftTop: props.artifact.maxHp,
            valueRightTop: props.artifact.skillCost,
            isArtifact: true
        }

        openCardModal(data);
    };

    const artifactStyles = [styles.artifact];
    
    if (isAnimating) {
        if (showDamage) artifactStyles.push(styles["artifact--damage"]);
        if (showHeal) artifactStyles.push(styles["artifact--heal"]);
    }
    
    if (isSelected) {
        artifactStyles.push(styles["artifact--selected"]);
    } else if (isPossibleTarget) {
        artifactStyles.push(styles["artifact--choice"]);
        artifactStyles.push(props.isYour ? styles["artifact--choice--allies"] : styles["artifact--choice--enemy"]);
    }

    const [valueLeftTopStyles, valueRightTopStyles] = GameHelper.getStylesForCornerValues(styles, props.artifact.currentHp, props.artifact.skillCost, true);

    return (
        <div className={clsx(artifactStyles)} onClick={handleCardClick} style={{ animationDelay }}>
            <div className={clsx(props.artifact.state === ARTIFACT_STATE.BREAKEN ? styles["artifact-img--breaken"] : null)}>
                <img
                    className={clsx(styles["artifact-img"])}
                    src={ARTIFACTS[props.artifact.artifactId].imgBattle} 
                    alt={ARTIFACTS[props.artifact.artifactId].name}
                />
                <img className={clsx(styles.face)} src={FACES[props.artifact.face].img} alt={"face"} />
                <div className={clsx(styles.state, styles[stateInfo.className])}>{stateInfo.name}</div>
                <span 
                    className={clsx(valueLeftTopStyles)}>
                        {props.artifact.currentHp}
                </span>
                <span 
                    className={clsx(valueRightTopStyles)}>
                        {props.artifact.skillCost}
                </span>
            </div>
            
            {showDamage && (
                <div className={clsx(styles["damage-popup"])}>
                    <span className={clsx(styles["damage-value"])}>-{animationValue}</span>
                </div>
            )}
            
            {showHeal && (
                <div className={clsx(styles["heal-popup"])}>
                    <span className={clsx(styles["heal-value"])}>+{animationValue}</span>
                </div>
            )}
        </div>
    );
};

export default BattleArtifact;