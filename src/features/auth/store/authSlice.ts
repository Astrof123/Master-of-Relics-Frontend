import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, User } from '../types/responses';
import { login, logout, me, refreshToken, register } from './actions';


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
				state.error = action.payload as string || 'Не удалось войти';
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.isLoading = false;
				state.accessToken = action.payload.accessToken;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось зарегистрироваться';
				console.log(state.error);
			})
			.addCase(refreshToken.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(refreshToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.isLoading = false;
				state.accessToken = action.payload.accessToken;
			})
			.addCase(refreshToken.rejected, (state) => {
				state.isLoading = false;
				state.accessToken = null;
				state.user = null;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.accessToken = null;
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось выйти из системы';
			})
			.addCase(me.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(me.fulfilled, (state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(me.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось выйти из системы';
			})
	},
});

export default authSlice.reducer;
