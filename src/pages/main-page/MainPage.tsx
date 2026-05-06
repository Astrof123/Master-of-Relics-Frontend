import { useState, type ChangeEvent } from "react";
import LobbyList from "../../features/lobby/components/lobby-list/LobbyList";
import clsx from "clsx";
import styles from "./MainPage.module.css";
import { useLobbySocket } from "@/features/lobby/hooks/useLobbySocket";
import Background from "@assets/background2.jpg";
import { useAppSelector } from "@/app/store";
import InvitationList from "@/features/lobby/components/invitation-list/InvitationList";
import BlockImg from "@assets/icons/block.png"

function MainPage() {
    const user = useAppSelector(state => state.auth.user);
    const [searchText, setSearchText] = useState<string>("");
    const { joinLobbyByCode } = useLobbySocket();
    const [code, setCode] = useState<string>("");
    const body = document.body;
    const onlinePlayers = useAppSelector(state => state.lobby.onlinePlayers)
    body.style.backgroundImage = `url(${Background})`;
    const isBanned = !!user?.bannedUntil && new Date(user.bannedUntil) > new Date();

    const handleJoinLobbyByCode = () => {
        joinLobbyByCode(code);
    }

    const handleChangeCode = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCode(value);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        setSearchText(value);
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <> 
            <div className={clsx(styles["title-wrapper"])}>
                <h1>Список лобби</h1>
                <span className={clsx(styles["online-players"])}>Игроков онлайн: {onlinePlayers}</span>
            </div>
            {user?.bannedUntil && (
                <div className={styles["ban-banner"]}>
                    <img className={styles["ban-icon"]} src={BlockImg} alt="" />
                    <div className={styles["ban-content"]}>
                        <div className={styles["ban-title"]}>Вы забанены</div>
                        <div className={styles["ban-message"]}>
                            <span className={styles["ban-label"]}>Причина:</span>
                            <span className={styles["ban-reason"]}>{user?.banReason || "Не указана"}</span>
                        </div>
                        <div className={styles["ban-message"]}>
                            <span className={styles["ban-label"]}>Бан действует до:</span>
                            <span className={styles["ban-date"]}>{formatDate(user.bannedUntil)}</span>
                        </div>
                    </div>
                </div>
            )}
            {!isBanned && (
                <InvitationList />
            )}
            <div className={clsx(styles["header-wrapper"])}>
                <div className={clsx(styles["code-wrapper"])}>
                    <div>
                        <input 
                            className={styles["code-input"]}
                            minLength={6}
                            maxLength={6}
                            type="text" 
                            name="code"
                            placeholder="Код для присоединения..."
                            onChange={handleChangeCode}
                            disabled={isBanned}
                        />
                    </div>
                    <button
                        className={styles["code-button"]}
                        onClick={handleJoinLobbyByCode}
                        disabled={isBanned}
                    >
                        Присоединится
                    </button>
                </div>

                <input 
                    className={styles["search-bar"]} 
                    onChange={handleChange} 
                    type="search" 
                    name="search"
                    placeholder="Поиск..."
                />
            </div>
            <LobbyList searchText={searchText} />
        </>
    );
}

export default MainPage;