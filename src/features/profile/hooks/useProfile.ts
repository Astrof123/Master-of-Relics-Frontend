import { useAppDispatch, useAppSelector } from "@/app/store";
import { useCallback, useMemo } from "react";
import { acceptFriendship, banUser, breakoffFriendship, declineFriendship, findFriends, getProfile, getReports, offerFriendship, sendReport, unbanUser } from "../store/actions";
import type { BanUserData, FindFriendsData, GetReportsData, SendReportUserData, UnbanUserData } from "../types/requests";
import { toast } from "sonner";

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const { profile, isLoading, error, usersForFriendship} = useAppSelector((state) => state.profile);
    
    const handleProfile = useCallback((id: string) => {
        return dispatch(getProfile(id)).unwrap()
            .catch((error) => {
                toast.error(error.message || 'Не удалось загрузить профиль');
                throw error;
            });
    }, [dispatch]);

    const handleAddFriend = useCallback((id: string) => {
        return dispatch(offerFriendship(id)).unwrap()
            .then(() => toast.success('Заявка в друзья отправлена'))
            .catch((error) => {
                toast.error(error.message || 'Не удалось отправить заявку');
                throw error;
            });
    }, [dispatch]);

    const handleAcceptFriend = useCallback((id: string) => {
        return dispatch(acceptFriendship(id)).unwrap()
            .then(() => toast.success('Пользователь добавлен в друзья'))
            .catch((error) => {
                toast.error(error.message || 'Не удалось принять заявку');
                throw error;
            });
    }, [dispatch]);

    const handleDeclineFriend = useCallback((id: string) => {
        return dispatch(declineFriendship(id)).unwrap()
            .then(() => toast.info('Заявка отклонена'))
            .catch((error) => {
                toast.error(error.message || 'Не удалось отклонить заявку');
                throw error;
            });
    }, [dispatch]);

    const handleBreakoffFriend = useCallback((id: string) => {
        return dispatch(breakoffFriendship(id)).unwrap()
            .then(() => toast.info('Пользователь удалён из друзей'))
            .catch((error) => {
                toast.error(error.message || 'Не удалось удалить из друзей');
                throw error;
            });
    }, [dispatch]);

    const handleFindFriends = useCallback((data: FindFriendsData) => {
        return dispatch(findFriends(data)).unwrap()
            .catch((error) => {
                toast.error(error.message || 'Не удалось найти пользователя');
                throw error;
            });
    }, [dispatch]);

    const handleSendReport = useCallback((data: SendReportUserData) => {
        return dispatch(sendReport(data)).unwrap()
            .then(() => toast.success('Жалоба отправлена администрации'))
            .catch((error) => {
                toast.error(error.message || 'Не удалось отправить жалобу');
                throw error;
            });
    }, [dispatch]);

    const handleGetReports = useCallback((data: GetReportsData) => {
        return dispatch(getReports(data)).unwrap()
            .catch((error) => {
                toast.error(error.message || 'Не удалось загрузить жалобы');
                throw error;
            });
    }, [dispatch]);

    const handleBanUser = useCallback((data: BanUserData) => {
        return dispatch(banUser(data)).unwrap()
            .then(() => toast.success('Пользователь забанен'))
            .catch((error) => {
                toast.error(error.message || 'Не удалось забанить пользователя');
                throw error;
            });
    }, [dispatch]);

    const handleUnbanUser = useCallback((data: UnbanUserData) => {
        return dispatch(unbanUser(data)).unwrap()
            .then(() => toast.success('Бан снят'))
            .catch((error) => {
                toast.error(error.message || 'Не удалось снять бан');
                throw error;
            });
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