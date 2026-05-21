import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetInviteCodesResponseData, InviteCodeData } from "../types/responses";
import { changeStatus, createInviteCodes, deleteInviteCode, getInviteCodes } from "./actions";
import type { ChangeStatusData } from "../types/requests";


interface InviteCodeState {
	inviteCodes: GetInviteCodesResponseData | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: InviteCodeState = {
	inviteCodes: null,
    isLoading: false,
    error: null,
};


const inviteCodeSlice = createSlice({
    name: 'inviteCode',
    initialState,
    reducers: {
        setNewStatus: (state, action: PayloadAction<ChangeStatusData>) => {
			if (state.inviteCodes) {
				const inviteCode = state.inviteCodes.data.find(inviteCode => inviteCode.id === action.payload.inviteCodeId);
                if (inviteCode) {
                    inviteCode.status = action.payload.newStatus;
                }
			}
        },
        deleteInviteCodeAfterRequest: (state, action: PayloadAction<string>) => {
			if (state.inviteCodes) {
				state.inviteCodes.data = state.inviteCodes.data.filter(inviteCode => inviteCode.id !== action.payload);
                state.inviteCodes.total -= 1;
                state.inviteCodes.data = state.inviteCodes.data.slice(0, state.inviteCodes.limit)
                state.inviteCodes.totalPages = Math.ceil(state.inviteCodes.total / state.inviteCodes.limit)
			}
        },
    },
	extraReducers: (builder) => {
		builder
			.addCase(createInviteCodes.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createInviteCodes.fulfilled, (state, action: PayloadAction<InviteCodeData[]>) => {
				state.isLoading = false;
                if (state.inviteCodes) {
                    state.inviteCodes.data = state.inviteCodes.data.concat(action.payload)
                    state.inviteCodes.total += 1
                    state.inviteCodes.data = state.inviteCodes.data.slice(0, state.inviteCodes.limit)
                    state.inviteCodes.totalPages = Math.ceil(state.inviteCodes.total / state.inviteCodes.limit)
                }
			})
			.addCase(createInviteCodes.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось cоздать инвайт-коды';
			})
            .addCase(deleteInviteCode.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteInviteCode.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteInviteCode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Не удалось удалить инвайт-код';
            })
			.addCase(getInviteCodes.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getInviteCodes.fulfilled, (state, action: PayloadAction<GetInviteCodesResponseData>) => {
				state.isLoading = false;
				state.inviteCodes = action.payload;
			})
			.addCase(getInviteCodes.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось получить инвайт-коды';
			})
            .addCase(changeStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeStatus.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changeStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Не удалось поменять статус инвайт-кода';
            })
	},
});

export const {
    setNewStatus,
    deleteInviteCodeAfterRequest
} = inviteCodeSlice.actions;

export default inviteCodeSlice.reducer;
