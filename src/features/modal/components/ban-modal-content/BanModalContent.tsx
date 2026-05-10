import { useProfile } from '@/features/profile/hooks/useProfile';
import type { ModalBanDetails } from '../../types/details';
import styles from './BanModalContent.module.css';
import type { BanUserData } from '@/features/profile/types/requests';
import { useState } from 'react';
import clsx from 'clsx';
import WarningImg from "@assets/icons/warning.png";
import { useAppDispatch } from '@/app/store';
import { setIsBanned } from '@/features/profile/store/profileSlice';

interface BanModalProps {
    onClose: () => void;
    details: ModalBanDetails;
}

const BanModalContent = (props: BanModalProps) => {
    const { handleBanUser } = useProfile();
    const [banText, setBanText] = useState<string>("");
    const [banUntil, setBanUntil] = useState<string>(() => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split('T')[0];
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>("");
    const dispatch = useAppDispatch();

    const handleBanClick = async () => {
        if (!banText.trim()) {
            setError("Пожалуйста, укажите причину бана");
            return;
        }

        if (banText.length < 10) {
            setError("Причина должна содержать минимум 10 символов");
            return;
        }

        if (banText.length > 255) {
            setError("Причина не должна превышать 255 символов");
            return;
        }

        if (!banUntil) {
            setError("Пожалуйста, выберите дату окончания бана");
            return;
        }

        setIsSubmitting(true);
        setError("");

        const data: BanUserData = {
            bannedUserId: props.details.bannedUserId,
            bannedUntil: banUntil,
            text: banText
        }

        try {
            await handleBanUser(data);
            props.onClose();
            dispatch(setIsBanned(true));
        } catch (err) {
            setError("Произошла ошибка при отправке бана");
        } finally {
            setIsSubmitting(false);
        }
    }

    const getMinDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className={styles["ban-modal"]}>
            <div className={styles["ban-header"]}>
                <img className={styles["header-icon"]} src={WarningImg} alt="" />
                <h3>Забанить игрока</h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleBanClick(); }} className={styles["ban-form"]}>
                <div className={styles["form-group"]}>
                    <label className={styles["form-label"]}>
                        Причина бана
                    </label>
                    <textarea
                        className={clsx(styles["ban-textarea"], error && styles["ban-textarea--error"])}
                        placeholder="Подробно опишите причину бана..."
                        value={banText}
                        onChange={(e) => {
                            setBanText(e.target.value);
                            if (error) setError("");
                        }}
                        rows={5}
                        maxLength={255}
                    />
                    <div className={styles["textarea-counter"]}>
                        <span className={banText.length > 200 ? styles["counter-warning"] : ""}>
                            {banText.length}
                        </span>
                        /255 символов
                    </div>
                </div>

                <div className={styles["form-group"]}>
                    <label className={styles["form-label"]}>
                        Дата окончания бана
                    </label>
                    <input
                        type="date"
                        className={styles["ban-date-input"]}
                        value={banUntil}
                        onChange={(e) => setBanUntil(e.target.value)}
                        min={getMinDate()}
                    />
                </div>

                {error && (
                    <div className={styles["error-message"]}>
                        <img className={styles["error-icon"]} src={WarningImg} alt="" />
                        {error}
                    </div>
                )}

                <div className={styles["modal-buttons"]}>
                    <button 
                        type="button" 
                        className={styles["cancel-btn"]}
                        onClick={props.onClose}
                        disabled={isSubmitting}
                    >
                        Отмена
                    </button>
                    <button 
                        type="submit" 
                        className={styles["submit-btn"]}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className={styles["spinner"]}></span>
                                Отправка...
                            </>
                        ) : (
                            <>Забанить</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BanModalContent;