import { FACE, type Face, type FaceDataType } from "../types/game/face";

import THREE_SWORD_IMG from "@assets/faces/sword_x3.svg";
import TWO_SWORD_IMG from "@assets/faces/sword_x2.svg";
import THREE_DARK_MANA_IMG from "@assets/faces/dark_mana_x3.svg";
import THREE_LIGHT_MANA_IMG from "@assets/faces/light_mana_x3.svg";
import THREE_DESTRUCTION_MANA_IMG from "@assets/faces/destruction_mana_x3.svg";
import ONE_EVERY_MANA_IMG from "@assets/faces/one_every_mana.svg";
import ONE_RAGE_TWO_TARGET_IMG from "@assets/faces/one_rage_two_target.svg";
import TWO_RAGE_ONE_TARGET_IMG from "@assets/faces/two_rage_one_target.svg";
import THREE_HEART_IMG from "@assets/faces/heart_x3.svg";
import ONE_RAGE_TWO_HEART_IMG from "@assets/faces/one_rage_two_heart.svg";
import THREE_AGILITY_IMG from "@assets/faces/agility_x3.svg";
import THREE_RAGE_IMG from "@assets/faces/rage_x3.svg";

import AGILITY_X2_IMG from "@assets/faces/agility_x2.svg";
import DARK_MANA_X2_IMG from "@assets/faces/dark_mana_x2.svg";
import HEART_X2_IMG from "@assets/faces/heart_x2.svg";
import LIGHT_MANA_X2_IMG from "@assets/faces/light_mana_x2.svg";
import ONE_DARK_ONE_LIGHT_MANA_IMG from "@assets/faces/one_dark_one_light_mana.svg";
import ONE_DESTRUCTION_ONE_DARK_MANA_IMG from "@assets/faces/one_destruction_one_dark_mana.svg";
import ONE_DESTRUCTION_ONE_LIGHT_MANA_IMG from "@assets/faces/one_destruction_one_light_mana.svg";
import ONE_RAGE_TWO_DARK_MANA_IMG from "@assets/faces/one_rage_two_dark_mana.svg";
import ONE_SWORD_ONE_DARK_MANA_IMG from "@assets/faces/one_sword_one_dark_mana.svg";
import ONE_SWORD_ONE_DESTRUCTION_MANA_IMG from "@assets/faces/one_sword_one_destruction_mana.svg";
import ONE_SWORD_ONE_LIGHT_MANA_IMG from "@assets/faces/one_sword_one_light_mana.svg";
import RAGE_X1_IMG from "@assets/faces/rage_x1.svg";
import RAGE_X2_IMG from "@assets/faces/rage_x2.svg";
import TARGET_X2_IMG from "@assets/faces/target_x2.svg";
import TWO_LIGHT_MANA_ONE_TARGET_IMG from "@assets/faces/two_light_mana_one_target.svg";
import TWO_RAGE_ONE_LIGHT_MANA_IMG from "@assets/faces/two_rage_one_light_mana.svg";
import TWO_TARGET_ONE_LIGHT_MANA_IMG from "@assets/faces/two_target_one_light_mana.svg";

import ONE_AGILITY_ONE_TARGET_IMG from "@assets/faces/one_agility_one_target.svg";
import ONE_RAGE_ONE_TARGET_IMG from "@assets/faces/one_rage_one_target.svg";
// import ONE_DESTRUCTION_MANA_IMG from "@assets/faces/one_destruction_mana.svg";
import ONE_SWORD_ONE_RAGE_IMG from "@assets/faces/one_sword_one_rage.svg";
import ONE_SWORD_ONE_AGILITY_IMG from "@assets/faces/one_sword_one_agility.svg";
import ONE_TARGET_ONE_DESTRUCTION_MANA_IMG from "@assets/faces/one_target_one_destruction_mana.svg";

import TARGET_X3_IMG from "@assets/faces/target_x3.svg";
import TARGET_X4_IMG from "@assets/faces/target_x4.svg";
import DESTRUCTION_MANA_X2_IMG from "@assets/faces/destruction_mana_x2.svg";


