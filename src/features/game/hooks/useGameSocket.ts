import { useAppSelector } from "@/app/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import socketService from '../../socket/socket';
import { GAME_EVENT_NAME } from "../types/game-events-name";
import type { SocketCallbackResponse } from "@/features/socket/types/response";
import { setGameState, setPlayersOnline } from "../store/gameSlice";
import type { JoinGameData } from "../types/game-socket-data-responses";

export const useGameSocket = () => {
    const dispatch = useDispatch();
    const isConnected = useAppSelector((state) => state.connectSocket.isConnected);

    const joinGame = useCallback((gameId: string) => {
        if (!isConnected) {
            console.warn('Нельзя присоединиться к игре: нет подключения');
            return;
        }

        socketService.emit(GAME_EVENT_NAME.JOIN_GAME, gameId, (response: SocketCallbackResponse<JoinGameData>) => {
            if (response.success) {
                dispatch(setGameState(response.data.gameState));
                dispatch(setPlayersOnline(response.data.playersOnline));
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);
    
    return {        
        joinGame
    };
};