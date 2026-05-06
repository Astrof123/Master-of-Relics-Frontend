import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import styles from "./SpellBookModal.module.css";
import ReactDOM from 'react-dom';
import Cross from "@assets/icons/x-button.png";
import { useAppSelector } from "@/app/store";
import { SPELLS } from "@/features/game/constants/spells";
import { SPELLTYPE } from "@/features/game/types/game/spell";
import type { SpellType } from "@/features/game/types/game/spell";
import type { SpellGameState } from "@/features/game/types/state/game";
import SpellBookImg from "@assets/icons/spellbook.png";
import { useCardModal } from "../../hooks/useCardModal";
import type { ModalSpellDetails } from "../../types/details";
import { CARD_MODAL_TYPE, type OpenCardModalData } from "../../types/modal";

interface SpellBookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SpellBookModal = (props: SpellBookModalProps) => {
    const spells = useAppSelector(state => state.game.gameState?.player.spells);
    const gameState = useAppSelector(state => state.game.gameState);
    const [activeSchool, setActiveSchool] = useState<SpellType>(SPELLTYPE.LIGHT);
    const [isAnimating, setIsAnimating] = useState(false);
    const { openCardModal } = useCardModal();
    
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

    const handleSchoolChange = (school: SpellType) => {
        if (school === activeSchool || isAnimating) return;
        
        setIsAnimating(true);
        setTimeout(() => {
            setActiveSchool(school);
            setTimeout(() => {
                setIsAnimating(false);
            }, 50);
        }, 150);
    };

    const handleCardClick = useCallback((spell: SpellGameState) => {
        const details: ModalSpellDetails = {
            spell,
            cardForView: {
                id: spell.id,
                img: SPELLS[spell.id].imgCardNoStats
            },
            gameState: gameState!
        }

        const data: OpenCardModalData = {
            details: details,
            modalType: CARD_MODAL_TYPE.SPELL,
            valueLeftTop: spell.cost,
            valueRightTop: null,
            isArtifact: false
        }

        openCardModal(data);
    }, [openCardModal]);

    if (!props.isOpen || !spells) {
        return null;
    }

    const currentSpells = Object.values(spells[activeSchool] || {});

    const modalContent = (
        <div className={styles["modal-overlay"]} onClick={props.onClose}>
            <div className={styles["modal-content"]} onClick={e => e.stopPropagation()}>
                <div className={styles["modal-body"]}>
                    <div className={clsx(styles["spellbook-wrapper"])}>
                        {/* Левая страница книги */}
                        <div className={styles["spellbook-left"]}>
                            <div className={styles["spellbook-header"]}>
                                <img className={styles["spellbook-img"]} src={SpellBookImg} alt="" />
                                <h2 className={styles["spellbook-title"]}>Книга Заклинаний</h2>
                            </div>
                            
                            {/* Школы магии */}
                            <div className={styles["schools-container"]}>
                                <button 
                                    className={clsx(
                                        styles["school-btn"],
                                        activeSchool === SPELLTYPE.LIGHT && styles["school-btn--active"],
                                        styles["school-btn--light"]
                                    )}
                                    onClick={() => handleSchoolChange(SPELLTYPE.LIGHT)}
                                >
                                    <span className={styles["school-name"]}>Свет</span>
                                </button>
                                
                                <button 
                                    className={clsx(
                                        styles["school-btn"],
                                        activeSchool === SPELLTYPE.DARK && styles["school-btn--active"],
                                        styles["school-btn--dark"]
                                    )}
                                    onClick={() => handleSchoolChange(SPELLTYPE.DARK)}
                                >
                                    <span className={styles["school-name"]}>Тьма</span>
                                </button>
                                
                                <button 
                                    className={clsx(
                                        styles["school-btn"],
                                        activeSchool === SPELLTYPE.DESTRUCTION && styles["school-btn--active"],
                                        styles["school-btn--destruction"]
                                    )}
                                    onClick={() => handleSchoolChange(SPELLTYPE.DESTRUCTION)}
                                >
                                    <span className={styles["school-name"]}>Разрушение</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Правая страница книги - список заклинаний */}
                        <div className={clsx(styles["spellbook-right"], isAnimating && styles["spellbook-right--animating"])}>
                            <div className={clsx(styles["spells-grid"], isAnimating && styles["spells-grid--exit"])}>
                                {currentSpells.length > 0 ? (
                                    currentSpells.map((spell: SpellGameState, index: number) => (
                                        <div
                                            onClick={() => handleCardClick(spell)}
                                            key={spell.id} 
                                            className={clsx(
                                                styles["spell-card"],
                                                isAnimating && styles["spell-card--exit"])}
                                            style={{ animationDelay: isAnimating ? `${index * 30}ms` : '0ms' }}
                                        >
                                            <div className={clsx(!spell.canUse && styles["spell-card--unavailable"])}>
                                                <img 
                                                    src={SPELLS[spell.id]?.imgCardNoStats} 
                                                    alt={SPELLS[spell.id]?.name}
                                                    className={styles["spell-image"]}
                                                />
                                                <span className={clsx(styles["spell-cost"], spell.cost < 10 ? styles["spell-cost--low"] : styles["spell-cost--high"])}>
                                                    {spell.cost}
                                                </span>
                                            </div>
                                            {spell.cooldown && (
                                                <div className={styles["overlay"]}>
                                                    <div className={styles["cooldown-wrapper"]}>
                                                        <span className={styles["cooldown"]}>Перезарядка</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className={clsx(styles["empty-spells"], isAnimating && styles["empty-spells--exit"])}>
                                        <span className={styles["empty-icon"]}>📜</span>
                                        <p>Нет заклинаний в этой школе</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Кнопка закрытия */}
                        <button 
                            className={styles["close-button"]}
                            onClick={props.onClose}
                            aria-label="Закрыть"
                        >
                            <img src={Cross} alt="" />
                        </button>
                        
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

export default SpellBookModal;