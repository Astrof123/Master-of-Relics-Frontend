import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CollectionData } from '../types/responses';
import { getOwnCollection, purchaseCard } from './actions';


interface CollectionState {
    collection: CollectionData | null;
    isLoading: boolean;
    error: string | null;
}


const initialState: CollectionState = {
    collection: null,
    isLoading: false,
    error: null,
};


const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {

    },
	extraReducers: (builder) => {
		builder
			.addCase(getOwnCollection.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getOwnCollection.fulfilled, (state, action: PayloadAction<CollectionData>) => {
				state.isLoading = false;
				state.collection = action.payload;
			})
			.addCase(getOwnCollection.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string || 'Не удалось получить коллекцию';
			})
			.addCase(purchaseCard.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(purchaseCard.fulfilled, (state, action: PayloadAction<CollectionData>) => {
				state.isLoading = false;
				state.collection = action.payload;
			})
			.addCase(purchaseCard.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string || 'Не удалось купить карту';
			})
	},
});

export default collectionSlice.reducer;
