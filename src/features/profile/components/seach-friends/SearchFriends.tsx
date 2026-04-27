import { useAppDispatch } from "@/app/store";
import { useProfile } from "../../hooks/useProfile";
import styles from "./SearchFriends.module.css";
import { clearUsersForFriendship, offeredFriendship } from "../../store/profileSlice";
import { useEffect, useState } from "react";
import LoupeImg from "@assets/icons/loupe.png";
import UserImg from "@assets/icons/user2.png";
import { Link } from "react-router-dom";

interface SearchFriendsProps {
    isOwnProfile: boolean;
}

const SearchFriends = (props: SearchFriendsProps) => {
    const { handleFindFriends, usersForFriendship, handleAddFriend } = useProfile();
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    
    useEffect(() => {
        dispatch(clearUsersForFriendship());
    }, [])

    const handleAddFriendClick = async (friendId: number) => {
        await handleAddFriend(friendId);
        dispatch(offeredFriendship(friendId));
    }

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            setIsSearched(true);
            setIsSearching(true);
            await handleFindFriends({searchQuery});
            setIsSearching(false);
        }
    }

    if (!props.isOwnProfile) {
        return null;
    }

    return (
        <div className={styles["search-container"]}>
            <h3 className={styles["search-title"]}>
                <img className={styles["title-icon"]} src={LoupeImg} alt="" />
                Поиск игроков
            </h3>
            
            <div className={styles["search-bar-wrapper"]}>
                <input 
                    type="search" 
                    placeholder="Введите никнейм..."
                    className={styles["search-input"]}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                    className={styles["search-btn"]}
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim()}
                >
                    {isSearching ? "Поиск..." : "Найти"}
                </button>
            </div>
            
            {usersForFriendship.length > 0 && (
                <div className={styles["search-results"]}>
                    <div className={styles["results-header"]}>
                        <span>Результаты поиска</span>
                    </div>
                    <div className={styles["results-list"]}>
                        {usersForFriendship.map(user => (
                            <Link to={`/profile/${user.id}`} key={user.id + " finded friend"}>
                                <div className={styles["result-card"]}>
                                    <div className={styles["result-avatar"]}>
                                        <img src={UserImg} alt="" />
                                    </div>
                                    <div className={styles["result-info"]}>
                                        <span className={styles["result-nickname"]}>{user.nickname}</span>
                                    </div>
                                    <button 
                                        className={styles["add-friend-btn"]}
                                        onClick={() => handleAddFriendClick(user.id)}
                                    >
                                        Добавить
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            
            {usersForFriendship.length === 0 && isSearched && !isSearching && (
                <div className={styles["no-results"]}>
                    <span className={styles["no-results-icon"]}>👻</span>
                    <p>Игроки не найдены</p>
                    <span className={styles["no-results-hint"]}>Попробуйте другой никнейм</span>
                </div>
            )}
        </div>
    );
}

export default SearchFriends;