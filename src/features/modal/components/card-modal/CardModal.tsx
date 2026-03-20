import clsx from "clsx";
import { useEffect } from "react";
import styles from "./CardModal.module.css"
import type { CardForView } from "../../../game/types/card";
import ReactDOM from 'react-dom';
import ParallaxImage from "../parallax-image/ParallaxImage";
import Cross from "@assets/icons/x-button.png";

interface CardModelProps {
    card: CardForView | null;
    isOpen: boolean;
    onClose: () => void;
    actions: React.ReactNode;
}

const CardModel = (props: CardModelProps) => {
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
    
    const modalContent = (
        <div className={styles["modal-overlay"]} onClick={props.onClose}>
            <div className={styles["modal-content"]} onClick={e => e.stopPropagation()}>
                <div className={styles["modal-body"]}>
                    <div className={clsx(styles["modal-card-wrapper"])}>
                        <button 
                            className={styles["close-button"]}
                            onClick={props.onClose}
                            aria-label="Закрыть"
                        >
                            <img src={Cross} alt="" />
                        </button>
                        
                        <ParallaxImage
                            width={330}
                            height={440}
                            src={props.card.img} 
                            className={styles["card-img"]}
                        />
                        
                        {props.actions && (
                            <div className={styles["actions-wrapper"]}>
                                {props.actions}
                            </div>
                        )}
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

export default CardModel;