import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useLobbySocket } from '@/features/lobby/hooks/useLobbySocket';
import { useAppSelector } from '../store';
import { useLobbySocketProvider } from '@/features/lobby/hooks/useLobbySocketProvider';

export const LobbyLayout = () => {
    const isConnected = useAppSelector((state) => state.connectSocket.isConnected)
    const {} = useLobbySocketProvider();

    const { 
        joinHall
    } = useLobbySocket();

    useEffect(() => {
        if (isConnected) {
            joinHall()
        }
    }, [isConnected])

    return (
        <>
            <Outlet />
        </>
    );
};