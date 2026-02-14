import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface ConnectSocketState {
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
}


const initialState: ConnectSocketState = {
    isConnected: false,
    isLoading: false,
    error: null,
};


const connectSocketSlice = createSlice({
    name: 'connectSocket',
    initialState,
    reducers: {
        connectionEstablished: (state) => {
            state.isConnected = true;
            state.error = null;
        },
        
        connectionLost: (state) => {
            state.isConnected = false;
        },
        
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});


export const {
    connectionEstablished,
    connectionLost,
    setLoading,
    setError,
} = connectSocketSlice.actions;

export default connectSocketSlice.reducer;