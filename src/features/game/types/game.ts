import type { Phase } from "./phase";

export const CONNECTIONGAME  = {
    ONLINE: 'online',
    LEAVED: 'leaved',
    OFFLINE: "offline"
} as const;

export type ConnectionGame  = typeof CONNECTIONGAME [keyof typeof CONNECTIONGAME];


export const LINE  = {
    FRONT: 'front',
    BACK: 'back'
} as const;

export type Line  = typeof LINE [keyof typeof LINE];


export const ARTIFACT_STATE  = {
    READY_TO_USE: 'ready_to_use',
    COOLDOWN: 'cooldown',
    STUNNED: 'stunned',
    ROOTED: 'rooted'
} as const;

export type ArtifactState  = typeof ARTIFACT_STATE [keyof typeof ARTIFACT_STATE];


export interface ArtifactAvailableActions {
    face: {
        description: string;
        attackTarget: string[],
        healTarget: string[]
    },
    agilityActions: {
        reroll: true,
        return_to_battle: false,
        change_line: true
    },
    skill: [
        {
            id: number,
            description: string,
            countTarget: number,
            possibleTargets: string[][],
            targetsType: TargetsType
        }
    ] 
}


export interface ArtifactGameState {
    id: string;
    artifactId: number;
    face: Face;
    state: ArtifactState;
    currentHp: number;
    maxHp: number;
    position: number;
    line: Line;
    effects: Effect[];
    availableActions: ArtifactAvailableActions
}

export const EFFECT_DURATION  = {
    ALWAYS: 'always',
    ONE_USE: 'one_use',
    CURRENT_ROUND: 'current_round'
};

export type EffectDuration  = typeof EFFECT_DURATION [keyof typeof EFFECT_DURATION];


export const FACE  = {
    AGILITY: 'agility',
    LIGHT_MANA: 'light_mana',
    RAGE: 'rage',
    DARK_MANA: 'dark_mana',
    DESTRUCTION_MANA: 'destruction_mana',
    SWORD: 'sword',
    TARGET: 'target',
    HEAL: "heal"
};

export type Face  = typeof FACE [keyof typeof FACE];


export interface Effect {
    id: string;
    duration: EffectDuration;
}


export interface Player {
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
    artifacts: Record<string, ArtifactGameState>;
    spells: {
        light: SpellGameState[],
        dark: SpellGameState[],
        destruction: SpellGameState[]
    };
    effects: Effect[];
    isReady: boolean;
    movePoints: number;
    draft: {
        pickedArtifact: number|null;
        deck: number[];
    },
    availableActions: {}
}


export interface Game {
    id: string;
    phase: Phase;
    name: string;
    currentTurn: number;
    logs: string[];
    players: Record<number, Player>;
}


export const TARGETS_TYPE  = {
    ENEMY: 'enemy',
    ALLIED: 'allied',
    ONE_ENEMY_ONE_ALLIED: 'one_enemy_one_allied',
};

export type TargetsType  = typeof TARGETS_TYPE [keyof typeof TARGETS_TYPE];


export interface SpellGameState {
    id: string;
    cooldown: boolean;
    canUse: boolean;
    countTarget: number;
    possibleTargets: string[][];
    targetsType: TargetsType;
}