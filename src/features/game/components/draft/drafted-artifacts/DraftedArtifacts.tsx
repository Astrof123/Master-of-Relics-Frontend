import { useAppSelector } from "@/app/store";
import { CONNECTIONGAME } from "../../../types/game";
import React from "react";
import clsx from "clsx";
import styles from "./DraftedArtifacts.module.css"
import { useNavigate } from "react-router-dom";
import DraftNet from "../draft-net/DraftNet";
import { useDraftSocket } from "@/features/game/hooks/useDraftSocket";


function DraftedArtifacts() {
    const playersOnline = useAppSelector((state) => state.game.playersOnline);
    const gameState = useAppSelector((state) => state.game.gameState);
    const navigate = useNavigate();
    const { toggleReadyDraft } = useDraftSocket();

    if (gameState === null) {
        return;
    }

    return (
        <div>
            <button type="button" onClick={() => navigate("/")}>Выйти</button>
            <p>
                Подключения игроков: <br />
                {Object.entries(playersOnline).map((playerOnline) => (
                    <React.Fragment key={playerOnline[0] + "connection"}>
                        <span >
                            {playerOnline[0]}: {playerOnline[1] === CONNECTIONGAME.ONLINE ? "🟢" : "🔴"}
                        </span>
                        <br />                    
                    </React.Fragment>
                ))}
            </p>   
            <p>
                Фаза:
                {gameState.phase}    
            </p>
            <DraftNet 
                playerArtifacts={gameState.player.artifacts} 
                enemyArtifacts={gameState.enemy.artifacts} 
            />
            <h3>{gameState.enemy.isReady ? "Противник уже сделал выбор" : "Противник выбирает..."}</h3>
            {gameState.player.isReady ? (
                <button onClick={() => toggleReadyDraft(gameState.id)} type="button">Отменить выбор</button>
            ) : (
                <button onClick={() => toggleReadyDraft(gameState.id)} type="button">Закончить выбор</button>
            )}
            
        </div>
    );
}

export default DraftedArtifacts;