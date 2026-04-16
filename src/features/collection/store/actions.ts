import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/shared/api/client';
import type { CollectionData } from '../types/responses';


const COLLECTION_ENDPOINTS = {
    OWN: '/collection/own',
	PURCHASE: '/collection/purchase',
} as const


export const getOwnCollection = createAsyncThunk('collection/own', async (_, { rejectWithValue }) => {
	try {
		const response = await api.get<CollectionData>(COLLECTION_ENDPOINTS.OWN, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось получилось данные о коллекции');
	}
});

export const purchaseCard = createAsyncThunk('collection/purchase', async (cardId: number, { rejectWithValue }) => {
	try {
		const response = await api.post<CollectionData>(COLLECTION_ENDPOINTS.PURCHASE, { cardId }, {
			withAuth: true,
			retryOnUnauthorized: true
		});
		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось получилось данные о коллекции');
	}
});