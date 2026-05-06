import { useAppDispatch, useAppSelector } from "@/app/store";
import { useCallback, useMemo } from "react";
import { acceptFriendship, banUser, breakoffFriendship, declineFriendship, findFriends, getProfile, getReports, offerFriendship, sendReport, unbanUser } from "../store/actions";
import type { BanUserData, FindFriendsData, GetReportsData, SendReportUserData, UnbanUserData } from "../types/requests";

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const { profile, isLoading, error, usersForFriendship} = useAppSelector((state) => state.profile);
    
    const handleProfile = useCallback((id: string) => {
        return dispatch(getProfile(id));
    }, [dispatch]);

    const handleAddFriend = useCallback((id: string) => {
        return dispatch(offerFriendship(id));
    }, [dispatch]);

    const handleAcceptFriend = useCallback((id: string) => {
        return dispatch(acceptFriendship(id));
    }, [dispatch]);

    const handleDeclineFriend = useCallback((id: string) => {
        return dispatch(declineFriendship(id));
    }, [dispatch]);

    const handleBreakoffFriend = useCallback((id: string) => {
        return dispatch(breakoffFriendship(id));
    }, [dispatch]);

    const handleFindFriends = useCallback((data: FindFriendsData) => {
        return dispatch(findFriends(data));
    }, [dispatch]);

    const handleSendReport = useCallback((data: SendReportUserData) => {
        return dispatch(sendReport(data));
    }, [dispatch]);

    const handleGetReports = useCallback((data: GetReportsData) => {
        return dispatch(getReports(data));
    }, [dispatch]);

    const handleBanUser = useCallback((data: BanUserData) => {
        return dispatch(banUser(data));
    }, [dispatch]);

    const handleUnbanUser = useCallback((data: UnbanUserData) => {
        return dispatch(unbanUser(data));
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
        handleSendReport,
        handleGetReports,
        handleFindFriends,
        handleBanUser,
        handleUnbanUser
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
        handleSendReport,
        handleGetReports,
        handleFindFriends,
        handleBanUser,
        handleUnbanUser
    ]);
}