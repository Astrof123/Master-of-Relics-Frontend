import { useAppDispatch, useAppSelector } from '@/app/store';
import { useCallback, useMemo } from 'react';
import { getOwnCollection, purchaseCard } from '../store/actions';
import { me } from '@/features/auth/store/actions';


export const useCollection = () => {
    const dispatch = useAppDispatch();
    const { collection, isLoading, error } = useAppSelector((state) => state.collection);

    const handleBuyArtifact = useCallback(async (cardId: number) => {
        await dispatch(purchaseCard(cardId));
        await dispatch(me())
    }, [dispatch]);

    const handleGetOwnCollection = useCallback(() => {
        return dispatch(getOwnCollection());
    }, [dispatch]);


    return useMemo(() => ({
        collection,
        isLoading,
        error,
        handleGetOwnCollection,
        handleBuyArtifact
    }), [
        collection, 
        isLoading, 
        error, 
        handleGetOwnCollection,
        handleBuyArtifact
    ]);
}