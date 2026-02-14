import { useAppDispatch, useAppSelector } from '@/app/store';
import { login, logout, me, register } from '../store/actions';
import type { LoginCredentials, RegisterData } from '../types';
import { useCallback, useMemo } from 'react';


export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, accessToken, isLoading, error } = useAppSelector((state) => state.auth);
    
    const handleLogin = useCallback((credentials: LoginCredentials) => {
        return dispatch(login(credentials));
    }, [dispatch]);


    const handleRegister = useCallback((data: RegisterData) => {
        return dispatch(register(data));
    }, [dispatch]);


    const handleLogout = useCallback(() => {
        return dispatch(logout());
    }, [dispatch]);


    const handleMe = useCallback(() => {
        return dispatch(me());
    }, [dispatch]);


    return useMemo(() => ({
        user,
        accessToken,
        isLoading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
        handleMe
    }), [
        user, 
        accessToken, 
        isLoading, 
        error, 
        handleLogin, 
        handleRegister, 
        handleLogout, 
        handleMe
    ]);
}