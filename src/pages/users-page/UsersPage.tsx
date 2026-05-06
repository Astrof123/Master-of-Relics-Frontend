import styles from "./UsersPage.module.css";
import { useEffect, useState } from "react";
import type { GetUsersData } from "@/features/users/types/requests";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getAllUsers, setAdmin } from "@/features/users/store/actions";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { setAdminAfterRequest } from "@/features/users/store/userSlice";

function UsersPage() {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.auth.user);
    const users = useAppSelector(state => state.users.users);
    const isLoading = useAppSelector(state => state.users.isLoading);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [bannedFilter, setBannedFilter] = useState<"all" | "banned" | "notBanned">("all");
    const [adminFilter, setAdminFilter] = useState<"all" | "admin" | "notAdmin">("all");
    const [processingUserId, setProcessingUserId] = useState<string | null>(null);
    const limit = 10;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        let isBanned: boolean | undefined = undefined;
        if (bannedFilter === "banned") {
            isBanned = true;
        } else if (bannedFilter === "notBanned") {
            isBanned = false;
        }

        let isAdmin: boolean | undefined = undefined;
        if (adminFilter === "admin") {
            isAdmin = true;
        } else if (adminFilter === "notAdmin") {
            isAdmin = false;
        }

        const data: GetUsersData = {
            limit: limit,
            page: currentPage,
            userId: debouncedSearch || undefined,
            isBanned: isBanned,
            isAdmin: isAdmin
        }

        dispatch(getAllUsers(data));
    }, [currentPage, debouncedSearch, bannedFilter, adminFilter]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (users && currentPage < users.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setBannedFilter("all");
        setAdminFilter("all");
        setCurrentPage(1);
    };

    const handleSetAdmin = async (userId: string, isAdmin: boolean) => {
        setProcessingUserId(userId);
        try {
            await dispatch(setAdmin({ userId, isAdmin })).unwrap();
            let isBanned: boolean | undefined = undefined;
            if (bannedFilter === "banned") {
                isBanned = true;
            } else if (bannedFilter === "notBanned") {
                isBanned = false;
            }

            let isAdminFilterValue: boolean | undefined = undefined;
            if (adminFilter === "admin") {
                isAdminFilterValue = true;
            } else if (adminFilter === "notAdmin") {
                isAdminFilterValue = false;
            }

            dispatch(setAdminAfterRequest({
                userId: userId,
                isAdmin: isAdmin
            }));
        } catch (error) {
            console.error("Ошибка при изменении прав администратора");
        } finally {
            setProcessingUserId(null);
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const isUserBanned = (user: any) => {
        return user.bannedUntil && new Date(user.bannedUntil) > new Date();
    };

    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <div className={styles["header-content"]}>
                    <h1 className={styles["header-title"]}>Пользователи</h1>
                </div>
                <div className={styles["header-right-content"]}>
                    <div className={styles["header-actions"]}>
                        <button 
                            className={styles["filter-toggle"]}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
                        </button>
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className={styles["filters-panel"]}>
                    <div className={styles["filter-group"]}>
                        <label className={styles["filter-label"]}>
                            Поиск по ID пользователя
                        </label>
                        <input 
                            type="search" 
                            className={styles["filter-input"]}
                            placeholder="Введите ID пользователя..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles["filter-group"]}>
                        <label className={styles["filter-label"]}>
                            Статус бана
                        </label>
                        <select 
                            className={styles["status-select"]}
                            value={bannedFilter}
                            onChange={(e) => setBannedFilter(e.target.value as "all" | "banned" | "notBanned")}
                        >
                            <option value="all">Все</option>
                            <option value="banned">Забаненные</option>
                            <option value="notBanned">Не забаненные</option>
                        </select>
                    </div>

                    <div className={styles["filter-group"]}>
                        <label className={styles["filter-label"]}>
                            Права администратора
                        </label>
                        <select 
                            className={styles["status-select"]}
                            value={adminFilter}
                            onChange={(e) => setAdminFilter(e.target.value as "all" | "admin" | "notAdmin")}
                        >
                            <option value="all">Все</option>
                            <option value="admin">Администраторы</option>
                            <option value="notAdmin">Не администраторы</option>
                        </select>
                    </div>

                    {(searchQuery || bannedFilter !== "all" || adminFilter !== "all") && (
                        <button 
                            className={styles["reset-filters"]}
                            onClick={handleResetFilters}
                        >
                            Сбросить
                        </button>
                    )}
                </div>
            )}

            {isLoading ? (
                <div className={styles["loading"]}>
                    <div className={styles["loading-spinner"]}></div>
                    <span>Загрузка пользователей...</span>
                </div>
            ) : users && users.data.length > 0 ? (
                <>
                    <div className={styles["table"]}>
                        <div className={styles["table-header"]}>
                            <div className={styles["col-id"]}>ID</div>
                            <div className={styles["col-nickname"]}>Никнейм</div>
                            <div className={styles["col-admin"]}>Администратор</div>
                            <div className={styles["col-ban-date"]}>Бан до</div>
                            <div className={styles["col-ban-reason"]}>Причина бана</div>
                            <div className={styles["col-actions"]}>Действия</div>
                        </div>
                        <div className={styles["table-body"]}>
                            {users.data.map((user) => {
                                const isBanned = isUserBanned(user);
                                return (
                                    <div key={user.id} className={styles["user-row"]}>
                                        <div className={styles["col-id"]}>
                                            <span className={styles["user-id"]}>{user.id.slice(0, 10) + "..."}</span>
                                        </div>
                                        <div className={styles["col-nickname"]}>
                                            <Link to={`/profile/${user.id}`} className={styles["user-link"]}>
                                                <span className={styles["user-name"]}>{user.nickname}</span>
                                            </Link>
                                        </div>
                                        <div className={styles["col-admin"]}>
                                            <span className={clsx(styles["admin-badge"], user.isAdmin && styles["admin-badge--true"])}>
                                                {user.isAdmin ? "Администратор" : "Обычный"}
                                            </span>
                                        </div>
                                        <div className={styles["col-ban-date"]}>
                                            <span className={styles["date"]}>
                                                {formatDate(user.bannedUntil)}
                                            </span>
                                        </div>
                                        <div className={styles["col-ban-reason"]}>
                                            <span className={styles["ban-reason"]}>
                                                {user.banReason?.slice(0, 40) || "—"}
                                            </span>
                                        </div>
                                        <div className={styles["col-actions"]}>
                                            {currentUser?.isSuperAdmin && (
                                                <button 
                                                    className={clsx(styles["admin-btn"], user.isAdmin && styles["admin-btn--remove"])}
                                                    onClick={() => handleSetAdmin(user.id, !user.isAdmin)}
                                                    disabled={processingUserId === user.id}
                                                >
                                                    {processingUserId === user.id ? (
                                                        <span className={styles["spinner-small"]}></span>
                                                    ) : user.isAdmin ? (
                                                        "Снять админку"
                                                    ) : (
                                                        "Выдать админку"
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {users.totalPages > 1 && (
                        <div className={styles["pagination"]}>
                            <button 
                                className={clsx(styles["page-btn"], currentPage === 1 && styles["disabled"])}
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Предыдущая
                            </button>
                            <div className={styles["page-info"]}>
                                <span className={styles["page-current"]}>{currentPage}</span>
                                <span className={styles["page-separator"]}>/</span>
                                <span className={styles["page-total"]}>{users.totalPages}</span>
                            </div>
                            <button 
                                className={clsx(styles["page-btn"], currentPage === users.totalPages && styles["disabled"])}
                                onClick={handleNextPage}
                                disabled={currentPage === users.totalPages}
                            >
                                Следующая
                            </button>
                        </div>
                    )}

                    <div className={styles["stats"]}>
                        Всего пользователей: <span className={styles["stats-value"]}>{users.total}</span>
                        {(searchQuery || bannedFilter !== "all" || adminFilter !== "all") && (
                            <span className={styles["filter-badge"]}>
                                {bannedFilter !== "all" && (bannedFilter === "banned" ? " забаненные" : " активные")}
                                {adminFilter !== "all" && (adminFilter === "admin" ? " админы" : " не админы")}
                                {searchQuery && ` ID: ${searchQuery}`}
                            </span>
                        )}
                    </div>
                </>
            ) : (
                <div className={styles["empty-state"]}>
                    <p>Нет пользователей</p>
                    <span className={styles["empty-hint"]}>
                        {searchQuery || bannedFilter !== "all" || adminFilter !== "all" ? "По заданным фильтрам ничего не найдено" : "Пользователи появятся здесь"}
                    </span>
                </div>
            )}
        </div>
    );
}

export default UsersPage;