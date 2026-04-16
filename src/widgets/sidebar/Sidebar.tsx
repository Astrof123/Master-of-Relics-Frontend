import { useEffect } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom'; // Изменено с Link на NavLink
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import Dagger from '@assets/icons/dagger.png';
import Coin from '@assets/icons/coin.png';

const Sidebar = () => {
    const { user, handleMe, handleLogout } = useAuth();
    const isConnected = useSelector((state: RootState) => state.connectSocket.isConnected);
    const currentLobby = useSelector((state: RootState) => state.lobby.currentLobby)
    
    useEffect(() => {
        handleMe();
    }, [])

    const getActiveClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? clsx(styles.active) : '';
    };



    return (
        <aside className={styles.sidebar}>
            <div className={styles.user}>
                <div className={styles['user-info']}>
                    <div className={styles["user-name-wrapper"]}>
                        <img className={styles["user-name-decoration"]} src={Dagger} alt="" />
                        <span className={styles['user-name']}>{user!.nickname.length > 20 ? user!.nickname.slice(0, 16) + "..." : user!.nickname}</span>
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
                        {isConnected ? '✅ Подключено' : '❌ Отключено'}
                    </span>
                </div>
                
            </div>
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
                <button
                    onClick={handleLogout}
                    className={styles.logout}
                >
                    Выйти из аккаунта
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;