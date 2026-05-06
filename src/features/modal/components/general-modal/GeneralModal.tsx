import { useEffect } from "react";
import ReactDOM from 'react-dom';


interface GeneralModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: React.ReactNode;
    
}

const GeneralModal = (props: GeneralModalProps) => {
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

    if (!props.isOpen) {
        return null;
    }

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
                   {props.content}
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
}

export default GeneralModal;