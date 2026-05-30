import axios from 'axios';
import type { RootState } from '@/app/store';

import type {
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';


import type { RequestOptions } from '@/shared/types/api';


let store: { getState: () => RootState; dispatch: (action: any) => void } | null = null;

export const initApiClient = (reduxStore: { getState: () => RootState; dispatch: (action: any) => void }) => {
    store = reduxStore;
};


const getAccessToken = (): string | null => {
    if (!store) {
        return null;
    }
    
    try {
        const state = store.getState();
        return state.auth.accessToken;
    } catch (error) {
        return null;
    }
};


const API_BASE_URL = "http://localhost:3000";


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (error: unknown) => void;
    config: InternalAxiosRequestConfig;
}> = [];


const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    withAuth?: boolean;
    retryOnUnauthorized?: boolean;
}


axiosInstance.interceptors.request.use(
    (config: ExtendedAxiosRequestConfig) => {        
        if (config.withAuth === false) {
            return config;
        }
        
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        const shouldRetry = originalRequest.retryOnUnauthorized !== false;
        
        if (error.response?.status === 401 && 
            !originalRequest._retry && 
            !originalRequest.url?.includes('/auth/refresh') &&
            shouldRetry) {
            
            originalRequest._retry = true;
            
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest });
                })
                    .then(() => {
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }
            
            isRefreshing = true;
            
            try {
                if (store) {
                    const { refreshToken } = await import('@/features/auth/store/actions');
                    await store.dispatch(refreshToken());
                    
                    const newToken = getAccessToken();
                    
                    processQueue(null, newToken);
                    isRefreshing = false;
                    
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;
                
                window.location.href = '/login';
                
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);


const createAxiosConfig = (options: RequestOptions): AxiosRequestConfig => {
    const { withAuth, retryOnUnauthorized, ...axiosConfig } = options;
    
    const extendedConfig = {
        ...axiosConfig,
        withAuth,
        retryOnUnauthorized
    };
    
    return extendedConfig as AxiosRequestConfig;
};


export const api = {
    get: <T>(url: string, options: RequestOptions = {}) => {
        const config = createAxiosConfig(options);
        return axiosInstance.get<T>(url, config);
    },
    
    post: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
        const config = createAxiosConfig(options);
        return axiosInstance.post<T>(url, data, config);
    },
    
    put: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
        const config = createAxiosConfig(options);
        return axiosInstance.put<T>(url, data, config);
    },
    
    delete: <T>(url: string, options: RequestOptions = {}) => {
        const config = createAxiosConfig(options);
        return axiosInstance.delete<T>(url, config);
    },
    
    patch: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
        const config = createAxiosConfig(options);
        return axiosInstance.patch<T>(url, data, config);
    },
};