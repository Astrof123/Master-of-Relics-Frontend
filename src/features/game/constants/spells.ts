import { SPELL, type SpellDataType } from "../types/game/spell";
import TouchOfLightImg from "@assets/spells-card-without-stats/TouchOfLight.svg";
import PiercingBoltImg from "@assets/spells-card-without-stats/PiercingBolt.svg"

export const SPELLS: Record<string, SpellDataType> = {
    [SPELL.TOUCH_OF_LIGHT]: {
        id: SPELL.TOUCH_OF_LIGHT,
        name: "Touch of Light",
        imgCardNoStats: TouchOfLightImg
    },
    [SPELL.PIERCING_BOLT]: {
        id: SPELL.PIERCING_BOLT,
        name: "Piercing Bolt",
        imgCardNoStats: PiercingBoltImg
    }
}