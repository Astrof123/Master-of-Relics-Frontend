import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthResponse, LoginCredentials } from '../types';
import { api } from '@/shared/api/client';


const AUTH_ENDPOINTS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: '/auth/me',
} as const


export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials) => {
	const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials, {
		withAuth: false
	});

	return response.data;
});
