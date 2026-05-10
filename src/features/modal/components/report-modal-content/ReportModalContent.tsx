import { useProfile } from '@/features/profile/hooks/useProfile';
import type { ModalReportDetails } from '../../types/details';
import styles from './ReportModalContent.module.css';
import type { SendReportUserData } from '@/features/profile/types/requests';
import { REPORT_TYPE } from '@/features/profile/types/report';
import { REPORT_TYPE_NAMING } from '@/features/profile/constants/report';
import { useState } from 'react';
import clsx from 'clsx';
import WarningImg from "@assets/icons/warning.png";
import { useAppDispatch } from '@/app/store';
import { setIsReported } from '@/features/profile/store/profileSlice';

interface ReportModalProps {
    onClose: () => void;
    details: ModalReportDetails;
}

const ReportModalContent = (props: ReportModalProps) => {
    const { handleSendReport } = useProfile();
    const [selectedType, setSelectedType] = useState<string>(REPORT_TYPE.OBSTRUCTION_OF_PLAY);
    const [reportText, setReportText] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>("");
    const dispatch = useAppDispatch();

    const handleReportClick = async () => {
        if (!reportText.trim()) {
            setError("Пожалуйста, опишите причину жалобы");
            return;
        }

        if (reportText.length < 10) {
            setError("Описание должно содержать минимум 10 символов");
            return;
        }

        if (reportText.length > 255) {
            setError("Описание не должно превышать 255 символов");
            return;
        }

        setIsSubmitting(true);
        setError("");

        const data: SendReportUserData = {
            reportedUserId: props.details.reportedUserId,
            reportType: selectedType,
            text: reportText
        }

        try {
            await handleSendReport(data);
            props.onClose();
            dispatch(setIsReported(true));
        } catch (err) {
            setError("Произошла ошибка при отправке жалобы");
        } finally {
            setIsSubmitting(false);
        }
    }

    const getReportTypeOptions = () => {
        return Object.entries(REPORT_TYPE).map(([key, value]) => ({
            value: value,
            label: REPORT_TYPE_NAMING[value] || REPORT_TYPE_NAMING[key] || value
        }));
    };

    return (
        <div className={styles["report-modal"]}>
            <div className={styles["report-header"]}>
                <img className={styles["header-icon"]} src={WarningImg} alt="" />
                <h3>Пожаловаться на игрока</h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleReportClick(); }} className={styles["report-form"]}>
                <div className={styles["form-group"]}>
                    <label className={styles["form-label"]}>
                        Тип нарушения
                    </label>
                    <div className={styles["select-wrapper"]}>
                        <select 
                            className={styles["report-select"]}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {getReportTypeOptions().map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span className={styles["select-arrow"]}>▼</span>
                    </div>
                </div>

                <div className={styles["form-group"]}>
                    <label className={styles["form-label"]}>
                        Описание нарушения
                    </label>
                    <textarea
                        className={clsx(styles["report-textarea"], error && styles["report-textarea--error"])}
                        placeholder="Подробно опишите, что произошло..."
                        value={reportText}
                        onChange={(e) => {
                            setReportText(e.target.value);
                            if (error) setError("");
                        }}
                        rows={5}
                        maxLength={255}
                    />
                    <div className={styles["textarea-counter"]}>
                        <span className={reportText.length > 200 ? styles["counter-warning"] : ""}>
                            {reportText.length}
                        </span>
                        /255 символов
                    </div>
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
                            <>
                                Отправить жалобу
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReportModalContent;