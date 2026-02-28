import type { Artifact } from "../types/artifact";
import IntimidatorImgCard from "@assets/artifacts-card/Intimidator.svg";
import ArcaneShieldImgCard from "@assets/artifacts-card/ArcaneShield.svg"
import FrostBowImgCard from "@assets/artifacts-card/FrostBow.svg"
import RegenerationPotionImgCard from "@assets/artifacts-card/RegenerationPotion.svg"
import SwiftBootsImgCard from "@assets/artifacts-card/SwiftBoots.svg"

import IntimidatorImgTest from "@assets/artifacts-card/IntimidatorTest2.svg";
import ArcaneShieldImgTest from "@assets/artifacts-card/ArcaneShieldTest2.svg"
import FrostBowImgTest from "@assets/artifacts-card/FrostBowTest2.svg"
import RegenerationPotionImgTest from "@assets/artifacts-card/RegenerationPotionTest2.svg"
import SwiftBootsImgTest from "@assets/artifacts-card/SwiftBootsTest2.svg"

import IntimidatorImg from "@assets/artifacts-img/Intimidator.svg";
import ArcaneShieldImg from "@assets/artifacts-img/ArcaneShield.svg"
import FrostBowImg from "@assets/artifacts-img/FrostBow.svg"
import RegenerationPotionImg from "@assets/artifacts-img/RegenerationPotion.svg"
import SwiftBootsImg from "@assets/artifacts-img/SwiftBoots.svg"

import test from "@assets/artifacts-card/test.svg"
import test2 from "@assets/artifacts-card/test2.svg"
import test3 from "@assets/artifacts-card/test3.svg"
import test4 from "@assets/artifacts-card/test4.svg"
import test5 from "@assets/artifacts-card/test5.svg"


export const ARTIFACTS: Record<number, Artifact> = {
    [1]: {
        id: 1,
        name: "Intimidator",
        imgCard: test,
        img: IntimidatorImg
    },
    [2]: {
        id: 2,
        name: "Arcane Shield",
        imgCard: test2,
        img: ArcaneShieldImg
    },
    [3]: {
        id: 3,
        name: "Frost Bow",
        imgCard: test3,
        img: FrostBowImg
    },
    [4]: {
        id: 4,
        name: "Regeneration Potion",
        imgCard: test4,
        img: RegenerationPotionImg
    },
    [5]: {
        id: 5,
        name: "Swift Boots",
        imgCard: test5,
        img: SwiftBootsImg
    }
}