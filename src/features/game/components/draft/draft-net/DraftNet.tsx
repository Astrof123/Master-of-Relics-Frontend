import clsx from "clsx";
import styles from "./DraftNet.module.css"
import { ARTIFACTS } from "../../../constants/artifacts";
import type { ArtifactGameState } from "../../../types/state/game";
import type { EnemyArtifact } from "../../../types/state/game-for-client";
import type { CardForView } from "@/features/game/types/card";
import { CARD_MODAL_TYPE, type OpenCardModalData } from "@/features/modal/types/modal";
import type { ModalShowDetails } from "@/features/modal/types/details";
import  { useCardModal } from "@/features/modal/hooks/useCardModal";

interface DraftNetProps {
    playerArtifacts: Record<string, ArtifactGameState>;
    enemyArtifacts: Record<string, EnemyArtifact>;
}

const DraftNet = (props: DraftNetProps) => {
    const { openCardModal } = useCardModal();

    const handleShowCard = (card: CardForView, cardInfo: ArtifactGameState | EnemyArtifact) => {
        const details: ModalShowDetails = {
            cardForView: card
        }
        
        const data: OpenCardModalData = {
            details: details,
            modalType: CARD_MODAL_TYPE.SHOW,
            valueLeftTop: cardInfo.maxHp,
            valueRightTop: cardInfo.skillCost,
            isArtifact: true
        }

        openCardModal(data)
    }

    const net = [];
    const artifacts1 = Object.values(props.playerArtifacts);
    const artifacts2 = Object.values(props.enemyArtifacts);

    for (let i = 0; i < 7; i++) {
        if (Object.keys(props.playerArtifacts).length > i) {
            net.push(
                [artifacts1[i], artifacts2[i]]
            )
        }
        else {
            net.push(null)                
        }
    }

    return (
        <div className={clsx(styles.rows)}>
            {net.map((row, index) => (
                row === null ? (
                    <div className={clsx(styles["row-drafted-artifacts"])} key={`row-${index}-drafted`}>
                        <div className={clsx(styles["drafted-artifact"])}></div>
                        <span>{index + 1}</span>
                        <div className={clsx(styles["drafted-artifact"])}></div>
                    </div>
                ) : (
                    <div className={clsx(styles["row-drafted-artifacts"])} key={`row-${index}-drafted`}>
                        <div className={clsx(styles["drafted-artifact"])}>
                            <img 
                                src={ARTIFACTS[row[0].artifactId].img} 
                                alt={ARTIFACTS[row[0].artifactId].name}
                                onClick={() => handleShowCard({ id: row[0].artifactId, img: ARTIFACTS[row[0].artifactId].imgCardNoStats }, row[0])}
                                title={ARTIFACTS[row[0].artifactId].name}
                            />
                        </div>
                        <span>{index + 1}</span>
                        <div className={clsx(styles["drafted-artifact"])}>
                            <img 
                                src={ARTIFACTS[row[1].artifactId].img} 
                                alt={ARTIFACTS[row[1].artifactId].name}
                                onClick={() => handleShowCard({ id: row[1].artifactId, img: ARTIFACTS[row[1].artifactId].imgCardNoStats }, row[1])}
                                title={ARTIFACTS[row[1].artifactId].name}
                            />
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

export default DraftNet;