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
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles["artifacts-row"])}>
                {props.artifacts.map((artifact, index) => {
                    const line = props.isYour ? LINE.FRONT : LINE.BACK;

                    if (artifact.line === line) {
                        return (
                            <BattleArtifact
                                key={artifact.id}
                                artifact={artifact}
                                index={index}
                                line={artifact.line}
                                isYour={props.isYour}
                            />
                        )
                    }
                    else {
                        return null;
                    }
                })}
            </div>
            <div className={clsx(styles["artifacts-row"])}>
                {props.artifacts.map((artifact, index) => {
                    const line = props.isYour ? LINE.BACK : LINE.FRONT;

                    if (artifact.line === line) {
                        return (
                            <BattleArtifact
                                key={artifact.id}
                                artifact={artifact}
                                index={index}
                                line={artifact.line}
                                isYour={props.isYour}
                            />
                        )
                    }
                    else {
                        return null;
                    }
                })}
            </div>
        </div>
    )
}

export default BattlePlayerArtifacts;