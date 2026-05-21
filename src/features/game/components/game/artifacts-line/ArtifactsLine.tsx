import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    TouchSensor,
    type Modifier,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy
} from '@dnd-kit/sortable';

import { restrictToWindowEdges, restrictToParentElement, restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import type { ArtifactGameState, Line } from '@/features/game/types/state/game';
import { useCallback, useMemo } from 'react';
import styles from "./ArtifactsLine.module.css";
import clsx from 'clsx';
import SortableArtifactWrapper from '../sortable-artifact-wrapper/SortableArtifactWrapper';
import { useAppSelector } from '@/app/store';

interface ArtifactsLineProps {
    artifacts: ArtifactGameState[];
    line: Line;
    isYour: boolean;
    lineType: 'front' | 'back';
    onReorder: (newOrder: string[]) => void;
}

const ArtifactsLine = ({
    artifacts,
    line,
    isYour,
    lineType,
    onReorder
}: ArtifactsLineProps) => {
    const movedArtifact = useAppSelector((state) => state.game.movedArtifact);

    const artifactIds = artifacts.map(a => a.id);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        
        if (!over || active.id === over.id) return;

        const oldIndex = artifactIds.findIndex((id) => id === active.id);
        const newIndex = artifactIds.findIndex((id) => id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
            const newOrder = arrayMove(artifactIds, oldIndex, newIndex);
            onReorder(newOrder);
        }
    }, [artifactIds, onReorder]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const modifiers: Modifier[] = useMemo(() => [
        restrictToWindowEdges,
        restrictToHorizontalAxis,
        restrictToParentElement,
    ], []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={modifiers}
        >
            <SortableContext
                items={artifactIds}
                strategy={horizontalListSortingStrategy}
            >
                <div className={clsx(styles["artifacts-row"], styles[`${lineType}-line`])}>
                    {artifacts.map((artifact, index) => (
                        <SortableArtifactWrapper
                            key={artifact.id}
                            artifact={artifact}
                            index={index}
                            line={line}
                            isYour={isYour}
                            canMove={artifact.id === movedArtifact || movedArtifact === null}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default ArtifactsLine;