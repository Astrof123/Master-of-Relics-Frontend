import clsx from "clsx";
import styles from "./DraftArtifacts.module.css"
import { useAppSelector } from "@/app/store";
import { useCallback, useState } from "react";
import type { CardForView } from "../../../types/card";
import DraftDeck from "../draft-deck/DraftDeck";
import { useDraftSocket } from "@/features/game/hooks/useDraftSocket";
import { useModal } from "@/features/modal/hooks/useModal";
import { MODALTYPE } from "@/features/modal/types/modal";
import BattleFieldTest from "../../game/battlefield-test/BattlefieldTest";


function DraftArtifacts() {
    const [isYourDeck, setIsYourDeck] = useState(true);
    const gameId = useAppSelector(state => state.game.gameState?.id);
    
    const { openCardModal } = useModal();

    const deckPlayer = useAppSelector(state => state.game.gameState?.player.draft.deck);
    const deckEnemy = useAppSelector(state => state.game.gameState?.enemy.draft.deck);

    if (!deckPlayer || !deckEnemy || !gameId) {
        return null;
    }

    const handleCardClick = useCallback((card: CardForView) => {
        const details = {
            isYourDeck,
            gameId,
        }

        openCardModal(card, MODALTYPE.DRAFT, details);
    }, [openCardModal]);


    return (  
        <div className={clsx(styles["draft-artifacts-wrapper"])}>
            {/* <div className={clsx(styles["draft-artifacts-top"])}>
                <h2>Выберите артефакт</h2>
                <button type="button" onClick={() => setIsYourDeck(!isYourDeck)}>
                    {isYourDeck ? "Посмотреть колоду соперника" : "Вернуться к своей колоде"}
                </button>
            </div> */}
            {/* {isYourDeck ? (
                <DraftDeck isYour={isYourDeck} deck={deckPlayer} onHandleCardClick={handleCardClick} />
            ): (
                <DraftDeck isYour={isYourDeck} deck={deckEnemy} onHandleCardClick={handleCardClick} />
            )} */}
            <BattleFieldTest deck={deckPlayer} />

        </div>
    );
}

export default DraftArtifacts;