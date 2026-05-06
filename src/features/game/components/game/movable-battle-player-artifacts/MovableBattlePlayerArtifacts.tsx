import { LINE, type ArtifactGameState } from "@/features/game/types/state/game";
import clsx from "clsx";
import styles from "./MovableBattlePlayerArtifacts.module.css"

import { useCallback, useEffect, useState, useMemo } from 'react';
import { useAppDispatch } from "@/app/store";
import { reorderArtifacts } from "@/features/game/store/gameSlice";
import ArtifactsLine from "../artifacts-line/ArtifactsLine";

export interface BattlePlayerArtifactsProps {
    artifacts: ArtifactGameState[];
}

interface ArtifactsOrder {
    front: string[];
    back: string[];
}


const MovableBattlePlayerArtifacts = (props: BattlePlayerArtifactsProps) => {
    const dispatch = useAppDispatch();
    const allArtifacts = props.artifacts as ArtifactGameState[];
    
    const { frontLineArtifacts, backLineArtifacts } = useMemo(() => ({
        frontLineArtifacts: allArtifacts.filter(artifact => artifact.line === LINE.FRONT).sort((a1, a2) => a1.position - a2.position),
        backLineArtifacts: allArtifacts.filter(artifact => artifact.line === LINE.BACK).sort((a1, a2) => a1.position - a2.position),
    }), [allArtifacts]);

    const [localOrder, setLocalOrder] = useState<ArtifactsOrder>(() => ({
        front: frontLineArtifacts.map(artifact => artifact.id),
        back: backLineArtifacts.map(artifact => artifact.id),
    }));

    useEffect(() => {
        const newFrontIds = frontLineArtifacts.map(artifact => artifact.id);
        const newBackIds = backLineArtifacts.map(artifact => artifact.id);
        
        const frontSetChanged = 
            newFrontIds.length !== localOrder.front.length ||
            !newFrontIds.every(id => localOrder.front.includes(id));
        
        const backSetChanged = 
            newBackIds.length !== localOrder.back.length ||
            !newBackIds.every(id => localOrder.back.includes(id));
        
        if (frontSetChanged || backSetChanged) {
            setLocalOrder({
                front: newFrontIds,
                back: newBackIds,
            });
        }
    }, [frontLineArtifacts, backLineArtifacts, localOrder.front, localOrder.back]);

    const sortedFrontLineArtifacts = useMemo(() => 
        localOrder.front
            .map(id => allArtifacts.find(a => a.id === id))
            .filter((artifact): artifact is ArtifactGameState => 
                artifact !== undefined && artifact.line === LINE.FRONT
            )
            .sort((a1, a2) => a1.position - a2.position), 
        [localOrder.front, allArtifacts]
    );

    const sortedBackLineArtifacts = useMemo(() => 
        localOrder.back
            .map(id => allArtifacts.find(a => a.id === id))
            .filter((artifact): artifact is ArtifactGameState => 
                artifact !== undefined && artifact.line === LINE.BACK
            )
            .sort((a1, a2) => a1.position - a2.position),
             
        [localOrder.back, allArtifacts]
    );

    const handleFrontLineReorder = useCallback((newOrder: string[]) => {
        setLocalOrder(prev => ({
            ...prev,
            front: newOrder
        }));
        
        dispatch(reorderArtifacts({
            front: newOrder,
            back: localOrder.back
        }));
    }, [dispatch, localOrder.back]);

    const handleBackLineReorder = useCallback((newOrder: string[]) => {
        setLocalOrder(prev => ({
            ...prev,
            back: newOrder
        }));
        
        dispatch(reorderArtifacts({
            front: localOrder.front,
            back: newOrder
        }));
    }, [dispatch, localOrder.front]);

    return (
        <div className={clsx(styles.container)}>
            <ArtifactsLine
                artifacts={sortedFrontLineArtifacts}
                line={LINE.FRONT}
                isYour={true}
                lineType="front"
                onReorder={handleFrontLineReorder}
            />

            <ArtifactsLine
                artifacts={sortedBackLineArtifacts}
                line={LINE.BACK}
                isYour={true}
                lineType="back"
                onReorder={handleBackLineReorder}
            />
        </div>
    );
};

export default MovableBattlePlayerArtifacts;