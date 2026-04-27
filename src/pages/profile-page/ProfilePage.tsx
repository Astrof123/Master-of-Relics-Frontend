import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/profile/hooks/useProfile";
import ContentLayout from "@/widgets/content-layout/ContentLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import clsx from "clsx";
import FriendshipButtons from "@/features/profile/components/friendship-buttons/FriendshipButtons";
import UserStats from "@/features/profile/components/user-stats/UserStats";
import FriendList from "@/features/profile/components/friend-list/FriendList";
import OfferFriendshipList from "@/features/profile/components/offer-friendship-list/OfferFriendshipList";
import { setLeaveLobby } from "@/features/lobby/store/lobbySlice";
import { useAppDispatch } from "@/app/store";
import UserImg from "@assets/icons/user2.png";
import SearchFriends from "@/features/profile/components/seach-friends/SearchFriends";
import type { 
    MouseEvent
} from 'react';

function ProfilePage() {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { 
        handleProfile, 
        profile,
        isLoading,
        handleAddFriend, 
        handleBreakoffFriend, 
        handleAcceptFriend, 
        handleDeclineFriend, 
    } = useProfile();

    const { user, handleLogout } = useAuth();
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportText, setReportText] = useState("");
    
    const handleLogoutClick = async () => {
        await handleLogout();
        navigate("/login");
        dispatch(setLeaveLobby())
    }

    useEffect(() => {
        if (id) {
            const num = parseInt(id);
            if (!isNaN(num)) {

                handleProfile(Number(id));
            }
        }
    }, [id]);

    const handleAddFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile) {
            await handleAddFriend(friendId);
            handleProfile(Number(id));
        }
    };

    const handleRemoveFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile) {
            await handleBreakoffFriend(friendId);
            handleProfile(Number(id));
        }
    };

    const handleAcceptFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile) {
            await handleAcceptFriend(friendId);
            handleProfile(Number(id));
        }
    };

    const handleDeclineFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile) {
            await handleDeclineFriend(friendId);
            handleProfile(Number(id));
        }
    };

    const handleReportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (profile && reportText.trim()) {
            // handleReport(profile.id, reportText);
            setShowReportModal(false);
            setReportText("");
        }
    };

    if (!profile) {
        return (
            <ContentLayout>
                <div className={styles["loading"]}>
                    <div className={styles["loading-spinner"]}></div>
                    <span>Загрузка профиля...</span>
                </div>
            </ContentLayout>
        );
    }

    const isOwnProfile = profile.id === user?.id;

    return (
        <ContentLayout>
            <div className={styles["profile-container"]}>
                <div className={styles["profile-header"]}>
                    <div className={styles["avatar-section"]}>
                        <div className={styles["avatar"]}>
                            <img src={UserImg} alt="" />
                        </div>
                        <div className={styles["profile-info"]}>
                            <h1 className={styles["nickname"]}>{profile.nickname}</h1>
                            <div className={styles["status"]}>
                                <span className={clsx(styles["status-dot"], profile.isOnline && styles["status-online"])}></span>
                                <span>{profile.isOnline ? "В сети" : "Не в сети"}</span>
                            </div>
                        </div>
                        {isOwnProfile && (
                            <button
                                onClick={handleLogoutClick}
                                className={styles.logout}
                            >
                                Выйти из аккаунта
                            </button>
                        )}
                    </div>

                    <FriendshipButtons
                        isLoading={isLoading}
                        isOwnProfile={isOwnProfile}
                        profile={profile}
                        profileUserId={Number(id)}
                        onHandleAcceptFriendClick={handleAcceptFriendClick}
                        onHandleAddFriendClick={handleAddFriendClick}
                        onHandleDeclineFriendClick={handleDeclineFriendClick}
                        onHandleRemoveFriendClick={handleRemoveFriendClick}
                    />
                </div>

                <UserStats profile={profile} />
                <FriendList profile={profile} />
                <OfferFriendshipList 
                    profile={profile}
                    isOwnProfile={isOwnProfile}
                    onHandleAcceptFriendClick={handleAcceptFriendClick}
                    onHandleDeclineFriendClick={handleDeclineFriendClick}
                />

                <SearchFriends isOwnProfile={isOwnProfile} />

                {showReportModal && (
                    <div className={styles["modal-overlay"]} onClick={() => setShowReportModal(false)}>
                        <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
                            <div className={styles["modal-header"]}>
                                <span className={styles["modal-icon"]}>⚠️</span>
                                <h3>Пожаловаться на игрока</h3>
                                <button className={styles["modal-close"]} onClick={() => setShowReportModal(false)}>✕</button>
                            </div>
                            <form onSubmit={handleReportSubmit}>
                                <textarea
                                    className={styles["report-input"]}
                                    placeholder="Опишите причину жалобы..."
                                    value={reportText}
                                    onChange={(e) => setReportText(e.target.value)}
                                    required
                                    rows={4}
                                />
                                <div className={styles["modal-buttons"]}>
                                    <button type="button" className={styles["cancel-btn"]} onClick={() => setShowReportModal(false)}>
                                        Отмена
                                    </button>
                                    <button type="submit" className={styles["submit-btn"]} disabled={!reportText.trim()}>
                                        Отправить жалобу
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </ContentLayout>
    );
}

export default ProfilePage;