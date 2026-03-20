import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { shiftAnimation } from '@/features/game/store/animationSlice';
import { ANIMATION } from '@/features/game/types/game/animation';

export const useArtifactAnimations = (artifactGameId: string, animations: any[]) => {
    const dispatch = useDispatch();
    const [showDamage, setShowDamage] = useState(false);
    const [showHeal, setShowHeal] = useState(false);
    const [animationValue, setAnimationValue] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const damageTimerRef = useRef<ReturnType<typeof setTimeout>>(0);
    const healTimerRef = useRef<ReturnType<typeof setTimeout>>(0);

    useEffect(() => {
        return () => {
            if (damageTimerRef.current) clearTimeout(damageTimerRef.current);
            if (healTimerRef.current) clearTimeout(healTimerRef.current);
        };
    }, []);

    useEffect(() => {
        if (animations.length > 0 && animations[0].artifactGameId === artifactGameId) {
            const value = animations[0].value;
            const animationType = animations[0].animation;
            
            if (damageTimerRef.current) clearTimeout(damageTimerRef.current);
            if (healTimerRef.current) clearTimeout(healTimerRef.current);

            if (animationType === ANIMATION.HIT) {
                setAnimationValue(value);
                setShowDamage(true);
                setIsAnimating(true);
                
                damageTimerRef.current = setTimeout(() => {
                    setShowDamage(false);
                    setIsAnimating(false);
                }, 1000);
            }
            else if (animationType === ANIMATION.HEAL) {
                setAnimationValue(value);
                setShowHeal(true);
                setIsAnimating(true);
                
                healTimerRef.current = setTimeout(() => {
                    setShowHeal(false);
                    setIsAnimating(false);
                }, 1000);
            }

            dispatch(shiftAnimation());
        }
    }, [animations.length, artifactGameId, dispatch]);

    return { showDamage, showHeal, animationValue, isAnimating };
};