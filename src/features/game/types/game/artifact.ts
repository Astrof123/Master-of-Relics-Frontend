export interface ArtifactDataType {
    id: string;
    name: string;
    img: string;
    imgBattle: string;
    imgCardNoStats: string;
}

export const ARTIFACT = {
    ARCANE_SHIELD: 'arcane_shield',
    ROOT_GRASP: 'root_grasp',
    SWIFT_BOOTS: 'swift_boots',
    RING_OF_LIGHT: 'ring_of_light',
    RING_OF_DARK: 'ring_of_dark',
    RING_OF_DESTRUCTION: 'ring_of_destruction',
    TEMPER_CROWN: 'temper_crown',
    SPELL_GRACE: 'spell_grace',
    CHRONOS: 'chronos',
    VOLT: 'volt',
    MOON_STAFF: 'moon_staff',
    BONELORD: 'bonelord',
    AXE_OF_THE_BERSERKER: 'axe_of_the_berserker',
    ILLUSION_BLADE: 'illusion_blade',
    GLIMPSE: 'glimpse',
    HUNTMASTER: 'huntmaster',
    PURIFIER: 'purifier',
    VEILSTRIKE: 'veilstrike',
    PALADINS_GLOVE: 'paladins_glove',
    AVERTER: 'averter',
    DREAMSHACKLER: 'dreamshackler',
    GRAPPLER: 'grappler',
    VOIDER: 'voider',
    CONCEALER: 'concealer',
    PLUNDER: 'plunder',
    DIVINE_STAFF: 'divine_staff',
    REAPER: 'reaper',
    BONE_KNIFE: 'bone_knife',
};

export type Artifact  = typeof ARTIFACT [keyof typeof ARTIFACT];

export const ARTIFACT_TYPE  = {
    MELEE_DAMAGE: 'near',
    DEFENDER: 'defender',
    RANGE_DAMAGE: 'range_damage',
    RAGE_MAGE: 'rage_mage',
    MAGE: 'mage',
    SUPPORT: 'support',
    GENERAL: 'general',
};

export type ArtifactType  = typeof ARTIFACT_TYPE [keyof typeof ARTIFACT_TYPE];