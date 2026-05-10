import { useAppDispatch, useAppSelector } from '@/app/store';
import { useCallback, useMemo } from 'react';
import { getOwnCollection, purchaseCard } from '../store/actions';
import { me } from '@/features/auth/store/actions';
import { toast } from 'sonner';


export const useCollection = () => {
    const dispatch = useAppDispatch();
    const { collection, isLoading, error } = useAppSelector((state) => state.collection);

    const handleBuyArtifact = useCallback(async (cardId: number) => {
        try {
            await dispatch(purchaseCard(cardId)).unwrap();
            toast.success('Карта успешно куплена!');
            await dispatch(me());
        } catch (error: any) {
            toast.error(error.message || 'Не удалось купить карту');
        }
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