import type { Skill } from "@/features/game/types/game/skill";
import type { ExtraAction } from "./action";

export interface UseFaceData {
    gameId: string;
    artifactGameId: string;
    attackTarget: string | null,
    healTarget: string | null
}

export interface ExtraActionData {
    gameId: string;
    artifactGameId: string;
    type: ExtraAction
}

export interface UseSkillData {
    skillId: Skill;
    gameId: string;
    artifactGameId: string;
    targets: string[][];
}