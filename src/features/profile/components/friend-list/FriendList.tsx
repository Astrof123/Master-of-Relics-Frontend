import { Link } from "react-router-dom";
import styles from "./FriendList.module.css";
import clsx from "clsx";
import type { UserProfile } from "../../types/responses";
import UserImg from "@assets/icons/user2.png";

interface FriendListProps {
    profile: UserProfile;
}

const FriendList = (props: FriendListProps) => {
    return ( 
        <div className={styles["friends-section"]}>
            <h3 className={styles["section-title"]}>
                Друзья ({props.profile.friends.length})
            </h3>
            {props.profile.friends.length > 0 ? (
                <div className={styles["friends-list"]}>
                    {props.profile.friends.map((friend) => (
                        <Link to={`/profile/${friend.friendId}`} key={friend.id}>
                            <div className={styles["friend-card"]}>
                                <div className={styles["friend-avatar"]}>
                                    <img src={UserImg} alt="" />
                                </div>
                                <div className={styles["friend-info"]}>
                                    <span className={styles["friend-name"]}>{friend.nickname}</span>
                                    <div className={styles["friend-status"]}>
                                        <span className={clsx(styles["status-dot-small"], friend.isOnline && styles["status-online"])}></span>
                                        <span className={styles["friend-status-text"]}>
                                            {friend.isOnline ? "В сети" : "Не в сети"}
                                        </span>
                                    </div>
                                </div>
                            </div>                                    
                        </Link>
                    ))}
                </div>
            ) : (
                <div className={styles["empty-friends"]}>
                    <span className={styles["empty-icon"]}>👻</span>
                    <p>Нет друзей</p>
                </div>
            )}
        </div>
    );
}

export default FriendList;