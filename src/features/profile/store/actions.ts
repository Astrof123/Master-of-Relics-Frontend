import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/shared/api/client';
import type { GetReportsResponseDto, UserProfile } from '../types/responses';
import type { BanUserData, FindFriendsData, GetReportsData, SendReportUserData, UnbanUserData } from '../types/requests';
import type { User } from '@/features/auth/types/responses';

const PROFILE_ENDPOINTS = {
    PROFILE: "users/profile",
	FRIENDSHIP_ACCEPT: "users/friendships/accept",
	FRIENDSHIP_OFFER: "users/friendships/offer",
	FRIENDSHIP_DECLINE: "users/friendships/decline",
	FRIENDSHIP_BREAKOFF: "users/friendships/breakoff",
	FIND_FRIENDS: "users/friendships",
	SEND_REPORT: "users/reports",
	GET_REPORTS: "users/reports",
	BAN_USER: "users/ban",
	UNBAN_USER: "users/unban",
}

export const getProfile = createAsyncThunk('profile', async (id: string, { rejectWithValue }) => {
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

export const offerFriendship = createAsyncThunk('offerFriendship', async (id: string, { rejectWithValue }) => {
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

export const acceptFriendship = createAsyncThunk('acceptFriendship', async (id: string, { rejectWithValue }) => {
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

export const declineFriendship = createAsyncThunk('declineFriendship', async (id: string, { rejectWithValue }) => {
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

export const breakoffFriendship = createAsyncThunk('breakoffFriendship', async (id: string, { rejectWithValue }) => {
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

export const sendReport = createAsyncThunk('sendReport', async (data: SendReportUserData, { rejectWithValue }) => {
	try {
		const response = await api.post(PROFILE_ENDPOINTS.SEND_REPORT, data, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось отправить жалобу');
	}
});

export const getReports = createAsyncThunk('getReports', async (data: GetReportsData, { rejectWithValue }) => {
	try {

		const response = await api.get<GetReportsResponseDto>(PROFILE_ENDPOINTS.GET_REPORTS, {
			withAuth: true,
			retryOnUnauthorized: true,
			params: data
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось получить жалобы');
	}
});

export const banUser = createAsyncThunk('banUser', async (data: BanUserData, { rejectWithValue }) => {
	try {

		const response = await api.post(PROFILE_ENDPOINTS.BAN_USER, data, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось забанить игрока');
	}
});


export const unbanUser = createAsyncThunk('unbanUser', async (data: UnbanUserData, { rejectWithValue }) => {
	try {

		const response = await api.post(PROFILE_ENDPOINTS.UNBAN_USER, data, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось разбанить игрока');
	}
});