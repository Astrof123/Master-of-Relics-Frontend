import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { useEffect } from "react";
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
import SearchFriends from "@/features/profile/components/search-friends/SearchFriends";
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
    
    const handleLogoutClick = async () => {
        await handleLogout();
        navigate("/login");
        dispatch(setLeaveLobby())
    }

    useEffect(() => {
        if (id) {
            handleProfile(id);
        }
    }, [id]);

    const handleAddFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile) {
            await handleAddFriend(friendId);
            handleProfile(id!);
        }
    };

    const handleRemoveFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile) {
            await handleBreakoffFriend(friendId);
            handleProfile(id!);
        }
    };

    const handleAcceptFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile) {
            await handleAcceptFriend(friendId);
            handleProfile(id!);
        }
    };

    const handleDeclineFriendClick = async (e: MouseEvent<HTMLButtonElement>, friendId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile) {
            await handleDeclineFriend(friendId);
            handleProfile(id!);
        }
    };

    if (!profile || !id) {
        return (
            <div className={styles["loading"]}>
                <div className={styles["loading-spinner"]}></div>
                <span>Загрузка профиля...</span>
            </div>
        );
    }

    const isOwnProfile = profile.id === user?.id;

    return (
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
                            <span className={styles["profile-id"]}>ID: {profile.id}</span>
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
                    profileUserId={id}
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
        </div>
    );
}

export default ProfilePage;