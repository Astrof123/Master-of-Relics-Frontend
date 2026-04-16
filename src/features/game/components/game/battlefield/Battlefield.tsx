import clsx from "clsx";
import styles from "./Battlefield.module.css"
import { useMemo } from "react";
import { useAppSelector } from "@/app/store";
import type { GameForClient } from "@/features/game/types/state/game-for-client";
import BattlePlayerArtifacts from "../battle-player-artifacts/BattlePlayerArtifacts";
import Clue from "../clue/Clue";
import { MINIPHASE } from "@/features/game/types/state/phase";
import MovableBattlePlayerArtifacts from "../movable-battle-player-artifacts/MovableBattlePlayerArtifacts";

const BattleField = () => {
    const gameState = useAppSelector(state => state.game.gameState) as GameForClient;
    const isMoving = useAppSelector(state => state.game.isMoving);
    
    let playerArtifacts;
    let enemyArtifacts;

    if (gameState.miniPhase === MINIPHASE.MOVEMENT || isMoving) {
        playerArtifacts = useMemo(() => 
            Object.values(gameState.player.temporaryArtifacts!),
            [gameState.player.temporaryArtifacts]
        );

        enemyArtifacts = useMemo(() => 
            Object.values(gameState.enemy.artifacts),
            [gameState.enemy.artifacts]
        );
    }
    else {
        playerArtifacts = useMemo(() => 
            Object.values(gameState.player.artifacts),
            [gameState.player.artifacts]
        );

        enemyArtifacts = useMemo(() => 
            Object.values(gameState.enemy.artifacts),
            [gameState.enemy.artifacts]
        );
    }


    return (
        <div className={clsx(styles["container"])}>
            <BattlePlayerArtifacts 
                isYour={false} 
                artifacts={enemyArtifacts} 
            />
            
            <Clue gameState={gameState} />
            
            {(gameState.miniPhase === MINIPHASE.MOVEMENT && !gameState.player.isReady) || isMoving ? (
               <MovableBattlePlayerArtifacts
                    artifacts={playerArtifacts}
                />
            ) : (
                <BattlePlayerArtifacts
                    isYour={true} 
                    artifacts={playerArtifacts}
                />
            )}

        </div>
    );
};

export default BattleField;