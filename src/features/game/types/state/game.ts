import type { ExtraActionState } from "../../../action/types/action";
import type { EffectType } from "../game/effects";
import type { Face } from "../game/face";
import type { LogType } from "../game/log";
import type { RESOURCE } from "../game/resource";
import type { Skill } from "../game/skill";
import type { Spell, SPELLTYPE } from "../game/spell";
import type { MiniPhase, Phase } from "./phase";

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
    ROOTED: 'rooted',
    BREAKEN: "breaken",
    DREAM: "dream",
    DESTROYED: "destroyed"
} as const;

export type ArtifactState  = typeof ARTIFACT_STATE [keyof typeof ARTIFACT_STATE];


export interface SkillStateType {
    id: Skill;
    description: string;
    possibleTargets: string[][];
    countAnyTarget: number;
    countTargetEnemy: number;
    countTargetAllies: number;
}

export interface ArtifactAvailableActions {
    face: {
        id: string;
        description: string;
        attackTargets: string[] | null,
        healTargets: string[] | null,
    } | null,
    skills: SkillStateType[],
    extraActions: ExtraActionState[]
}

export interface ArtifactGameState {
    id: string;
    artifactId: string;
    face: Face;
    state: ArtifactState;
    currentHp: number;
    maxHp: number;
    position: number;
    line: Line;
    effects: EffectType[];
    skillCost: number | null;
    availableActions: ArtifactAvailableActions;
    extraData: {
        lastStateBeforeRoot: ArtifactState;
    }
}

export interface DeckArtifact {
    artifactId: string;
    maxHp: number;
    skillCost: number;
}

export interface Player {
    id: string;
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
    artifacts: Record<string, ArtifactGameState>;
    spells: {
        [SPELLTYPE.LIGHT]: Record<Spell, SpellGameState>,
        [SPELLTYPE.DARK]: Record<Spell, SpellGameState>,
        [SPELLTYPE.DESTRUCTION]: Record<Spell, SpellGameState>
    };
    effects: EffectType[];
    isReady: boolean;
    movePoints: number;
    draft: {
        pickedArtifact: string|null;
        deck: DeckArtifact[];
    },
    temporaryArtifacts: Record<string, ArtifactGameState>;
    offerDraw: boolean;
    extraData: {
        skippedMoves: number;
        countActionsSinceStartTurn: number;
    },
    isBot: boolean;
}


export interface Game {
    id: string;
    phase: Phase;
    name: string;
    currentTurn: string;
    logs: LogState[];
    players: Record<string, Player>;
    end: EndState | null;
    miniPhase: MiniPhase;
    constants: ConstantsGameState;
}

export interface ConstantsGameState {
    maxCountArtifactsOnLine: number;
    timerDraft: number | null;
    timerMovement: number | null;
    timerTurn: number | null;
}


export interface EndState {
    winner: string | null;
    winner_prize: number;
    loser_prize: number;
    draw_prize: number;
}

export interface SpellGameState {
    id: string;
    description: string;
    cost: number;
    cooldown: boolean;
    canUse: boolean;
    possibleTargets: string[][];
    countAnyTarget: number;
    countTargetEnemy: number;
    countTargetAllies: number;
}

export interface LogState {
    text: string;
    type: LogType;
}