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
import THREE_AGILITY_IMG from "@assets/faces/wings_x3.svg";
import THREE_RAGE_IMG from "@assets/faces/rage_x3.svg";


export const FACES: Record<Face, FaceDataType> = {
    [FACE.THREE_SWORD]: {
        id: FACE.THREE_SWORD,
        img: THREE_SWORD_IMG
    },
    [FACE.TWO_SWORD]: {
        id: FACE.TWO_SWORD,
        img: TWO_SWORD_IMG
    },
    [FACE.THREE_DARK_MANA]: {
        id: FACE.THREE_DARK_MANA,
        img: THREE_DARK_MANA_IMG
    },
    [FACE.THREE_LIGHT_MANA]: {
        id: FACE.THREE_LIGHT_MANA,
        img: THREE_LIGHT_MANA_IMG
    },
    [FACE.THREE_DESTRUCTION_MANA]: {
        id: FACE.THREE_DESTRUCTION_MANA,
        img: THREE_DESTRUCTION_MANA_IMG
    },
    [FACE.ONE_EVERY_MANA]: {
        id: FACE.ONE_EVERY_MANA,
        img: ONE_EVERY_MANA_IMG
    },
    [FACE.ONE_RAGE_TWO_TARGET]: {
        id: FACE.ONE_RAGE_TWO_TARGET,
        img: ONE_RAGE_TWO_TARGET_IMG
    },
    [FACE.TWO_RAGE_ONE_TARGET]: {
        id: FACE.TWO_RAGE_ONE_TARGET,
        img: TWO_RAGE_ONE_TARGET_IMG
    },
    [FACE.THREE_HEART]: {
        id: FACE.THREE_HEART,
        img: THREE_HEART_IMG
    },
    [FACE.ONE_RAGE_TWO_HEART]: {
        id: FACE.ONE_RAGE_TWO_HEART,
        img: ONE_RAGE_TWO_HEART_IMG
    },
    [FACE.THREE_AGILITY]: {
        id: FACE.THREE_AGILITY,
        img: THREE_AGILITY_IMG
    },
    [FACE.THREE_RAGE]: {
        id: FACE.THREE_RAGE,
        img: THREE_RAGE_IMG
    }
};

