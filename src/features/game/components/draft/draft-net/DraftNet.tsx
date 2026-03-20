import clsx from "clsx";
import styles from "./DraftNet.module.css"
import { ARTIFACTS } from "../../../constants/artifacts";
import type { ArtifactGameState } from "../../../types/state/game";
import type { EnemyArtifact } from "../../../types/state/game-for-client";
import { useModal } from "@/features/modal/hooks/useModal";
import type { CardForView } from "@/features/game/types/card";
import { MODALTYPE } from "@/features/modal/types/modal";

interface DraftNetProps {
    playerArtifacts: Record<string, ArtifactGameState>;
    enemyArtifacts: Record<string, EnemyArtifact>;
}

const DraftNet = (props: DraftNetProps) => {
    const { openCardModal } = useModal();

    const handleShowCard = (card: CardForView) => {
        openCardModal(card, MODALTYPE.SHOW, null)
    }

    const net = [];
    const artifacts1 = Object.values(props.playerArtifacts);
    const artifacts2 = Object.values(props.enemyArtifacts);

    for (let i = 0; i < 7; i++) {
        if (Object.keys(props.playerArtifacts).length > i) {
            net.push(
                [artifacts1[i].artifactId, artifacts2[i].artifactId]
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
                                src={ARTIFACTS[row[0]].img} 
                                alt={ARTIFACTS[row[0]].name}
                                onClick={() => handleShowCard({ id: row[0], img: ARTIFACTS[row[0]].imgCard })}
                                title={ARTIFACTS[row[0]].name}
                            />
                        </div>
                        <span>{index + 1}</span>
                        <div className={clsx(styles["drafted-artifact"])}>
                            <img 
                                src={ARTIFACTS[row[1]].img} 
                                alt={ARTIFACTS[row[1]].name}
                                onClick={() => handleShowCard({ id: row[1], img: ARTIFACTS[row[1]].imgCard })}
                                title={ARTIFACTS[row[1]].name}
                            />
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

export default DraftNet;