import { useEffect } from "react";
import { useLobbySocket } from "../../hooks/useLobbySocket";
import { useAppSelector } from "@/app/store";
import { INVITE_STATUS } from "../../types/lobby-socket-data-responses";
import styles from "./InviteFriends.module.css";
import clsx from "clsx";
import UserImg from "@assets/icons/user2.png";
import { Link } from "react-router-dom";
import type { 
    MouseEvent
} from 'react';

interface InviteFriendsProps {
    lobbyId: string;
}

const InviteFriends = (props: InviteFriendsProps) => {
    const friendsForInvite = useAppSelector(state => state.lobby.friendsForInvite);
    const { getFriendsForInvite, inviteFriend, } = useLobbySocket();

    useEffect(() => {
        getFriendsForInvite();
    }, [])
    
    const handleInviteFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: number) => {
        e.preventDefault();
        e.stopPropagation();
        await inviteFriend({lobbyId: props.lobbyId, friendId});
        getFriendsForInvite();
    }

    const handleRefreshClick = async () => {
        getFriendsForInvite();
    }

    return (
        <div className={styles["invite-container"]}>
            <div className={styles["invite-header"]}>
                <h3 className={styles["header-title"]}>Пригласить друга</h3>
                <button onClick={handleRefreshClick} className={styles["refresh-button"]}>Обновить</button>
            </div>
            
            {friendsForInvite.length > 0 ? (
                <div className={styles["friends-list"]}>
                    {friendsForInvite.map((friend) => (
                        <Link key={friend.friendId + "invite"} to={`/profile/${friend.friendId}`} >
                            <div key={friend.friendId} className={styles["friend-card"]}>
                                <div className={styles["friend-avatar"]}>
                                    <img src={UserImg} alt="" />
                                </div>
                                <div className={styles["friend-info"]}>
                                    <span className={styles["friend-nickname"]}>{friend.friendNickname}</span>
                                    <div className={styles["friend-status"]}>
                                        <span className={clsx(
                                            styles["status-dot"],
                                            friend.isOnline && styles["status-online"]
                                        )}></span>
                                        <span className={styles["status-text"]}>
                                            {friend.isOnline ? "В сети" : "Не в сети"}
                                        </span>
                                    </div>
                                </div>
                                {friend.status === INVITE_STATUS.OFFER ? (
                                    <button className={styles["invited-btn"]} disabled>
                                        Приглашен
                                    </button>
                                ) : (
                                    <button 
                                        className={styles["invite-btn"]}
                                        onClick={(e) => handleInviteFriendClick(e, friend.friendId)}
                                    >
                                        Пригласить
                                    </button>
                                )}
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

export default InviteFriends;