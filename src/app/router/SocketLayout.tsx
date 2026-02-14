import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useConnectSocket } from '@/features/socket/hooks/useConnectSocket';
import { useLobbySocket } from '@/features/lobby/hooks/useLobbySocket';
import { useAppSelector } from '../store';
import { useLobbySocketProvider } from '@/features/lobby/hooks/useLobbySocketProvider';

export const SocketLayout = () => {
    const { connect } = useConnectSocket();
    const isConnected = useAppSelector((state) => state.connectSocket.isConnected)
    const {} = useLobbySocketProvider();

    const { 
        joinHall
    } = useLobbySocket();
    
    useEffect(() => {
        connect();
    }, [connect]);

    useEffect(() => {
        if (isConnected) {
            console.log("Присоединение к холу");
            joinHall()
        }
    }, [isConnected])

    return (
        <>
            <Outlet />
        </>
    );
};