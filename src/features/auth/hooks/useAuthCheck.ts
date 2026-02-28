import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { refreshToken } from '../store/actions';

export const useAuthCheck = () => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const [isChecking, setIsChecking] = useState(true);

    const checkAuth = useCallback(async () => {
        if (!isChecking) {
            return;
        }
        
        if (accessToken) {
            setIsChecking(false);
            return;
        }

        if (!accessToken && !isLoading) {
            try {
                await dispatch(refreshToken()).unwrap();
            } 
            catch (error) {
            
            } 
            finally {
                setIsChecking(false);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return {
        isAuthenticated: !!accessToken,
        isChecking,
        isLoading,
    };
};