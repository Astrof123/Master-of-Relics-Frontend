import { useAppDispatch, useAppSelector } from '@/app/store';
import { login } from '../store/actions';
import type { LoginCredentials } from '../types';
import { useCallback } from 'react';


export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, accessToken, isLoading, error } = useAppSelector((state) => state.auth);


    const handleLogin = useCallback((credentials: LoginCredentials) => {
        return dispatch(login(credentials));
    }, [dispatch]);

    return {
        user,
        accessToken,
        isLoading,
        error,
        handleLogin
    }
}