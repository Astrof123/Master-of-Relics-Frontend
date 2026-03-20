import clsx from "clsx";
import { useEffect } from "react";
import styles from "./BattleCardModal.module.css"
import type { CardForView } from "../../../game/types/card";
import ReactDOM from 'react-dom';
import ParallaxImage from "../parallax-image/ParallaxImage";
import { EFFECTS } from "@/features/game/constants/effects";
import type { EnemyForClient, GameForClient } from "@/features/game/types/state/game-for-client";
import { FACES } from "@/features/game/constants/faces";
import type { Player } from "@/features/game/types/state/game";
import Heart from "@assets/icons/heart.jpg"

interface BattleCardModelProps {
    card: CardForView | null;
    artifactGameId: string;
    gameState: GameForClient;
    player: Player | EnemyForClient
    isOpen: boolean;
    onClose: () => void;
    actions: React.ReactNode;
}

const BattleCardModel = (props: BattleCardModelProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        };

        if (props.isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [props.isOpen, props.onClose]);

    if (!props.isOpen || !props.card) {
        return null;
    }

    const artifactEffects = props.player.artifacts[props.artifactGameId].effects;
    const faceId = props.player.artifacts[props.artifactGameId].face;
    const currentHp = props.player.artifacts[props.artifactGameId].currentHp;
    const maxHp = props.player.artifacts[props.artifactGameId].maxHp;

    const modalContent = (
        <div 
            className="modal-overlay" 
            onClick={props.onClose}
        >
            <div 
                className="modal-content" 
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-body">
                    <div className={clsx(styles["modal-card-wrapper"])}>    
                        <div className={clsx(styles["modal-card-inner-wrapper"])}>
                            <div className={clsx(styles["modal-card-info-wrapper"])}>
                                <img className={clsx(styles.face)} src={FACES[faceId].img} alt={"face"} />
                                <div className={clsx(styles["buffs"])}>
                                    <span className={clsx(styles["effect-title"])}>Эффекты:</span>
                                    <div title={"Максимальная прочность"} className={clsx(styles["buff-wrapper"])}>
                                        <span>{maxHp}</span>
                                        <img
                                            src={Heart}
                                            className={clsx(styles.buff, styles["buff--positive"])}  
                                        />
                                    </div>
                                    {artifactEffects.map((effect) => (
                                        <div key={effect.id} title={EFFECTS[effect.id].title} className={clsx(styles["buff-wrapper"])}>
                                            <span>{effect.number}</span>
                                            <img
                                                src={EFFECTS[effect.id].img} 
                                                alt={EFFECTS[effect.id].name}
                                                className={clsx(styles.buff, effect.type === "negative" ? styles["buff--negative"] : styles["buff--positive"])}  
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={clsx(styles["parallax"])}>
                                <ParallaxImage width={330} height={440} currentHp={currentHp} src={props.card.img}  />
                            </div>
                            {props.actions !== null && (
                                <div className={clsx(styles["actions"])}>
                                    {props.actions}
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
}

export default BattleCardModel;