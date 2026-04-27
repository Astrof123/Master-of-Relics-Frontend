import { useAppDispatch, useAppSelector } from "@/app/store";
import { useCallback, useMemo } from "react";
import { acceptFriendship, breakoffFriendship, declineFriendship, findFriends, getProfile, offerFriendship } from "../store/actions";
import type { FindFriendsData } from "../types/requests";

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const { profile, isLoading, error, usersForFriendship} = useAppSelector((state) => state.profile);
    
    const handleProfile = useCallback((id: number) => {
        return dispatch(getProfile(id));
    }, [dispatch]);

    const handleAddFriend = useCallback((id: number) => {
        return dispatch(offerFriendship(id));
    }, [dispatch]);

    const handleAcceptFriend = useCallback((id: number) => {
        return dispatch(acceptFriendship(id));
    }, [dispatch]);

    const handleDeclineFriend = useCallback((id: number) => {
        return dispatch(declineFriendship(id));
    }, [dispatch]);

    const handleBreakoffFriend = useCallback((id: number) => {
        return dispatch(breakoffFriendship(id));
    }, [dispatch]);

    const handleFindFriends = useCallback((data: FindFriendsData) => {
        return dispatch(findFriends(data));
    }, [dispatch]);

    const handleReport = useCallback((id: number) => {
        // return dispatch(getProfile(id));
    }, [dispatch]);

    return useMemo(() => ({
        profile,
        isLoading,
        error,
        usersForFriendship,
        handleProfile,
        handleAddFriend,
        handleAcceptFriend,
        handleDeclineFriend,
        handleBreakoffFriend,
        handleReport,
        handleFindFriends
    }), [
        profile, 
        isLoading, 
        error, 
        usersForFriendship,
        handleProfile,
        handleAddFriend,
        handleAcceptFriend,
        handleDeclineFriend,
        handleBreakoffFriend,
        handleReport,
        handleFindFriends
    ]);
}