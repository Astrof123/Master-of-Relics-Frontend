import type { Skill } from "@/features/game/types/game/skill";
import type { ExtraAction } from "./action";
import type { ArtifactGameState, Line } from "@/features/game/types/state/game";

export interface UseFaceData {
    gameId: string;
    artifactGameId: string;
    attackTarget: string | null,
    healTarget: string | null
}

export interface ExtraActionData {
    gameId: string;
    artifactGameId: string;
    type: ExtraAction;
    details: MoveArtifactDetails | null;
}

export interface UseSkillData {
    skillId: Skill;
    gameId: string;
    artifactGameId: string;
    targets: string[][];
}

export interface UseSpellData {
    spellId: Skill;
    gameId: string;
    targets: string[][];
}

export interface ToggleReadyMovementData {
    gameId: string;
    artifactsWithNewPosition: Record<string, ArtifactGameState>;
}

export interface MoveArtifactDetails {
    newPosition: number;
    newLine: Line;
}