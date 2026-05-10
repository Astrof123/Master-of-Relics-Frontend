import { useAppDispatch, useAppSelector } from '@/app/store';
import { login, logout, me, register } from '../store/actions';
import type { LoginCredentials, RegisterData } from '../types/responses';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';


export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, accessToken, isLoading, error } = useAppSelector((state) => state.auth);
    
    const handleLogin = useCallback((credentials: LoginCredentials) => {
        return dispatch(login(credentials)).unwrap().then(() => {
            toast.success('Добро пожаловать!');
        }).catch((error) => {
            toast.error(error.message || 'Ошибка входа');
        });
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