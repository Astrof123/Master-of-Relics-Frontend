import type { GameForClient } from "@/features/game/types/state/game-for-client";
import styles from "./GameResult.module.css"
import clsx from "clsx";
import Coin from "@assets/icons/coin.png";
import Trophy from "@assets/icons/trophy.png";
import Skull from "@assets/icons/skull.png";
import Handshake from "@assets/icons/handshake.png";

interface GameResultProps {
    gameState: GameForClient
}

const GameResult = (props: GameResultProps) => {
    let result;
    let prize;
    let resultClass = "";
    let prizeClass = "";

    if (props.gameState.end!.winner === null) {
        result = "Ничья";
        prize = props.gameState.end!.draw_prize;
        resultClass = "result-draw";
        prizeClass = "prize-draw";
    }
    else {
        if (props.gameState.end!.winner === props.gameState.player.id) {
            result = "Победа";
            prize = props.gameState.end!.winner_prize;
            resultClass = "result-win";
            prizeClass = "prize-win";
        }
        else {
            result = "Поражение";
            prize = props.gameState.end!.loser_prize;                
            resultClass = "result-lose";
            prizeClass = "prize-lose";
        }
    }

    return (
        <div className={styles["endgame-container"]}>
            <div className={clsx(styles["endgame-result"], styles[resultClass])}>
                <span className={styles["result-icon"]}>
                    {result === "Победа" && (
                        <img className={styles["result-icon"]} src={Trophy} alt="" />
                    )}
                    {result === "Поражение" && (
                        <img className={styles["result-icon"]} src={Skull} alt="" />
                    )}
                    {result === "Ничья" && (
                        <img className={styles["result-icon"]} src={Handshake} alt="" />
                    )}
                </span>
                <span className={styles["result-text"]}>{result}</span>
            </div>
            <div className={clsx(styles["endgame-prize"], styles[prizeClass])}>
                <img className={clsx(styles["prize-img"])} src={Coin} alt="" />
                <span className={styles["prize-text"]}>Вы получили {prize} золота</span>
            </div>
        </div>
    )
}

export default GameResult;