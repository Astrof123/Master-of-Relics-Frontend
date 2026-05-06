import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/shared/api/client';
import type { CollectionData, DecksData } from '../types/responses';
import type { ChangeActiveDeckData, ChangeDeckCardsData } from '../types/requests';


const COLLECTION_ENDPOINTS = {
    OWN: '/collection/own',
	PURCHASE: '/collection/purchase',
} as const

const DECK_ENDPOINTS = {
    GET_DECKS: '/decks',
	CHANGE_ACTIVE_DECK: '/decks',
	CHANGE_DECK_CARDS: '/decks/cards',
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


export const getDecks = createAsyncThunk('getDecks', async (_, { rejectWithValue }) => {
	try {
		const response = await api.get<DecksData>(DECK_ENDPOINTS.GET_DECKS, {
			withAuth: true,
			retryOnUnauthorized: true
		});

		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось получилось данные о колодах');
	}
});

export const changeActiveDeck = createAsyncThunk('changeActiveDeck', async (data: ChangeActiveDeckData, { rejectWithValue }) => {
	try {
		const response = await api.post(DECK_ENDPOINTS.CHANGE_ACTIVE_DECK, data, {
			withAuth: true,
			retryOnUnauthorized: true
		});
		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось поменять активную колоду');
	}
});

export const changeDeckCards = createAsyncThunk('changeDeckCards', async (data: ChangeDeckCardsData, { rejectWithValue }) => {
	try {
		const response = await api.post(DECK_ENDPOINTS.CHANGE_DECK_CARDS, data, {
			withAuth: true,
			retryOnUnauthorized: true
		});
		return response.data;
	}
	catch (error: any) {
		if (error.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		
		return rejectWithValue('Не удалось поменять карты в колоде');
	}
});
