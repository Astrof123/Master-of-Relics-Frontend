import { EFFECT, type Effect, type EffectTypeClient } from "../types/game/effects";

import SwiftBoots from "@assets/artifacts-img/SwiftBoots.svg";
import AverterImg from "@assets/buffs/Averter.svg";
import AxeOfTheBerserkerImg from "@assets/buffs/AxeOfTheBerserker.svg";
import ConcealerImg from "@assets/buffs/Concealer.svg";
import VeilstrikeImg from "@assets/buffs/Veilstrike.svg";
import DreamshacklerImg from "@assets/buffs/Dreamshackler.svg";
import GlimpseImg from "@assets/buffs/Glimpse.svg";
import HuntmasterImg from "@assets/buffs/Huntmaster.svg";
import IllusionBladeImg from "@assets/buffs/IllusionBlade.svg";
import RingOfDarkImg from "@assets/buffs/RingOfDark.svg";
import RingOfDestructionImg from "@assets/buffs/RingOfDestruction.svg";
import RingOfLightImg from "@assets/buffs/RingOfLight.svg";
import SpellGraceImg from "@assets/buffs/SpellGrace.svg";
import TemperCrownImg from "@assets/buffs/TemperCrown.svg";
import VoiderImg from "@assets/buffs/Voider.svg";
import VoltImg from "@assets/buffs/Volt.svg";
import Rust from "@assets/buffs/Rust.svg";
import SharpImg from "@assets/buffs/Sharp.svg";
import DivineGuardImg from "@assets/buffs/DivineGuard.svg";
import VampirismImg from "@assets/buffs/Vampirism.svg";
import LiveForRound from "@assets/buffs/LiveForRound.svg";

export const EFFECTS: Record<Effect, EffectTypeClient> = {
    [EFFECT.SINGLE_CHARGE]: {
        id: EFFECT.SINGLE_CHARGE,
        name: "Single Charge",
        img: SwiftBoots,
        title: "Способность этого артефакта может быть использована только один раз в раунд"
    },
    [EFFECT.USED_SKILL_CHARGES]: {
        id: EFFECT.USED_SKILL_CHARGES,
        name: "Used Skill Charges",
        img: SwiftBoots,
        title: "Количество использованных зарядов способности"
    },
    [EFFECT.LIGHT_MANA_DISCOUNT]: {
        id: EFFECT.LIGHT_MANA_DISCOUNT,
        name: "Light Mana Discount",
        img: RingOfLightImg,
        title: "Снижает стоимость заклинаний света на 5 единиц"
    },
    [EFFECT.DARK_MANA_DISCOUNT]: {
        id: EFFECT.DARK_MANA_DISCOUNT,
        name: "Dark Mana Discount",
        img: RingOfDarkImg,
        title: "Снижает стоимость заклинаний тьмы на 5 единиц"
    },
    [EFFECT.DESTRUCTION_MANA_DISCOUNT]: {
        id: EFFECT.DESTRUCTION_MANA_DISCOUNT,
        name: "Destruction Mana Discount",
        img: RingOfDestructionImg,
        title: "Снижает стоимость заклинаний разрушения на 5 единиц"
    },
    [EFFECT.RAGE_DISCOUNT]: {
        id: EFFECT.RAGE_DISCOUNT,
        name: "Rage Discount",
        img: TemperCrownImg,
        title: "Снижает стоимость способностей на 5 ярости"
    },
    [EFFECT.FREE_SPELL]: {
        id: EFFECT.FREE_SPELL,
        name: "Free Spell",
        img: SpellGraceImg,
        title: "Позволяет использовать следующее заклинание бесплатно"
    },
    [EFFECT.UPGRADE]: {
        id: EFFECT.UPGRADE,
        name: "Upgrade",
        img: VoltImg,
        title: "За каждый такой эффект дополнительно наносит 5 единиц магического урона атакуемой цели"
    },
    [EFFECT.LIVE_FOR_ROUND]: {
        id: EFFECT.LIVE_FOR_ROUND,
        name: "Live For Round",
        img: LiveForRound,
        title: "Артефакт уничтожится в конце раунда"
    },
    [EFFECT.BERSERK]: {
        id: EFFECT.BERSERK,
        name: "Berserk",
        img: AxeOfTheBerserkerImg,
        title: "При атаки дополнительно наносит ближний урон в зависимости от своей потерянной прочности 1 к 1"
    },
    [EFFECT.COPY]: {
        id: EFFECT.COPY,
        name: "Copy",
        img: IllusionBladeImg,
        title: "Этот артефакт копия и уничтожится, когда закончится прочность"
    },
    [EFFECT.GLIMPSE]: {
        id: EFFECT.GLIMPSE,
        name: "Glimpse",
        img: GlimpseImg,
        title: "Чтобы вернуть этот артефакт в бой, требуется 15 ловкости. Смена позиции бесплатна по ловкости"
    },
    [EFFECT.HUNT]: {
        id: EFFECT.HUNT,
        name: "Hunt",
        img: HuntmasterImg,
        title: "За каждый вражеский и союзный артефакт с неполной прочностью получает +4 к урону при атаке"
    },
    [EFFECT.INVISIBLE]: {
        id: EFFECT.INVISIBLE,
        name: "Invisible",
        img: VeilstrikeImg,
        title: "Укрыт от вражеских атак и способностей (не может быть их целью)"
    },
    [EFFECT.ONE_ATTACK_SHIELD]: {
        id: EFFECT.ONE_ATTACK_SHIELD,
        name: "One Attack Shield",
        img: AverterImg,
        title: "Не получит урон при следующей атаке"
    },
    [EFFECT.BLINDLESS]: {
        id: EFFECT.BLINDLESS,
        name: "Blindless",
        img: DreamshacklerImg,
        title: "Не может атаковать с тыловой линии"
    },
    [EFFECT.EXHAUSTION]: {
        id: EFFECT.EXHAUSTION,
        name: "Exhaustion",
        img: VoiderImg,
        title: "Отключена пассивная способность"
    },
    [EFFECT.ARTIFACT_SILENCE]: {
        id: EFFECT.ARTIFACT_SILENCE,
        name: "Artifact Silence",
        img: VoiderImg,
        title: "Не может использовать способность"
    },
    [EFFECT.AVATAR]: {
        id: EFFECT.AVATAR,
        name: "Avatar",
        img: ConcealerImg,
        title: "Не может быть целью заклинаний и способностей"
    },
    [EFFECT.RUST]: {
        id: EFFECT.RUST,
        name: "Rust",
        img: Rust,
        title: "Теряет в 1.5 раза больше прочности при получении урона"
    },
    [EFFECT.SHARP]: {
        id: EFFECT.SHARP,
        name: "Sharp",
        img: SharpImg,
        title: "Имеет +8 к урону при атаке (не способностью) до конца текущего раунда"
    },
    [EFFECT.DIVINE_GUARD]: {
        id: EFFECT.DIVINE_GUARD,
        name: "Divine Guard",
        img: DivineGuardImg,
        title: "Получает на 15 урона меньше от вражеских атак"
    },
    [EFFECT.VAMPIRISM]: {
        id: EFFECT.VAMPIRISM,
        name: "Vampirism",
        img: VampirismImg,
        title: "При атаке восстановит себе столько прочности, сколько нанесет урона"
    },
};