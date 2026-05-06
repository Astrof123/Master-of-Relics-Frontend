import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { acceptFriendship, breakoffFriendship, declineFriendship, findFriends, getProfile, offerFriendship } from './actions';
import type { UserProfile } from '../types/responses';
import type { User } from '@/features/auth/types/responses';


interface ProfileState {
	profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
	usersForFriendship: User[];
}


const initialState: ProfileState = {
	profile: null,
    isLoading: false,
    error: null,
	usersForFriendship: []
};


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        offeredFriendship: (state, action: PayloadAction<string>) => {
            state.usersForFriendship = state.usersForFriendship.filter(user => user.id !== action.payload);
        },
        clearUsersForFriendship: (state) => {
            state.usersForFriendship = [];
        },
        setIsReported: (state, action: PayloadAction<boolean>) => {
			if (state.profile) {
				state.profile.isReported = action.payload;
			}
        },
        setIsBanned: (state, action: PayloadAction<boolean>) => {
			if (state.profile) {
				state.profile.isBanned = action.payload;
			}
        },
    },
	extraReducers: (builder) => {
		builder
			.addCase(getProfile.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
				state.isLoading = false;
				state.profile = action.payload;
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось получить данные профиля';
			})
			.addCase(offerFriendship.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(offerFriendship.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(offerFriendship.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось предложить дружбу';
			})
			.addCase(acceptFriendship.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(acceptFriendship.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(acceptFriendship.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось принять дружбу';
			})
			.addCase(declineFriendship.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(declineFriendship.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(declineFriendship.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось отклонить дружбу';
			})
			.addCase(breakoffFriendship.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(breakoffFriendship.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(breakoffFriendship.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось разорвать дружбу';
			})
			.addCase(findFriends.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(findFriends.fulfilled, (state, action: PayloadAction<User[]>) => {
				state.isLoading = false;
				state.usersForFriendship = action.payload;
			})
			.addCase(findFriends.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось получить список пользователей для дружбы';
			})
	},
});

export const {
	offeredFriendship,
	clearUsersForFriendship,
	setIsReported,
	setIsBanned
} = profileSlice.actions;

export default profileSlice.reducer;
