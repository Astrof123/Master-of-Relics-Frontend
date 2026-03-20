import { ARTIFACT, type Artifact, type ArtifactDataType } from "../types/game/artifact";
import IntimidatorImgCard from "@assets/artifacts-card/Intimidator.svg";
import ArcaneShieldImgCard from "@assets/artifacts-card/ArcaneShield.svg"
import FrostBowImgCard from "@assets/artifacts-card/FrostBow.svg"
import RegenerationPotionImgCard from "@assets/artifacts-card/RegenerationPotion.svg"
import SwiftBootsImgCard from "@assets/artifacts-card/SwiftBoots.svg"

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

import IntimidatorImgCardNoHp from "@assets/artifacts-card-without-hp/Intimidator.svg";
import ArcaneShieldImgCardNoHp from "@assets/artifacts-card-without-hp/ArcaneShield.svg"
import FrostBowImgCardNoHp from "@assets/artifacts-card-without-hp/FrostBow.svg"
import RegenerationPotionImgCardNoHp from "@assets/artifacts-card-without-hp/RegenerationPotion.svg"
import SwiftBootsImgCardNoHp from "@assets/artifacts-card-without-hp/SwiftBoots.svg"

export const ARTIFACTS: Record<string, ArtifactDataType> = {
    [ARTIFACT.INTIMIDATOR]: {
        id: ARTIFACT.INTIMIDATOR,
        name: "Intimidator",
        imgCard: IntimidatorImgCard,
        img: IntimidatorImg,
        imgBattle: IntimidatorImgBattle,
        imgCardNoHp: IntimidatorImgCardNoHp
    },
    [ARTIFACT.ARCANE_SHIELD]: {
        id: ARTIFACT.ARCANE_SHIELD,
        name: "Arcane Shield",
        imgCard: ArcaneShieldImgCard,
        img: ArcaneShieldImg,
        imgBattle: ArcaneShieldImgBattle,
        imgCardNoHp: ArcaneShieldImgCardNoHp
    },
    [ARTIFACT.FROST_BOW]: {
        id: ARTIFACT.FROST_BOW,
        name: "Frost Bow",
        imgCard: FrostBowImgCard,
        img: FrostBowImg,
        imgBattle: FrostBowImgBattle,
        imgCardNoHp: FrostBowImgCardNoHp
    },
    [ARTIFACT.REGENERATION_POTION]: {
        id: ARTIFACT.REGENERATION_POTION,
        name: "Regeneration Potion",
        imgCard: RegenerationPotionImgCard,
        img: RegenerationPotionImg,
        imgBattle: RegenerationPotionImgBattle,
        imgCardNoHp: RegenerationPotionImgCardNoHp
    },
    [ARTIFACT.SWIFT_BOOTS]: {
        id: ARTIFACT.SWIFT_BOOTS,
        name: "Swift Boots",
        imgCard: SwiftBootsImgCard,
        img: SwiftBootsImg,
        imgBattle: SwiftBootsImgBattle,
        imgCardNoHp: SwiftBootsImgCardNoHp
    }
}