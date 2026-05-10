import styles from "./FriendshipButtons.module.css";
import { RELATIONSHIP, type UserProfile } from "../../types/responses";
import type { 
    MouseEvent
} from 'react';
import { useGeneralModal } from "@/features/modal/hooks/useGeneralModal";
import { GENERAL_MODAL_TYPE, type OpenGeneralModalData } from "@/features/modal/types/modal";
import type { ModalBanDetails, ModalReportDetails } from "@/features/modal/types/details";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useProfile } from "../../hooks/useProfile";
import type { UnbanUserData } from "../../types/requests";
import { setIsBanned } from "../../store/profileSlice";

interface FriendshipButtonsProps {
    profileUserId: string;
    isOwnProfile: boolean;
    isLoading: boolean;
    profile: UserProfile;
    onHandleAddFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: string) => Promise<void>;
    onHandleAcceptFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: string) => Promise<void>;
    onHandleDeclineFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: string) => Promise<void>;
    onHandleRemoveFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: string) => Promise<void>;
}

const FriendshipButtons = (props: FriendshipButtonsProps) => {
    const { openGeneralModal } = useGeneralModal();
    const { handleUnbanUser } = useProfile();
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    
    const handleReportClick = () => {
        const details: ModalReportDetails = {
            reportedUserId: props.profileUserId
        }

        const data: OpenGeneralModalData = {
            details: details,
            modalType: GENERAL_MODAL_TYPE.REPORT
        }

        openGeneralModal(data);
    }

    const handleBanClick = () => {
        const details: ModalBanDetails = {
            bannedUserId: props.profileUserId
        }

        const data: OpenGeneralModalData = {
            details: details,
            modalType: GENERAL_MODAL_TYPE.BAN
        }

        openGeneralModal(data);
    }

    const handleUnbanClick = async () => {
        const data: UnbanUserData = {
            bannedUserId: props.profileUserId
        }

        try {
            await handleUnbanUser(data);
            dispatch(setIsBanned(false));
        }
        catch {

        }
    }

    return (
        !props.isOwnProfile && (
            props.isLoading ? (
                <span>Загрузка...</span>
            ) : (
                <div className={styles["action-buttons"]}>
                    {props.profile.relationship === RELATIONSHIP.STRANGER ? (
                        <button 
                            className={styles["friend-btn"]}
                            onClick={(e) => props.onHandleAddFriendClick(e, props.profile.id)}
                        >
                            Добавить в друзья
                        </button>
                    ) : props.profile.relationship === RELATIONSHIP.OFFER ? (
                        props.profile.relationshipInitiator === props.profile.id ? (
                            <div className={styles["friend-inner-btns"]}>
                                <button 
                                    className={styles["friend-btn"]}
                                    onClick={(e) => props.onHandleAcceptFriendClick(e, props.profile.id)}
                                >
                                    Принять дружбу
                                </button>
                                <button 
                                    className={styles["friend-btn-remove"]}
                                    onClick={(e) => props.onHandleDeclineFriendClick(e, props.profile.id)}
                                >
                                    Отклонить дружбу
                                </button>
                            </div>

                        ) : (
                            <button className={styles["friend-btn-pending"]} disabled>
                                Заявка отправлена
                            </button>
                        ) 
                    ) : (
                        <button 
                            className={styles["friend-btn-remove"]}
                            onClick={(e) => props.onHandleRemoveFriendClick(e, props.profile.id)}
                        >
                            Удалить из друзей
                        </button>
                    )}
                    
                    {props.profile.isReported ? (
                        <button className={styles["report-btn-disabled"]} disabled>
                            Жалоба отправлена
                        </button>
                    ) : (
                        <button 
                            className={styles["report-btn"]}
                            onClick={handleReportClick}
                        >
                            Пожаловаться
                        </button>
                    )}

                    {(user && user.isAdmin) && (
                        props.profile.isBanned ? (
                            <button onClick={handleUnbanClick} className={styles["unban-btn"]}>
                                Разбанить
                            </button>
                        ) : (
                            <button 
                                className={styles["ban-btn"]}
                                onClick={handleBanClick}
                            >
                                Забанить
                            </button>
                        )
                    )}

                </div>
            )
        )
    );
}

export default FriendshipButtons;
