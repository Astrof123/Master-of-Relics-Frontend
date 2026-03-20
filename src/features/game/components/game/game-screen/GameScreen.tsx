import BattleField from "../battlefield/Battlefield";
import PlayerPanel from "../player-panel/PlayerPanel";
import styles from "./GameScreen.module.css";
import clsx from "clsx";
import FightBackground from "@assets/fight-background.jpg";

function GameScreen() {
    const body = document.body;
    body.style.backgroundImage = `url(${FightBackground})`;


    return (
        <div className={clsx(styles["game-content"])}>
            <PlayerPanel isYour={false}/>
            <BattleField />
            <PlayerPanel isYour={true}/>
        </div>
    );
}

export default GameScreen;