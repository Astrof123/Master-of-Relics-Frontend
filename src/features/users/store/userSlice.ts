import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/features/auth/types/responses';
import type { GetUsersResponseData } from '../types/responses';
import { getAllUsers, setAdmin } from './actions';


interface UserState {
	users: GetUsersResponseData | null;
    isLoading: boolean;
    error: string | null;
	usersForFriendship: User[];
}


const initialState: UserState = {
	users: null,
    isLoading: false,
    error: null,
	usersForFriendship: []
};


interface SetAdminAfterRequest {
	userId: string;
	isAdmin: boolean;
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAdminAfterRequest: (state, action: PayloadAction<SetAdminAfterRequest>) => {
			if (state.users) {
				const user = state.users.data.find(u => u.id === action.payload.userId);
				if (user) {
					user.isAdmin = action.payload.isAdmin;
				}
			}
        },
    },
	extraReducers: (builder) => {
		builder
			.addCase(getAllUsers.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getAllUsers.fulfilled, (state, action: PayloadAction<GetUsersResponseData>) => {
				state.isLoading = false;
				state.users = action.payload;
			})
			.addCase(getAllUsers.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось получить пользователей';
			})
			.addCase(setAdmin.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(setAdmin.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(setAdmin.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось настроить админку';
			})
	},
});

export const {
	setAdminAfterRequest
} = userSlice.actions;

export default userSlice.reducer;
