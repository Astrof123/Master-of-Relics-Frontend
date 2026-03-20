import { EFFECT, type Effect, type EffectTypeClient } from "../types/game/effects";
import SingleCharge from "@assets/buffs/SingleCharge.jpg";



export const EFFECTS: Record<Effect, EffectTypeClient> = {
    [EFFECT.SINGLE_CHARGE]: {
        id: EFFECT.SINGLE_CHARGE,
        name: "Single Charge",
        img: SingleCharge,
        title: "Способность этого артефакта может быть использована только один раз в раунд"
    },
    [EFFECT.USED_SKILL_CHARGES]: {
        id: EFFECT.USED_SKILL_CHARGES,
        name: "Used Skill Charges",
        img: SingleCharge,
        title: "Количество использованных зарядов способности"
    },
}