import { useEffect } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { RootState } from '@/app/store';
import { useSelector } from 'react-redux';



const Sidebar = () => {
    const { user, handleMe } = useAuth();
    const isConnected = useSelector((state: RootState) => state.connectSocket.isConnected);
    const currentLobby = useSelector((state: RootState) => state.lobby.currentLobby)
    
    useEffect(() => {
        handleMe();
    }, [])

    return (
        <aside className={clsx(styles.sidebar)}>
            <div className={clsx(styles.user)}>
                <span>{user?.nickname}</span>
                <span>{user?.gold}</span>
                <strong>Статус:</strong> {isConnected ? '✅ Подключено' : '❌ Отключено'}
            </div>
            <div className={clsx(styles.nav)}>
                <Link to="/">Список лобби</Link>
                {currentLobby === null ? (
                    <Link to="/create">Создать лобби</Link>
                ) : (
                    <Link to="/my-lobby">Ваше лобби</Link>
                )}
                
                <Link to="/shop">Лавка артефактов</Link>
                <Link to="/knowledge">База знаний</Link>
                <Link to="/collection">Коллекция</Link>
            </div>
        </aside>
    );
};

export default Sidebar;