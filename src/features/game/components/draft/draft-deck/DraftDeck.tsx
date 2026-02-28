import clsx from "clsx";
import styles from "./DraftDeck.module.css"
import { ARTIFACTS } from "../../../constants/artifacts";
import type { CardForView } from "../../../types/card";
import { useAppSelector } from "@/app/store";


interface DraftDeckProps {
    onHandleCardClick: (card: CardForView) => void;
    isYour: boolean;
    deck: number[];
}


const DraftDeck = (props: DraftDeckProps) => {
    const pickedArtifact = useAppSelector(state => state.game.gameState?.player.draft.pickedArtifact)


    const artifactStyle = (artifactId: number) => {
        const stylesList = [styles.artifact]

        if (pickedArtifact === artifactId && props.isYour) {
            stylesList.push(styles["artifact--picked"])
        }

        return stylesList;
    }

    return (
        <>
            {/* <h3>{props.isYour ? "Ваша колода" : "Колода соперника"}:</h3> */}
            <div className={clsx(styles.deck)}>
                {props.deck.map((artifactId, index) => (
                    <div key={index + "draft"}>
                        <img
                            className={clsx(artifactStyle(artifactId))}
                            src={ARTIFACTS[artifactId].imgCard} 
                            alt={ARTIFACTS[artifactId].name}
                            onClick={() => props.onHandleCardClick({ id: artifactId, img: ARTIFACTS[artifactId].imgCard })}
                        />
                    </div>
                ))}
            </div>
            <div className={clsx(styles.deck)}>
                {props.deck.map((artifactId, index) => (
                    <div key={index + "draft"}>
                        <img
                            className={clsx(artifactStyle(artifactId))}
                            src={ARTIFACTS[artifactId].imgCard} 
                            alt={ARTIFACTS[artifactId].name}
                            onClick={() => props.onHandleCardClick({ id: artifactId, img: ARTIFACTS[artifactId].imgCard })}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default DraftDeck;