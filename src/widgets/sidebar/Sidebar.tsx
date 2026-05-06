import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import Coin from '@assets/icons/coin.png';
import UserImg from "@assets/icons/user2.png";
import Logo from "@assets/icons/logo.png"

const Sidebar = () => {
    const { user, handleMe } = useAuth();
    const isConnected = useSelector((state: RootState) => state.connectSocket.isConnected);
    const currentLobby = useSelector((state: RootState) => state.lobby.currentLobby)
    const [isAdminMode, setIsAdminMode] = useState(false);
    
    useEffect(() => {
        handleMe();
    }, [])

    const getActiveClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? clsx(styles.active) : '';
    };

    return (
        <aside className={styles.sidebar}>
            {/* <div className={styles["logo-wrapper"]}>
                <img src={Logo} alt="" className={styles.logo} />
            </div> */}
            <div className={styles.user}>
                <div className={styles['user-info']}>
                    <div className={styles["user-name-wrapper"]}>
                    <div className={styles["avatar"]}>
                        <img src={UserImg} alt="" />
                    </div>
                        {user && (
                            <span className={styles['user-name']}>{user.nickname.length > 20 ? user.nickname.slice(0, 16) + "..." : user!.nickname}</span>
                        )}
                    </div>

                    <span className={styles['user-gold']}>
                        <img className={styles["user-gold-decoration"]} src={Coin} alt="" />
                        {user?.gold || 0}
                    </span>
                </div>
                <div className={styles['user-status']}>
                    <strong>Статус:</strong>
                    <span className={clsx(
                        styles['status-badge'],
                        isConnected ? styles['status-online'] : styles['status-offline']
                    )}>
                        {isConnected ? 'Подключено' : 'Отключено'}
                    </span>
                </div>
                
            </div>
            {isAdminMode ? (
                <nav className={styles.nav}>
                    <NavLink 
                        to="/admin/reports" 
                        className={getActiveClass}
                        end
                    >
                        Жалобы
                    </NavLink>
                    <NavLink 
                        to="/admin/invite-codes" 
                        className={getActiveClass}
                    >
                        Инвайт коды
                    </NavLink>
                    <NavLink 
                        to="/admin/users" 
                        className={getActiveClass}
                    >
                        Пользователи
                    </NavLink>
                    <button
                        className={styles["nav-button"]}
                        onClick={() => setIsAdminMode(false)}
                    >
                        Режим пользователя
                    </button>
                </nav>
            ) : (
                <nav className={styles.nav}>
                    <NavLink 
                        to="/" 
                        className={getActiveClass}
                        end
                    >
                        Список лобби
                    </NavLink>
                    
                    {currentLobby === null ? (
                        <NavLink 
                            to="/create" 
                            className={getActiveClass}
                        >
                            Создать лобби
                        </NavLink>
                    ) : (
                        <NavLink 
                            to="/my-lobby" 
                            className={getActiveClass}
                        >
                            Ваше лобби
                        </NavLink>
                    )}
                    
                    <NavLink 
                        to="/knowledge" 
                        className={getActiveClass}
                    >
                        База знаний
                    </NavLink>
                    
                    <NavLink 
                        to="/collection" 
                        className={getActiveClass}
                    >
                        Коллекция
                    </NavLink>
                    <NavLink 
                        to={`/profile/${user?.id}`}
                        className={getActiveClass}
                    >
                        Профиль
                    </NavLink>
                    {user?.isAdmin && (
                        <button
                            onClick={() => setIsAdminMode(true)}
                            className={styles["nav-button"]}
                        >
                            Админ режим
                        </button>
                    )}
                </nav>
            )}
        </aside>
    );
};

export default Sidebar;