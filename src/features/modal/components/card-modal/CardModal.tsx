import clsx from "clsx";
import { useEffect } from "react";
import styles from "./CardModal.module.css"
import type { CardForView } from "../../../game/types/card";
import ReactDOM from 'react-dom';
import ParallaxImage from "../parallax-image/ParallaxImage";


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
        <div className="modal-overlay" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-body">
                    <div className={clsx(styles["modal-card-wrapper"])}>
                        <ParallaxImage src={props.card.img}  />
                        {/* <img 
                            className={clsx(styles["card-img"])}
                            src={props.card.img} 
                        /> */}
                        {props.actions !== null && (
                            <div>
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