import { api } from "@/shared/api/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ChangeStatusData, CreateInviteCodesData, DeleteInviteCodeData, GetInviteCodesData } from "../types/requests";
import type { GetInviteCodesResponseData, InviteCodeData } from "../types/responses";

const INVITE_CODES_ENDPOINTS = {
    GET_INVITE_CODES: "invite-codes",
	CREATE_INVITE_CODES: "invite-codes",
	DELETE_INVITE_CODES: "invite-codes",
	CHANGE_STATUS: "invite-codes/status",
}

export const getInviteCodes = createAsyncThunk('getInviteCodes', async (data: GetInviteCodesData, { rejectWithValue }) => {
    try {
        const response = await api.get<GetInviteCodesResponseData>(INVITE_CODES_ENDPOINTS.GET_INVITE_CODES, {
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
        
        return rejectWithValue('Не удалось получить инвайт-коды');
    }
});

export const deleteInviteCode = createAsyncThunk('deleteInviteCode', async (data: DeleteInviteCodeData, { rejectWithValue }) => {
	try {

		const response = await api.delete(INVITE_CODES_ENDPOINTS.DELETE_INVITE_CODES + `/${data.inviteCodeId}`, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось удалить инвайт-код');
	}
});

export const createInviteCodes = createAsyncThunk('createInviteCodes', async (data: CreateInviteCodesData, { rejectWithValue }) => {
	try {

		const response = await api.post<InviteCodeData[]>(INVITE_CODES_ENDPOINTS.CREATE_INVITE_CODES, data, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось создать инвайт-коды');
	}
});

export const changeStatus = createAsyncThunk('changeStatus', async (data: ChangeStatusData, { rejectWithValue }) => {
	try {
		console.log(data)
		const response = await api.post(INVITE_CODES_ENDPOINTS.CHANGE_STATUS, data, {
			withAuth: true,
			retryOnUnauthorized: true,
			
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось поменять статус инвайт-кода');
	}
});

