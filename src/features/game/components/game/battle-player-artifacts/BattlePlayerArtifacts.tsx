import { LINE, type ArtifactGameState } from "@/features/game/types/state/game";
import BattleArtifact from "../battle-artifact/BattleArtifact";
import type { EnemyArtifact } from "@/features/game/types/state/game-for-client";
import clsx from "clsx";
import styles from "./BattlePlayerArtifacts.module.css";

export interface BattlePlayerArtifactsProps {
    artifacts: ArtifactGameState[] | EnemyArtifact[];
    isYour: boolean;
}

const BattlePlayerArtifacts = (props: BattlePlayerArtifactsProps) => {
    let topLine = props.isYour ? LINE.FRONT : LINE.BACK;
    let bottomLine = props.isYour ? LINE.BACK : LINE.FRONT;

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles["artifacts-row"], styles["back-line"])}>
                {props.artifacts
                    .filter(artifact => artifact.line === topLine)
                    .sort((a1, a2) => a1.position - a2.position)
                    .map((artifact, index) => (
                        <BattleArtifact
                            key={artifact.id}
                            artifact={artifact}
                            index={index}
                            line={artifact.line}
                            isYour={props.isYour}
                        />
                    ))}
            </div>
            <div className={clsx(styles["artifacts-row"], styles["front-line"])}>
                {props.artifacts
                    .filter(artifact => artifact.line === bottomLine)
                    .sort((a1, a2) => a1.position - a2.position)
                    .map((artifact, index) => (
                        <BattleArtifact
                            key={artifact.id}
                            artifact={artifact}
                            index={index}
                            line={artifact.line}
                            isYour={props.isYour}
                        />
                    ))}
            </div>
        </div>
    );
};

export default BattlePlayerArtifacts;