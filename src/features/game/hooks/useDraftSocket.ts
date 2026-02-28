import { useAppSelector } from "@/app/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import socketService from '../../socket/socket';
import type { SocketCallbackResponse } from "@/features/socket/types/response";
import { setDraftedArtifact } from "../store/gameSlice";
import { DRAFT_EVENT_NAME } from "../types/draft/draft-events-name";
import type { PickArtifactData } from "../types/draft/draft-evens-data";

export const useDraftSocket = () => {
    const dispatch = useDispatch();
    const isConnected = useAppSelector((state) => state.connectSocket.isConnected);

    const pickArtifact = useCallback((gameId: string, pickedArtifactId: number) => {
        if (!isConnected) {
            console.warn('Нельзя выбрать артефакт: нет подключения');
            return;
        }

        const data: PickArtifactData = {
            gameId: gameId,
            artifactId: pickedArtifactId
        }

        socketService.emit(DRAFT_EVENT_NAME.PICK_ARTIFACT, data, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                dispatch(setDraftedArtifact(pickedArtifactId));
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);
    

    const toggleReadyDraft = useCallback((gameId: string) => {
        if (!isConnected) {
            console.warn('Нельзя переключить готовность: нет подключения');
            return;
        }

        socketService.emit(DRAFT_EVENT_NAME.TOGGLE_READY_DRAFT, gameId, (response: SocketCallbackResponse<null>) => {
            if (response.success) {
                
            } else {
                console.error('Ошибка:', response.message);
            }
        });
    }, [isConnected]);

    return {        
        pickArtifact,
        toggleReadyDraft
    };
};