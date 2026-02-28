import type { ArtifactState, ConnectionGame, Effect, Face, Line, Player } from "./game";
import type { Phase } from "./phase";


export interface EnemyArtifact {
    id: string;
    artifactId: number;
    face: Face;
    state: ArtifactState;
    currentHp: number;
    maxHp: number;
    position: number;
    line: Line;
    effects: Effect[];
}

export interface EnemyForClient {
    id: number;
    name: string;
    connection: ConnectionGame;
    hero: string;
    resources: {
        agility: number;
        rage: number;
        light_mana: number;
        dark_mana: number;
        destruction_mana: number;
    },
    artifacts: Record<string, EnemyArtifact>;
    effects: Effect[];
    isReady: boolean;
    movePoints: number;
    draft: {
        deck: number[];
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
}