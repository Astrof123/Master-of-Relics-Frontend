import { useAppSelector } from "@/app/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import socketService from '../../socket/socket';
import type { SocketCallbackResponse } from "@/features/socket/types/response";
import { setGameState, setPlayersOnline, setTimer } from "../store/gameSlice";
import type { JoinGameData } from "../types/socket/game-socket-data-responses";
import { GAME_EVENT_NAME } from "../types/socket/game-events-name";
import type { ExtraActionData, ToggleReadyMovementData, UseFaceData, UseSkillData, UseSpellData } from "../../action/types/action-evens-data";
import { ACTION_EVENT_NAME } from "../../action/types/action-events-name";
import { TimerService } from "../helpers/timerHelper";
import { toast } from "sonner";

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
                
                if (response.data.timer && response.data.timer.active) {
                    TimerService.getInstance().startTimer(response.data.timer);
                } else {
                    TimerService.getInstance().stopTimer();
                }
            } else {
                toast.error(response.message);
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
                toast.error(response.message);
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
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const giveUp = useCallback((gameId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.GIVE_UP, gameId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {

            } 
            else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const offerDraw = useCallback((gameId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.OFFER_DRAW, gameId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
            } 
            else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const cancelDraw = useCallback((gameId: string) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.CANCEL_DRAW, gameId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
            } 
            else {
                toast.error(response.message);
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
                toast.error(response.message);
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
                toast.error(response.message);
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
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const useSpell = useCallback((data: UseSpellData) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.USE_SPELL, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {

            } 
            else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    const toggleReadyMovement = useCallback((data: ToggleReadyMovementData) => {
        if (!isConnected) {
            return;
        }

        socketService.emit(ACTION_EVENT_NAME.TOGGLE_READY_MOVEMENT, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {

            } 
            else {
                toast.error(response.message);
            }
        });
    }, [isConnected]);

    return {        
        joinGame,
        useFace,
        endTurn,
        extraAction,
        endRound,
        useSkill,
        useSpell,
        toggleReadyMovement,
        giveUp,
        offerDraw,
        cancelDraw
    };
};