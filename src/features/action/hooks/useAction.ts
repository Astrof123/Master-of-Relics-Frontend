import { useGameSocket } from "@/features/game/hooks/useGameSocket";
import { setChoice } from "@/features/game/store/choiceSlice";
import { type ArtifactAvailableActions, type SpellGameState } from "@/features/game/types/state/game";
import type { ModalBattleDetails } from "@/features/modal/types/details";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { ExtraAction } from "../types/action";
import type { Skill } from "@/features/game/types/game/skill";

export const useAction = () => {
    const { useFace, extraAction, useSkill, useSpell } = useGameSocket();
    const dispatch = useDispatch();
    
    const faceAction = useCallback((
        availableActions: ArtifactAvailableActions,
        details: ModalBattleDetails,
        onClose: () => void
    ) => {
        if (availableActions.face === null) {
            return
        }

        const isAttack = availableActions.face.attackTargets !== null;
        const isHeal = availableActions.face.healTargets !== null;

        if (isAttack && isHeal) {
            let countTargetAllies = 1;
            let countTargetEnemies = 1;

            if (availableActions.face.attackTargets?.length === 0) {
                let agree = confirm("Вы уверены, что хотите сделать этот ход? У вас нет целей для атаки.");

                if (agree) {
                    countTargetEnemies = 0;
                }
                else {
                    return;
                }
            }

            if (availableActions.face.healTargets?.length === 0) {
                let agree = confirm("Вы уверены, что хотите сделать этот ход? У вас нет целей для восстановления прочности.");

                if (agree) {
                    countTargetAllies = 0;
                }
                else {
                    return;
                }
            }

            if (countTargetAllies === 0 && countTargetEnemies === 0) {
                useFace({
                    gameId: details.gameState.id,
                    healTarget: null,
                    artifactGameId: details.artifactGameId,
                    attackTarget: null
                });
                onClose();
                return;
            }

            dispatch(setChoice({
                attackerArtifactId: details.artifactGameId,
                isChoice: true,
                possibleTargets: [availableActions.face.healTargets!, availableActions.face.attackTargets!],
                countTargetAny: 0,
                countTargetAllies: countTargetAllies,
                countTargetEnemies: countTargetEnemies,
                typeAction: "face",
                actionId: null
            }));
            onClose();
        }
        else if (isAttack) {
            if (availableActions.face.attackTargets?.length === 0) {
                let agree = confirm("Вы уверены, что хотите сделать этот ход? У вас нет целей для атаки.");

                if (agree) {
                    useFace({
                        gameId: details.gameState.id,
                        healTarget: null,
                        artifactGameId: details.artifactGameId,
                        attackTarget: null
                    });
                    onClose();
                    return;         
                }
                else {
                    return;
                }
            }

            dispatch(setChoice({
                attackerArtifactId: details.artifactGameId,
                isChoice: true,
                possibleTargets: [[], availableActions.face.attackTargets!],
                countTargetAny: 0,
                countTargetEnemies: 1,
                countTargetAllies: 0,
                typeAction: "face",
                actionId: null
            }));
            onClose();
            return;
        }
        else if (isHeal) {
            if (availableActions.face.healTargets?.length === 0) {
                let agree = confirm("Вы уверены, что хотите сделать этот ход? У вас нет целей для восстановления прочности.");

                if (agree) {
                    useFace({
                        gameId: details.gameState.id,
                        healTarget: null,
                        artifactGameId: details.artifactGameId,
                        attackTarget: null
                    });
                    onClose();
                    return;         
                }
                else {
                    return;
                }
            }

            dispatch(setChoice({
                attackerArtifactId: details.artifactGameId,
                isChoice: true,
                possibleTargets: [availableActions.face.healTargets!, []],
                countTargetAny: 0,
                countTargetEnemies: 0,
                countTargetAllies: 1,
                typeAction: "face",
                actionId: null
            }));
            onClose();
            return;
        }
        else {
            useFace({
                gameId: details.gameState.id,
                healTarget: null,
                artifactGameId: details.artifactGameId,
                attackTarget: null
            });
            onClose();
            return;
        }

    }, []);
    
    const useExtraAction = useCallback((
        gameId: string,
        artifactGameId: string,
        type: ExtraAction,
        onClose: () => void
    ) => {
        extraAction({
            gameId,
            artifactGameId,
            type,
            details: null
        })
        onClose();
    }, [])

    const useSkillAction = useCallback((
        availableActions: ArtifactAvailableActions,
        gameId: string,
        artifactGameId: string,
        skillId: Skill,
        onClose: () => void
    ) => {
        const skill = availableActions.skills.find((sk) => sk.id === skillId);

        if (!skill) {
            return;
        }

        const countTargetEnemy = skill.countTargetEnemy;
        const countTargetAllies = skill.countTargetAllies;
        const countTargetAny = skill.countAnyTarget;

        if (countTargetEnemy === 0 && countTargetAllies === 0 && countTargetAny === 0) {
            useSkill({
                gameId: gameId,
                artifactGameId: artifactGameId,
                skillId: skillId,
                targets: [[], []]
            });
            onClose();
            return;
        }
        else {
            dispatch(setChoice({
                attackerArtifactId: artifactGameId,
                isChoice: true,
                possibleTargets: skill.possibleTargets,
                countTargetAny: countTargetAny,
                countTargetEnemies: countTargetEnemy,
                countTargetAllies: countTargetAllies,
                typeAction: "skill",
                actionId: skillId
            }));
            onClose();
            return;
        }
    }, [])

    const useSpellAction = useCallback((
        gameId: string,
        spell: SpellGameState,
        onClose: () => void
    ) => {

        const countTargetEnemy = spell.countTargetEnemy;
        const countTargetAllies = spell.countTargetAllies;
        const countTargetAny = spell.countAnyTarget;

        if (countTargetEnemy === 0 && countTargetAllies === 0 && countTargetAny === 0) {
            useSpell({
                gameId: gameId,
                spellId: spell.id,
                targets: [[], []]
            });
            onClose();
            return;
        }
        else {
            dispatch(setChoice({
                attackerArtifactId: null,
                isChoice: true,
                possibleTargets: spell.possibleTargets,
                countTargetAny: countTargetAny,
                countTargetEnemies: countTargetEnemy,
                countTargetAllies: countTargetAllies,
                typeAction: "spell",
                actionId: spell.id
            }));
            onClose();
            return;
        }
    }, [])

    return {
        faceAction,
        extraAction: useExtraAction,
        useSkill: useSkillAction,
        useSpell: useSpellAction
    }
}