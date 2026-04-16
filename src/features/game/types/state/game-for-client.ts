import type { EffectType } from "../game/effects";
import type { Face } from "../game/face";
import type { RESOURCE } from "../game/resource";
import type { ArtifactState, ConnectionGame, ConstantsGameState, DeckArtifact, EndState, Line, Player } from "./game";
import type { MiniPhase, Phase } from "./phase";


export interface EnemyArtifact {
    id: string;
    artifactId: string;
    face: Face;
    state: ArtifactState;
    currentHp: number;
    skillCost: number;
    maxHp: number;
    position: number;
    line: Line;
    effects: EffectType[];
}

export interface EnemyForClient {
    id: number;
    name: string;
    connection: ConnectionGame;
    hero: string;
    resources: {
        [RESOURCE.AGILITY]: number;
        [RESOURCE.RAGE]: number;
        [RESOURCE.LIGHT_MANA]: number;
        [RESOURCE.DARK_MANA]: number;
        [RESOURCE.DESTRUCTION_MANA]: number;
    },
    artifacts: Record<string, EnemyArtifact>;
    effects: EffectType[];
    isReady: boolean;
    movePoints: number;
    draft: {
        deck: DeckArtifact[];
    }
}


export interface GameForClient {
    id: string;
    phase: Phase;
    name: string;
    currentTurn: number;
    logs: string[];
    player: Player;
    enemy: EnemyForClient;
    end: EndState | null;
    miniPhase: MiniPhase;
    constants: ConstantsGameState;
}