import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, User } from '../types';
import { login, refreshToken } from './actions';


interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
}


const initialState: AuthState = {
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.isLoading = false;
				state.accessToken = action.payload.accessToken;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Не удалось войти';
			})
			.addCase(refreshToken.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(refreshToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.isLoading = false;
				state.accessToken = action.payload.accessToken;
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Не удалось получить данные';
				state.accessToken = null;
				state.user = null;
			})
	},
});

export default authSlice.reducer;
