export const SPELLTYPE  = {
    DARK: 'dark',
    LIGHT: 'light',
    DESTRUCTION: 'destruction',
};

export type SpellType  = typeof SPELLTYPE [keyof typeof SPELLTYPE];

export const SPELL  = {
    PIERCING_BOLT: 'piercing_bolt',
    TOUCH_OF_LIGHT: 'touch_of_light',
};

export type Spell  = typeof SPELL [keyof typeof SPELL];


export interface SpellDataType {
    id: string;
    name: string;
    imgCardNoStats: string;
}