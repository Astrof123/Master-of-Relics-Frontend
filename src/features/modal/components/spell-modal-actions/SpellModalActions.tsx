import { useAppSelector } from '@/app/store';
import type { ModalSpellDetails } from '../../types/details';
import clsx from 'clsx';
import styles from "./SpellModalActions.module.css";
import { useAction } from '@/features/action/hooks/useAction';

interface SpellModalActionsProps {
    details: ModalSpellDetails;
    onClose: () => void;
}

const SpellModalActions = ({ details, onClose }: SpellModalActionsProps) => {
    const movePoints = useAppSelector(state => state.game.gameState?.player.movePoints);
    const { useSpell } = useAction();

    const handleSpellAction = () => {
        useSpell(
            details.gameState!.id,
            details.spell,
            onClose
        );
    }

    return (
        <div className={clsx(styles["actions"])}>
            <h2 className={clsx(styles["main-title"])}>
                Выберите действие:
            </h2>
            <div className={clsx(styles["button-wrapper"])}>
                <button 
                    onClick={handleSpellAction}
                    disabled={details.spell.canUse && movePoints! > 0 ? false : true}
                    className={clsx(styles.action)}
                >
                    {details.spell.description}
                </button>
                {movePoints! <= 0 && (
                    <span>У вас закончились очки действия</span>
                )}
            </div>
        </div>
    );
};

export default SpellModalActions;