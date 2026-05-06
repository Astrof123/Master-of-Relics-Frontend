import { useMemo } from "react";
import { useGeneralModal } from "../../hooks/useGeneralModal";
import { GENERAL_MODAL_TYPE } from "../../types/modal";
import GeneralModal from "../general-modal/GeneralModal";
import ReportModalContent from "../report-modal-content/ReportModalContent";
import type { ModalBanDetails, ModalReplaceCardDetails, ModalReportDetails } from "../../types/details";
import BanModalContent from "../ban-modal-content/BanModalContent";
import ReplaceCardModalContent from "../replace-card-modal-content/ReplaceCardModalContent";

const GeneralModalManager = () => {
    const { 
        modalType, 
        isOpen, 
        details,
        closeGeneralModal,
    } = useGeneralModal();
    
    
    const content = useMemo(() => {
        if (modalType === GENERAL_MODAL_TYPE.REPORT) {
            const detailsContent = details as ModalReportDetails;
            return <ReportModalContent details={detailsContent} onClose={closeGeneralModal} />;
        }
        else if (modalType === GENERAL_MODAL_TYPE.BAN) {
            const detailsContent = details as ModalBanDetails;
            return <BanModalContent details={detailsContent} onClose={closeGeneralModal} />;
        }
        else if (modalType === GENERAL_MODAL_TYPE.REPLACE_DECK_CARD) {
            const detailsContent = details as ModalReplaceCardDetails;
            return <ReplaceCardModalContent details={detailsContent} onClose={closeGeneralModal} />;
        }

        return null;
    }, [modalType, isOpen]);
    
    if (!isOpen) return null;

    return (
        <>
            <GeneralModal
                isOpen={isOpen}
                onClose={closeGeneralModal}
                content={content} 
            />
        </>
    );
};

export default GeneralModalManager;