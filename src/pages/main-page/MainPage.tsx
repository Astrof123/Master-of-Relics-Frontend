import { useState, type ChangeEvent } from "react";
import LobbyList from "../../features/lobby/components/lobby-list/LobbyList";
import ContentLayout from "@/widgets/content-layout/ContentLayout";
import clsx from "clsx";
import styles from "./MainPage.module.css";
import { useLobbySocket } from "@/features/lobby/hooks/useLobbySocket";
import Background from "@assets/background2.jpg";
import { useAppSelector } from "@/app/store";
import InvitationList from "@/features/lobby/components/invitation-list/InvitationList";

function MainPage() {
    const [searchText, setSearchText] = useState<string>("");
    const { joinLobbyByCode } = useLobbySocket();
    const [code, setCode] = useState<string>("");
    const body = document.body;
    const onlinePlayers = useAppSelector(state => state.lobby.onlinePlayers)
    body.style.backgroundImage = `url(${Background})`;

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

    return (
        <ContentLayout>
            <> 
                <div className={clsx(styles["title-wrapper"])}>
                    <h1>Список лобби</h1>
                    <span className={clsx(styles["online-players"])}>Игроков онлайн: {onlinePlayers}</span>
                </div>
                <InvitationList />
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
                            />
                        </div>
                        <button className={styles["code-button"]} onClick={handleJoinLobbyByCode}>Присоединится</button>
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
        </ContentLayout>
    );
}

export default MainPage;