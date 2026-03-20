import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import lobbyReducer from '@/features/lobby/store/lobbySlice';
import connectSocketReducer from '@/features/socket/store/connectSlice';
import gameReducer from '@/features/game/store/gameSlice';
import modalReducer from '@/features/modal/store/modalSlice';
import choiceReducer from '@/features/game/store/choiceSlice';
import animationReducer from '@/features/game/store/animationSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        lobby: lobbyReducer,
        connectSocket: connectSocketReducer,
        game: gameReducer,
        modal: modalReducer,
        choice: choiceReducer,
        animation: animationReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();