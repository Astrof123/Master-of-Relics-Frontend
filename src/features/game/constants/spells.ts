import { SPELL, type SpellDataType } from "../types/game/spell";
import TouchOfLightImg from "@assets/spells-card-without-stats/TouchOfLight.svg";
import PiercingBoltImg from "@assets/spells-card-without-stats/PiercingBolt.svg";
import MeteorShowerImg from "@assets/spells-card-without-stats/MeteorShower.svg";
import VolcanoImg from "@assets/spells-card-without-stats/Volcano.svg";
import FuryImg from "@assets/spells-card-without-stats/Fury.svg";
import ThunderStormImg from "@assets/spells-card-without-stats/Thunderstorm.svg";
import BetrayalImg from "@assets/spells-card-without-stats/Betrayal.svg";
import VampirismImg from "@assets/spells-card-without-stats/Vampirism.svg";
import ColdTouchImg from "@assets/spells-card-without-stats/ColdTouch.svg";
import RustImg from "@assets/spells-card-without-stats/Rust.svg";
import WeaknessImg from "@assets/spells-card-without-stats/Weakness.svg";
import DivineGuardImg from "@assets/spells-card-without-stats/DivineGuard.svg";
import ResurrectionImg from "@assets/spells-card-without-stats/Resurrection.svg";
import InspirationImg from "@assets/spells-card-without-stats/Inspiration.svg";
import SharpeningImg from "@assets/spells-card-without-stats/Sharpening.svg";

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
    },
    [SPELL.METEOR_SHOWER]: {
        id: SPELL.METEOR_SHOWER,
        name: "Meteor Shower",
        imgCardNoStats: MeteorShowerImg
    },
    [SPELL.VOLCANO]: {
        id: SPELL.VOLCANO,
        name: "Volcano",
        imgCardNoStats: VolcanoImg
    },
    [SPELL.FURY]: {
        id: SPELL.FURY,
        name: "Fury",
        imgCardNoStats: FuryImg
    },
    [SPELL.THUNDER_STORM]: {
        id: SPELL.THUNDER_STORM,
        name: "Thunder Storm",
        imgCardNoStats: ThunderStormImg
    },
    [SPELL.BETRAYAL]: {
        id: SPELL.BETRAYAL,
        name: "Betrayal",
        imgCardNoStats: BetrayalImg
    },
    [SPELL.VAMPIRISM]: {
        id: SPELL.VAMPIRISM,
        name: "Vampirism",
        imgCardNoStats: VampirismImg
    },
    [SPELL.COLD_TOUCH]: {
        id: SPELL.COLD_TOUCH,
        name: "Cold Touch",
        imgCardNoStats: ColdTouchImg
    },
    [SPELL.RUST]: {
        id: SPELL.RUST,
        name: "Rust",
        imgCardNoStats: RustImg
    },
    [SPELL.WEAKNESS]: {
        id: SPELL.WEAKNESS,
        name: "Weakness",
        imgCardNoStats: WeaknessImg
    },
    [SPELL.DIVINE_GUARD]: {
        id: SPELL.DIVINE_GUARD,
        name: "Divine Guard",
        imgCardNoStats: DivineGuardImg
    },
    [SPELL.RESURRECTION]: {
        id: SPELL.RESURRECTION,
        name: "Resurrection",
        imgCardNoStats: ResurrectionImg
    },
    [SPELL.INSPIRATION]: {
        id: SPELL.INSPIRATION,
        name: "Inspiration",
        imgCardNoStats: InspirationImg
    },
    [SPELL.SHARPENING]: {
        id: SPELL.SHARPENING,
        name: "Sharpening",
        imgCardNoStats: SharpeningImg
    }
};