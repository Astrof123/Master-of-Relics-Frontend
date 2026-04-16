import type { ArtifactGameState, Line } from "@/features/game/types/state/game";
import styles from "./SortableArtifactWrapper.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import clsx from "clsx";
import BattleArtifact from "../battle-artifact/BattleArtifact";
import { useAppSelector } from "@/app/store";

interface SortableArtifactWrapperProps { 
    artifact: ArtifactGameState; 
    index: number; 
    line: Line; 
    isYour: boolean;
    isDragOver?: boolean;
    canMove: boolean;
}

const SortableArtifactWrapper = ({ 
    artifact, 
    index, 
    line, 
    isYour,
    isDragOver = false,
    canMove = true
}: SortableArtifactWrapperProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useSortable({ 
        id: artifact.id,
        disabled: !canMove,
        data: {
            line: artifact.line,
            type: 'artifact'
        }
    });

    const movedArtifact = useAppSelector(state => state.game.movedArtifact);

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition: (() => {
            if (isDragging) return 'none';
            if (!transform) return 'none';
            return 'transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        })(),
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1000 : 'auto',
        willChange: isDragging ? 'transform' : 'auto',
        // pointerEvents: isDragging ? 'none' : 'auto' as const,
        maxWidth: '100vw',
        maxHeight: '100vh',
    };
    
    const wrapperClasses = clsx({
        [styles["artifact-wrapper"]]: true,
        [styles["artifact-wrapper--dragging"]]: isDragging,
        [styles["artifact-wrapper--drag-over"]]: isDragOver,
        [styles["artifact-wrapper--cannot-move"]]: isDragOver && !canMove,
        [styles["artifact-wrapper--movable"]]: canMove && !isDragging && artifact.id === movedArtifact,
    });

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className={wrapperClasses}
            {...attributes} 
            {...listeners}
            data-id={artifact.id}
        >
            <BattleArtifact
                artifact={artifact}
                index={index}
                line={line}
                isYour={isYour}
            />
        </div>
    );
};

export default SortableArtifactWrapper;