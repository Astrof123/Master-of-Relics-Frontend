import clsx from "clsx";
import styles from "./DraftDeck.module.css"
import { ARTIFACTS } from "../../../constants/artifacts";
import type { CardForView } from "../../../types/card";
import { useAppSelector } from "@/app/store";
import type { DeckArtifact } from "@/features/game/types/state/game";

interface DraftDeckProps {
    onHandleCardClick: (card: CardForView) => void;
    isYour: boolean;
    deck: DeckArtifact[];
}

const DraftDeck = (props: DraftDeckProps) => {
    const pickedArtifact = useAppSelector(state => state.game.gameState?.player.draft.pickedArtifact)

    const artifactStyle = (artifactId: string) => {
        const stylesList = [styles.artifact]

        if (pickedArtifact === artifactId && props.isYour) {
            stylesList.push(styles["artifact--picked"])
        }

        return stylesList;
    }

    return (
        <div className={clsx(styles.deck, !props.isYour && styles.isYour)}>
            <h3>{props.isYour ? "Ваша колода:" : "Колода соперника:"}</h3>
            {props.deck.map((artifact, index) => (
                <div key={index + "draft"} className={clsx(artifactStyle(artifact.artifactId))}>
                    <img
                        src={ARTIFACTS[artifact.artifactId].imgBattle} 
                        alt={ARTIFACTS[artifact.artifactId].name}
                        onClick={() => props.onHandleCardClick({ id: artifact.artifactId, img: ARTIFACTS[artifact.artifactId].imgCard })}
                        title={ARTIFACTS[artifact.artifactId].name}
                    />
                    <span 
                        className={clsx(styles.hp, artifact.maxHp >= 100 ? styles["hp--high"] : styles["hp--low"])}>
                            {artifact.maxHp}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default DraftDeck;