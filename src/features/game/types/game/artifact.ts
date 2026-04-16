export interface ArtifactDataType {
    id: string;
    name: string;
    img: string;
    imgBattle: string;
    imgCardNoStats: string;
}

export const ARTIFACT  = {
    INTIMIDATOR: 'intimidator',
    ARCANE_SHIELD: 'arcane_shield',
    FROST_BOW: 'frost_bow',
    REGENERATION_POTION: 'regeneration_potion',
    SWIFT_BOOTS: 'swift_boots',
};

export type Artifact  = typeof ARTIFACT [keyof typeof ARTIFACT];