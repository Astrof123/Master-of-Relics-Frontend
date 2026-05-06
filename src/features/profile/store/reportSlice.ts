import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetReportsResponseDto, ReportResponseData } from "../types/responses";
import { getReports, sendReport } from "./actions";

interface ReportState {
	reports: GetReportsResponseDto | null;
    isLoading: boolean;
    error: string | null;
}


const initialState: ReportState = {
	reports: null,
    isLoading: false,
    error: null,
};


const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
    },
	extraReducers: (builder) => {
		builder
            .addCase(sendReport.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendReport.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(sendReport.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Не удалось отправить жалобу';
            })
			.addCase(getReports.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getReports.fulfilled, (state, action: PayloadAction<GetReportsResponseDto>) => {
				state.isLoading = false;
				state.reports = action.payload;
			})
			.addCase(getReports.rejected, (state, action) => {
				state.isLoading = false;
  				state.error = action.payload as string || 'Не удалось получить жалобы';
			})
	},
});

export const {
} = reportSlice.actions;

export default reportSlice.reducer;
