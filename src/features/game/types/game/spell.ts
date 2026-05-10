export const SPELLTYPE  = {
    DARK: 'dark',
    LIGHT: 'light',
    DESTRUCTION: 'destruction',
};

export type SpellType  = typeof SPELLTYPE [keyof typeof SPELLTYPE];

export const SPELL  = {
    PIERCING_BOLT: 'piercing_bolt',
    TOUCH_OF_LIGHT: 'touch_of_light',
    METEOR_SHOWER: 'meteor_shower',
    VOLCANO: 'volcano',
    FURY: 'fury',
    THUNDER_STORM: 'thunder_storm',
    BETRAYAL: 'betrayal',
    VAMPIRISM: 'vampirism',
    COLD_TOUCH: 'cold_touch',
    RUST: 'rust',
    WEAKNESS: 'weakness',
    DIVINE_GUARD: 'divine_guard',
    RESURRECTION: 'resurrection',
    INSPIRATION: 'inspiration',
    SHARPENING: 'sharpening',
};


export type Spell  = typeof SPELL [keyof typeof SPELL];


export interface SpellDataType {
    id: string;
    name: string;
    imgCardNoStats: string;
}