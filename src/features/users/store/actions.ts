import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GetUsersData, SetAdminData } from "../types/requests";
import type { GetUsersResponseData } from "../types/responses";
import { api } from "@/shared/api/client";

const USERS_ENDPOINTS = {
    GET_ALL_USERS: "users",
	GET_ADMINS: "users/admins",
	SET_ADMIN: "users/admins",
}

export const getAllUsers = createAsyncThunk('getAllUsers', async (data: GetUsersData, { rejectWithValue }) => {
	try {
		const response = await api.get<GetUsersResponseData>(USERS_ENDPOINTS.GET_ALL_USERS, {
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
		
		return rejectWithValue('Не удалось получилось получить пользователей');
	}
});

export const setAdmin = createAsyncThunk('setAdmin', async (data: SetAdminData, { rejectWithValue }) => {
	try {
		const response = await api.post(USERS_ENDPOINTS.SET_ADMIN, data, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось поменять статус админа');
	}
});
