export const SKILL  = {
    FEAR: 'fear',
    FROZE: 'froze',
    UNIVERSAL_HEALING: 'universal',
    EAT_LIGHT_MANA: 'eat_light_mana',
    EAT_DARK_MANA: 'eat_dark_mana',
    EAT_DESTRUCTION_MANA: 'eat_destruction_mana',
    SWIFT: 'swift',
};


export type Skill  = typeof SKILL [keyof typeof SKILL];