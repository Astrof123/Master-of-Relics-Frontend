import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthResponse, LoginCredentials } from '../types';
import { api } from '@/shared/api/client';


const AUTH_ENDPOINTS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: '/auth/me',
} as const


export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials) => {
	const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials, {
		withAuth: false,
        retryOnUnauthorized: false
	});

	return response.data;
});


export const refreshToken = createAsyncThunk('auth/refresh', async () => {
	const response = await api.get<AuthResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
		withAuth: false,
        retryOnUnauthorized: false
	});

	return response.data;
});