export const FACES: Record<Face, FaceDataType> = {
    // [FACE.AGILITY]: {
    //     id: FACE.AGILITY,
    //     img: AGILITY_X2_IMG,
    // },
    // [FACE.LIGHT_MANA]: {
    //     id: FACE.LIGHT_MANA,
    //     img: LIGHT_MANA_X2_IMG,
    // },
    [FACE.RAGE]: {
        id: FACE.RAGE,
        img: RAGE_X1_IMG,
    },
    // [FACE.DARK_MANA]: {
    //     id: FACE.DARK_MANA,
    //     img: DARK_MANA_X2_IMG,
    // },
    // [FACE.DESTRUCTION_MANA]: {
    //     id: FACE.DESTRUCTION_MANA,
    //     img: ONE_DESTRUCTION_MANA_IMG,
    // },
    // [FACE.SWORD]: {
    //     id: FACE.SWORD,
    //     img: TWO_SWORD_IMG,
    // },
    // [FACE.TARGET]: {
    //     id: FACE.TARGET,
    //     img: TARGET_X2_IMG,
    // },
    // [FACE.HEAL]: {
    //     id: FACE.HEAL,
    //     img: HEART_X2_IMG,
    // },
    [FACE.THREE_SWORD]: {
        id: FACE.THREE_SWORD,
        img: THREE_SWORD_IMG,
    },
    [FACE.TWO_SWORD]: {
        id: FACE.TWO_SWORD,
        img: TWO_SWORD_IMG,
    },
    [FACE.TWO_TARGET]: {
        id: FACE.TWO_TARGET,
        img: TARGET_X2_IMG,
    },
    [FACE.THREE_TARGET]: {
        id: FACE.THREE_TARGET,
        img: TARGET_X3_IMG,
    },
    [FACE.THREE_DARK_MANA]: {
        id: FACE.THREE_DARK_MANA,
        img: THREE_DARK_MANA_IMG,
    },
    [FACE.THREE_LIGHT_MANA]: {
        id: FACE.THREE_LIGHT_MANA,
        img: THREE_LIGHT_MANA_IMG,
    },
    [FACE.THREE_DESTRUCTION_MANA]: {
        id: FACE.THREE_DESTRUCTION_MANA,
        img: THREE_DESTRUCTION_MANA_IMG,
    },
    [FACE.ONE_EVERY_MANA]: {
        id: FACE.ONE_EVERY_MANA,
        img: ONE_EVERY_MANA_IMG,
    },
    [FACE.ONE_RAGE_TWO_TARGET]: {
        id: FACE.ONE_RAGE_TWO_TARGET,
        img: ONE_RAGE_TWO_TARGET_IMG,
    },
    [FACE.TWO_RAGE_ONE_TARGET]: {
        id: FACE.TWO_RAGE_ONE_TARGET,
        img: TWO_RAGE_ONE_TARGET_IMG,
    },
    [FACE.THREE_HEART]: {
        id: FACE.THREE_HEART,
        img: THREE_HEART_IMG,
    },
    [FACE.ONE_RAGE_TWO_HEART]: {
        id: FACE.ONE_RAGE_TWO_HEART,
        img: ONE_RAGE_TWO_HEART_IMG,
    },
    [FACE.THREE_AGILITY]: {
        id: FACE.THREE_AGILITY,
        img: THREE_AGILITY_IMG,
    },
    [FACE.THREE_RAGE]: {
        id: FACE.THREE_RAGE,
        img: THREE_RAGE_IMG,
    },
    [FACE.TWO_HEART]: {
        id: FACE.TWO_HEART,
        img: HEART_X2_IMG,
    },
    [FACE.TWO_LIGHT_MANA]: {
        id: FACE.TWO_LIGHT_MANA,
        img: LIGHT_MANA_X2_IMG,
    },
    [FACE.TWO_DARK_MANA]: {
        id: FACE.TWO_DARK_MANA,
        img: DARK_MANA_X2_IMG,
    },
    [FACE.TWO_DESTRUCTION_MANA]: {
        id: FACE.TWO_DESTRUCTION_MANA,
        img: DESTRUCTION_MANA_X2_IMG,
    },
    [FACE.TWO_RAGE]: {
        id: FACE.TWO_RAGE,
        img: RAGE_X2_IMG,
    },
    [FACE.TWO_DARK_MANA_ONE_RAGE]: {
        id: FACE.TWO_DARK_MANA_ONE_RAGE,
        img: ONE_RAGE_TWO_DARK_MANA_IMG,
    },
    [FACE.ONE_RAGE_ONE_TARGET]: {
        id: FACE.ONE_RAGE_ONE_TARGET,
        img: ONE_RAGE_ONE_TARGET_IMG,
    },
    [FACE.ONE_SWORD_ONE_RAGE]: {
        id: FACE.ONE_SWORD_ONE_RAGE,
        img: ONE_SWORD_ONE_RAGE_IMG,
    },
    [FACE.ONE_SWORD_ONE_DARK_MANA]: {
        id: FACE.ONE_SWORD_ONE_DARK_MANA,
        img: ONE_SWORD_ONE_DARK_MANA_IMG,
    },
    [FACE.ONE_SWORD_ONE_DESTRUCTION_MANA]: {
        id: FACE.ONE_SWORD_ONE_DESTRUCTION_MANA,
        img: ONE_SWORD_ONE_DESTRUCTION_MANA_IMG,
    },
    [FACE.ONE_SWORD_ONE_LIGHT_MANA]: {
        id: FACE.ONE_SWORD_ONE_LIGHT_MANA,
        img: ONE_SWORD_ONE_LIGHT_MANA_IMG,
    },
    [FACE.ONE_SWORD_ONE_AGILITY]: {
        id: FACE.ONE_SWORD_ONE_AGILITY,
        img: ONE_SWORD_ONE_AGILITY_IMG,
    },
    [FACE.ONE_TARGET_ONE_AGILITY]: {
        id: FACE.ONE_TARGET_ONE_AGILITY,
        img: ONE_AGILITY_ONE_TARGET_IMG,
    },
    [FACE.ONE_TARGET_ONE_DESTRUCTION_MANA]: {
        id: FACE.ONE_TARGET_ONE_DESTRUCTION_MANA,
        img: ONE_TARGET_ONE_DESTRUCTION_MANA_IMG,
    },
    [FACE.TWO_LIGHT_MANA_ONE_TARGET]: {
        id: FACE.TWO_LIGHT_MANA_ONE_TARGET,
        img: TWO_LIGHT_MANA_ONE_TARGET_IMG,
    },
    [FACE.TWO_TARGET_ONE_LIGHT_MANA]: {
        id: FACE.TWO_TARGET_ONE_LIGHT_MANA,
        img: TWO_TARGET_ONE_LIGHT_MANA_IMG,
    },
    [FACE.FOUR_TARGET]: {
        id: FACE.FOUR_TARGET,
        img: TARGET_X4_IMG,
    },
    [FACE.ONE_DARK_ONE_DESTRUCTION_MANA]: {
        id: FACE.ONE_DARK_ONE_DESTRUCTION_MANA,
        img: ONE_DESTRUCTION_ONE_DARK_MANA_IMG,
    },
    [FACE.ONE_DARK_ONE_LIGHT_MANA]: {
        id: FACE.ONE_DARK_ONE_LIGHT_MANA,
        img: ONE_DARK_ONE_LIGHT_MANA_IMG,
    },
    [FACE.ONE_DESTRUCTION_ONE_LIGHT_MANA]: {
        id: FACE.ONE_DESTRUCTION_ONE_LIGHT_MANA,
        img: ONE_DESTRUCTION_ONE_LIGHT_MANA_IMG,
    },
    [FACE.TWO_AGILITY]: {
        id: FACE.TWO_AGILITY,
        img: AGILITY_X2_IMG,
    },
    [FACE.TWO_RAGE_ONE_LIGHT_MANA]: {
        id: FACE.TWO_RAGE_ONE_LIGHT_MANA,
        img: TWO_RAGE_ONE_LIGHT_MANA_IMG,
    },
};