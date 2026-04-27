import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthResponse, LoginCredentials, RegisterData, User } from '../types/responses';
import { api } from '@/shared/api/client';
import socketService from '../../socket/socket';

const AUTH_ENDPOINTS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: '/users/me',
} as const


export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
	try {
		const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials, {
			withAuth: false,
			retryOnUnauthorized: false
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось войти');
	}
});


export const register = createAsyncThunk('auth/register', async (data: RegisterData, { rejectWithValue }) => {
	try {
		const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, data, {
			withAuth: false,
			retryOnUnauthorized: false
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось зарегистрировать');
	}
});


export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
	try {
		const response = await api.post(AUTH_ENDPOINTS.LOGOUT, {}, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		socketService.disconnect();

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось выйти из системы');
	}
});


export const refreshToken = createAsyncThunk('auth/refresh', async () => {
	const response = await api.get<AuthResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
		withAuth: false,
        retryOnUnauthorized: false
	});

	return response.data;
});


export const me = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
	try {
		const response = await api.get<User>(AUTH_ENDPOINTS.ME, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось получилось данные о себе');
	}
});