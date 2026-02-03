import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { refreshToken } from '../store/actions';

export const useAuthCheck = () => {
    const dispatch = useAppDispatch();
    const { accessToken, isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!accessToken && !isLoading) {
            dispatch(refreshToken());
        }
    }, [dispatch, accessToken, isLoading]);

    return {
        isAuthenticated: !!accessToken,
        isLoading,
    };
};