import axios from 'axios';
import type { RootState } from '@/app/store';

import type {
    AxiosRequestConfig,
} from 'axios';


import type { RequestOptions } from '@/shared/types/api';


let store: { getState: () => RootState } | null = null;

export const initApiClient = (reduxStore: { getState: () => RootState }) => {
    store = reduxStore;
    console.log('API клиент подключен к Redux store');
};


const getAccessToken = (): string | null => {
    if (!store) {
        console.warn('Store не инициализирован');
        return null;
    }
    
    try {
        const state = store.getState();
        return state.auth.accessToken;
    } catch (error) {
        console.error('Ошибка при получении токена из store:', error);
        return null;
    }
};


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});



export const api = {
    get: <T>(url: string, options: RequestOptions = {}) => {
        const config: AxiosRequestConfig = { ...options };
        
        if (options.withAuth !== false) {
            const token = getAccessToken();
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }
        
        return axiosInstance.get<T>(url, config);
    },
    
    post: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
        const config: AxiosRequestConfig = { ...options };
        
        if (options.withAuth !== false) {
            const token = getAccessToken();
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }
        
        return axiosInstance.post<T>(url, data, config);
    },
    
    put: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
        const config: AxiosRequestConfig = { ...options };
        
        if (options.withAuth !== false) {
            const token = getAccessToken();
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }
        
        return axiosInstance.put<T>(url, data, config);
    },
    
    delete: <T>(url: string, options: RequestOptions = {}) => {
        const config: AxiosRequestConfig = { ...options };
        
        if (options.withAuth !== false) {
            const token = getAccessToken();
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }
        
        return axiosInstance.delete<T>(url, config);
    },
    
    patch: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
        const config: AxiosRequestConfig = { ...options };
        
        if (options.withAuth !== false) {
            const token = getAccessToken();
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }
        
        return axiosInstance.patch<T>(url, data, config);
    },
};