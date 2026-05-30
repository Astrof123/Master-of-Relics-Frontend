import { useEffect, useCallback } from 'react';
import socketService from '../../socket/socket';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
    connectionEstablished,
    connectionLost,
    setError,
} from '../store/connectSlice';
import { refreshToken } from '@/features/auth/store/actions';

export const useConnectSocket = () => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    

    useEffect(() => {
        const unsubscribeStatus = socketService.onStatusChange((status) => {
            const connected = status === 'CONNECTED';
            
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
        const url = '/';

        if (accessToken) {
            socketService.setTokenRefreshCallback(async () => {
                const data = await dispatch(refreshToken()).unwrap();
                return data.accessToken;
            });


            socketService.connect({
                url,
                auth: {
                    token: accessToken
                },
            });
        }
        else {
        }
    }, []);
    

    const disconnect = useCallback(() => {
        socketService.disconnect();
    }, []);
    
    

    return {       
        connect,
        disconnect,
    };
};