import { ARTIFACT, type ArtifactDataType } from "../types/game/artifact";
import IntimidatorImg from "@assets/artifacts-img/Intimidator.svg";
import ArcaneShieldImg from "@assets/artifacts-img/ArcaneShield.svg"
import FrostBowImg from "@assets/artifacts-img/FrostBow.svg"
import RegenerationPotionImg from "@assets/artifacts-img/RegenerationPotion.svg"
import SwiftBootsImg from "@assets/artifacts-img/SwiftBoots.svg"

import IntimidatorImgBattle from "@assets/artifacts-battle/Intimidator.svg";
import ArcaneShieldImgBattle from "@assets/artifacts-battle/ArcaneShield.svg"
import FrostBowImgBattle from "@assets/artifacts-battle/FrostBow.svg"
import RegenerationPotionImgBattle from "@assets/artifacts-battle/RegenerationPotion.svg"
import SwiftBootsImgBattle from "@assets/artifacts-battle/SwiftBoots.svg"

import IntimidatorImgCardNoHp from "@assets/artifacts-card-without-stats/Intimidator.svg";
import ArcaneShieldImgCardNoHp from "@assets/artifacts-card-without-stats/ArcaneShield.svg"
import FrostBowImgCardNoHp from "@assets/artifacts-card-without-stats/FrostBow.svg"
import RegenerationPotionImgCardNoHp from "@assets/artifacts-card-without-stats/RegenerationPotion.svg"
import SwiftBootsImgCardNoHp from "@assets/artifacts-card-without-stats/SwiftBoots.svg"

export const ARTIFACTS: Record<string, ArtifactDataType> = {
    [ARTIFACT.INTIMIDATOR]: {
        id: ARTIFACT.INTIMIDATOR,
        name: "Intimidator",
        img: IntimidatorImg,
        imgBattle: IntimidatorImgBattle,
        imgCardNoStats: IntimidatorImgCardNoHp
    },
    [ARTIFACT.ARCANE_SHIELD]: {
        id: ARTIFACT.ARCANE_SHIELD,
        name: "Arcane Shield",
        img: ArcaneShieldImg,
        imgBattle: ArcaneShieldImgBattle,
        imgCardNoStats: ArcaneShieldImgCardNoHp
    },
    [ARTIFACT.FROST_BOW]: {
        id: ARTIFACT.FROST_BOW,
        name: "Frost Bow",
        img: FrostBowImg,
        imgBattle: FrostBowImgBattle,
        imgCardNoStats: FrostBowImgCardNoHp
    },
    [ARTIFACT.REGENERATION_POTION]: {
        id: ARTIFACT.REGENERATION_POTION,
        name: "Regeneration Potion",
        img: RegenerationPotionImg,
        imgBattle: RegenerationPotionImgBattle,
        imgCardNoStats: RegenerationPotionImgCardNoHp
    },
    [ARTIFACT.SWIFT_BOOTS]: {
        id: ARTIFACT.SWIFT_BOOTS,
        name: "Swift Boots",
        img: SwiftBootsImg,
        imgBattle: SwiftBootsImgBattle,
        imgCardNoStats: SwiftBootsImgCardNoHp
    }
}