import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/shared/api/client';
import type { UserProfile } from '../types/responses';
import type { FindFriendsData } from '../types/requests';
import type { User } from '@/features/auth/types/responses';

const PROFILE_ENDPOINTS = {
    PROFILE: "users/profile",
	FRIENDSHIP_ACCEPT: "users/friendship/accept",
	FRIENDSHIP_OFFER: "users/friendship/offer",
	FRIENDSHIP_DECLINE: "users/friendship/decline",
	FRIENDSHIP_BREAKOFF: "users/friendship/breakoff",
	FIND_FRIENDS: "users/friendship"
} as const

export const getProfile = createAsyncThunk('profile', async (id: number, { rejectWithValue }) => {
	try {
		const response = await api.get<UserProfile>(PROFILE_ENDPOINTS.PROFILE + `/${id}`, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось получилось данные профиля');
	}
});

export const offerFriendship = createAsyncThunk('offerFriendship', async (id: number, { rejectWithValue }) => {
	try {
		const response = await api.post(PROFILE_ENDPOINTS.FRIENDSHIP_OFFER + `/${id}`, {}, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось предложить дружбу');
	}
});

export const acceptFriendship = createAsyncThunk('acceptFriendship', async (id: number, { rejectWithValue }) => {
	try {
		const response = await api.post(PROFILE_ENDPOINTS.FRIENDSHIP_ACCEPT + `/${id}`, {}, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось принять дружбу');
	}
});

export const declineFriendship = createAsyncThunk('declineFriendship', async (id: number, { rejectWithValue }) => {
	try {
		const response = await api.post(PROFILE_ENDPOINTS.FRIENDSHIP_DECLINE + `/${id}`, {}, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось отклонить дружбу');
	}
});

export const breakoffFriendship = createAsyncThunk('breakoffFriendship', async (id: number, { rejectWithValue }) => {
	try {
		const response = await api.post(PROFILE_ENDPOINTS.FRIENDSHIP_BREAKOFF + `/${id}`, {}, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось разорвать дружбу');
	}
});

export const findFriends = createAsyncThunk('findFriends', async (data: FindFriendsData, { rejectWithValue }) => {
	try {
		const response = await api.post<User[]>(PROFILE_ENDPOINTS.FIND_FRIENDS, data, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось получить список пользователей для дружбы');
	}
});