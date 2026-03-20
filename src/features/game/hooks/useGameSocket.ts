import { useAppSelector } from "@/app/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import socketService from '../../socket/socket';
import type { SocketCallbackResponse } from "@/features/socket/types/response";
import { setGameState, setPlayersOnline } from "../store/gameSlice";
import type { JoinGameData } from "../types/socket/game-socket-data-responses";
import { GAME_EVENT_NAME } from "../types/socket/game-events-name";
import type { ExtraActionData, UseFaceData, UseSkillData } from "../../action/types/action-evens-data";
import { ACTION_EVENT_NAME } from "../../action/types/action-events-name";

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
    
    const useFace = useCallback((data: UseFaceData) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.USE_FACE, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {

            } 
            else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const endTurn = useCallback((gameId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.END_TURN, gameId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {

            } 
            else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const endRound = useCallback((gameId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.END_ROUND, gameId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {

            } 
            else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const extraAction = useCallback((data: ExtraActionData) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.EXTRA_ACTION, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {

            } 
            else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    const useSkill = useCallback((data: UseSkillData) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.USE_SKILL, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {

            } 
            else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    return {        
        joinGame,
        useFace,
        endTurn,
        extraAction,
        endRound,
        useSkill
    };
};