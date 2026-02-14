import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../../socket/socket';
import { useAppSelector } from '@app/store';
import {
    connectionEstablished,
    connectionLost,
    setError,
} from '../store/connectSlice';

export const useConnectSocket = () => {
    const dispatch = useDispatch();
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    

    useEffect(() => {
        const unsubscribeStatus = socketService.onStatusChange((status) => {
            const connected = status === 'CONNECTED';
            console.log("Поменялся коннект в хуке сокета", connected)
            
            if (connected) {
                dispatch(connectionEstablished());
            } 
            else if (status === 'DISCONNECTED') {
                dispatch(connectionLost());
            }
        });
        
        const handleDisconnected = () => {
            dispatch(connectionLost());
        };
        
        const handleError = (error: any) => {
            dispatch(setError(`${error.code}: ${error.message}`));
        };
        
        socketService.on('disconnected', handleDisconnected);
        socketService.on('error', handleError);
        
        return () => {
            unsubscribeStatus();
            socketService.off('disconnected', handleDisconnected);
            socketService.off('error', handleError);
        };
    }, [dispatch]);
    
    
    const connect = useCallback(() => {
        console.log('🔄 useLobbySocket: подключение');
        const url = 'ws://localhost:3000';

        if (accessToken) {
            socketService.connect({
                url,
                auth: {
                    token: accessToken
                },
            });
        }
        else {
            console.error("Нету токена")
        }
    }, []);
    

    const disconnect = useCallback(() => {
        console.log('🛑 useLobbySocket: отключение');
        socketService.disconnect();
    }, []);
    
    

    return {       
        connect,
        disconnect,
    };
};