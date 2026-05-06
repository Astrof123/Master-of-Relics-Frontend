import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import lobbyReducer from '@/features/lobby/store/lobbySlice';
import connectSocketReducer from '@/features/socket/store/connectSlice';
import gameReducer from '@/features/game/store/gameSlice';
import cardModalReducer from '@/features/modal/store/cardModalSlice';
import generalModalReducer from '@/features/modal/store/generalModalSlice';
import choiceReducer from '@/features/game/store/choiceSlice';
import animationReducer from '@/features/game/store/animationSlice';
import collectionReducer from '@/features/collection/store/collectionSlice';
import controlReducer from '@/features/game/store/controlSlice';
import profileReducer from '@/features/profile/store/profileSlice';
import reportReducer from '@/features/profile/store/reportSlice';
import inviteCodeReducer from '@/features/invite-code/store/inviteCodeSlice';
import userReducer from '@/features/users/store/userSlice';
import deckProducer from '@/features/collection/store/deckSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        lobby: lobbyReducer,
        connectSocket: connectSocketReducer,
        game: gameReducer,
        cardModal: cardModalReducer,
        generalModal: generalModalReducer,
        choice: choiceReducer,
        animation: animationReducer,
        collection: collectionReducer,
        control: controlReducer,
        profile: profileReducer,
        report: reportReducer,
        inviteCode: inviteCodeReducer,
        users: userReducer,
        deck: deckProducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();