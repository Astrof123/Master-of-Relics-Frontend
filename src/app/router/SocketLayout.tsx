import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useConnectSocket } from '@/features/socket/hooks/useConnectSocket';

export const SocketLayout = () => {
    const { connect } = useConnectSocket();

    useEffect(() => {
        connect();
    }, [connect, ]);

    return (
        <>
            <Outlet />
        </>
    );
};