import styles from "./FriendshipButtons.module.css";
import { RELATIONSHIP, type UserProfile } from "../../types/responses";
import type { 
    MouseEvent
} from 'react';

interface FriendshipButtonsProps {
    profileUserId: number;
    isOwnProfile: boolean;
    isLoading: boolean;
    profile: UserProfile;
    onHandleAddFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: number) => Promise<void>;
    onHandleAcceptFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: number) => Promise<void>;
    onHandleDeclineFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: number) => Promise<void>;
    onHandleRemoveFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: number) => Promise<void>;
}

const FriendshipButtons = (props: FriendshipButtonsProps) => {
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
                            // onClick={() => setShowReportModal(true)}
                        >
                            Пожаловаться
                        </button>
                    )}
                </div>
            )
        )
    );
}

export default FriendshipButtons;