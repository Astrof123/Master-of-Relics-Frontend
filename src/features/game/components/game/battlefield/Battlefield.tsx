import clsx from "clsx";
import styles from "./Battlefield.module.css"
import { useMemo } from "react";
import { useAppSelector } from "@/app/store";
import type { GameForClient } from "@/features/game/types/state/game-for-client";
import BattlePlayerArtifacts from "../battle-player-artifacts/BattlePlayerArtifacts";
import Clue from "../clue/Clue";


const BattleField = () => {
    const gameState = useAppSelector(state => state.game.gameState) as GameForClient;
    
    const playerArtifacts = useMemo(() => 
        Object.values(gameState.player.artifacts),
        [gameState.player.artifacts]
    );

    const enemyArtifacts = useMemo(() => 
        Object.values(gameState.enemy.artifacts),
        [gameState.enemy.artifacts]
    );

    return (
        <div className={clsx(styles["container"])}>
            <BattlePlayerArtifacts isYour={false} artifacts={enemyArtifacts} />
            <Clue gameState={gameState} />
            <BattlePlayerArtifacts isYour={true} artifacts={playerArtifacts} />
        </div>
    );
};

export default BattleField;