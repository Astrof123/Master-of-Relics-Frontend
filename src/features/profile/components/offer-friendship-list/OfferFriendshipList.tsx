import { Link } from "react-router-dom";
import type { UserProfile } from "../../types/responses";
import styles from "./OfferFriendshipList.module.css";
import UserImg from "@assets/icons/user2.png";
import type { 
    MouseEvent
} from 'react';

interface OfferFriendshipListProps {
    isOwnProfile: boolean;
    profile: UserProfile;
    onHandleAcceptFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: string) => Promise<void>;
    onHandleDeclineFriendClick: (e: MouseEvent<HTMLButtonElement>, friendId: string) => Promise<void>;
}

const OfferFriendshipList = (props: OfferFriendshipListProps) => {
    
    return (
        props.isOwnProfile && props.profile.offersFriendship && props.profile.offersFriendship.length > 0 && (
            <div className={styles["offers-section"]}>
                <h3 className={styles["offers-title"]}>
                    Заявки в друзья ({props.profile.offersFriendship.length})
                </h3>
                <div className={styles["offers-list"]}>
                    {props.profile.offersFriendship.map((offer) => (
                        <Link to={`/profile/${offer.requesterId}`} key={offer.id}>
                            <div className={styles["offer-card"]}>
                                <div className={styles["offer-info"]}>
                                    <div className={styles["offer-avatar"]}>
                                        <img src={UserImg} alt="" />
                                    </div>
                                    <span className={styles["offer-nickname"]}>{offer.nickname}</span>
                                </div>
                                <div className={styles["offer-buttons"]}>
                                    <button 
                                        className={styles["offer-accept"]}
                                        onClick={(e) => props.onHandleAcceptFriendClick(e, offer.requesterId)}
                                    >
                                        <span>✓</span> Принять
                                    </button>
                                    <button 
                                        className={styles["offer-decline"]}
                                        onClick={(e) => props.onHandleDeclineFriendClick(e, offer.requesterId)}
                                    >
                                        <span>✗</span> Отклонить
                                    </button>
                                </div>
                            </div>                                
                        </Link>
                    ))}
                </div>
            </div>
        )
    );
}

export default OfferFriendshipList;