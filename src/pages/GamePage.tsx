import { useAppDispatch, useAppSelector } from "@/app/store";
import DraftScreen from "@/features/game/components/draft/draft-screen/DraftScreen";
import { useGameSocket } from "@/features/game/hooks/useGameSocket";
import { useGameSocketProvider } from "@/features/game/hooks/useGameSocketProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { PHASE } from "@/features/game/types/state/phase";
import GameScreen from "@/features/game/components/game/game-screen/GameScreen";
import { TimerService } from "@/features/game/helpers/timerHelper";


function GamePage() {
    const { id } = useParams<{ id: string }>();
    const gameState = useAppSelector((state) => state.game.gameState);
    const {} = useGameSocketProvider();
    const isConnected = useAppSelector((state) => state.connectSocket.isConnected)
    const dispatch = useAppDispatch();

    useEffect(() => {
        TimerService.getInstance().init(dispatch);
    }, [dispatch]);

    const { 
        joinGame
    } = useGameSocket();

    useEffect(() => {
        if (isConnected && id) {
            console.log("Присоединение к игре");
            joinGame(id)
        }
    }, [isConnected])


    if (gameState === null) {
        return <h1>Загрузка игры...</h1>
    }

    return (
        <div className={clsx("content")}>
            {gameState.phase === PHASE.DRAFT && (
                <DraftScreen />
            )}
            {gameState.phase === PHASE.BATTLE && (
                <GameScreen />
            )}
            
        </div>
    );
}

export default GamePage;