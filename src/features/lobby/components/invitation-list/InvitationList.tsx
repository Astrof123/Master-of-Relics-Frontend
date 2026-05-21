import { useAppSelector } from "@/app/store";
import { useLobbySocket } from "../../hooks/useLobbySocket";
import styles from "./InvitationList.module.css";
import { useState } from "react";
import UserImg from "@assets/icons/user2.png";

function InvitationList() {
    const invitations = useAppSelector(state => state.lobby.invitations);
    const { declineInvitation, joinLobbyByInvitation } = useLobbySocket();
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleAccept = async (invitationId: string) => {
        setProcessingId(invitationId);
        await joinLobbyByInvitation(invitationId);
        setProcessingId(null);
    };

    const handleDecline = async (invitation: any) => {
        setProcessingId(invitation.id);
        await declineInvitation(invitation);
        setProcessingId(null);
    };

    if (invitations.length === 0) {
        return null;
    }

    return (
        <div className={styles["invitation-container"]}>
            <div className={styles["invitation-header"]}>
                <h3 className={styles["header-title"]}>Приглашения в битву</h3>
            </div>
            
            <div className={styles["invitation-list"]}>
                {invitations.map((invitation) => (
                    <div key={invitation.id} className={styles["invitation-card"]}>
                        <div className={styles["invitation-avatar"]}>
                            <img src={UserImg} alt="" />
                        </div>
                        <div className={styles["invitation-info"]}>
                            <span className={styles["invitation-nickname"]}>
                                {invitation.requesterNickname}
                            </span>
                            <span className={styles["invitation-text"]}>
                                приглашает вас сразится
                            </span>
                        </div>
                        <div className={styles["invitation-buttons"]}>
                            <button 
                                className={styles["accept-btn"]}
                                onClick={() => handleAccept(invitation.id)}
                                disabled={processingId === invitation.id}
                            >
                                {processingId === invitation.id ? (
                                    <span className={styles["loader"]}></span>
                                ) : (
                                    <>Принять</>
                                )}
                            </button>
                            <button 
                                className={styles["decline-btn"]}
                                onClick={() => handleDecline(invitation)}
                                disabled={processingId === invitation.id}
                            >
                                Отклонить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InvitationList;