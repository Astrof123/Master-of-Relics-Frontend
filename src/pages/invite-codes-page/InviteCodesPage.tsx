import styles from "./InviteCodesPage.module.css";
import { useEffect, useState } from "react";
import type { GetInviteCodesData } from "@/features/invite-code/types/requests";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { INVITE_CODE_STATUS, type InviteCodeStatus } from "@/features/invite-code/types/invite-code";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { changeStatus, createInviteCodes, deleteInviteCode, getInviteCodes } from "@/features/invite-code/store/actions";
import { deleteInviteCodeAfterRequest, setNewStatus } from "@/features/invite-code/store/inviteCodeSlice";
import { toast } from "sonner";

function InviteCodesPage() {
    const dispatch = useAppDispatch();
    const inviteCodes = useAppSelector(state => state.inviteCode.inviteCodes);
    const isLoading = useAppSelector(state => state.inviteCode.isLoading);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"all" | InviteCodeStatus>("all");
    const [createCount, setCreateCount] = useState(1);
    const [isCreating, setIsCreating] = useState(false);
    const limit = 10;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const data: GetInviteCodesData = {
            limit: limit,
            page: currentPage,
            inviteCodeId: debouncedSearch || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            status: statusFilter !== "all" ? statusFilter : undefined
        }

        dispatch(getInviteCodes(data)).catch(() => {
            toast.error('Не удалось загрузить инвайт-коды');
        });
    }, [currentPage, debouncedSearch, startDate, endDate, statusFilter]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (inviteCodes && currentPage < inviteCodes.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setStartDate("");
        setEndDate("");
        setStatusFilter("all");
        setCurrentPage(1);
    };

    const handleCreateInviteCodes = async () => {
        if (createCount <= 0 || createCount > 100) {
            toast.warning('Количество кодов должно быть от 1 до 100');
            return;
        }
        
        setIsCreating(true);
        try {
            await dispatch(createInviteCodes({ count: createCount })).unwrap();
            toast.success(`Создано ${createCount} инвайт-кодов`);
            setCreateCount(1);
            
            const data: GetInviteCodesData = {
                limit: limit,
                page: currentPage,
                inviteCodeId: debouncedSearch || undefined,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                status: statusFilter !== "all" ? statusFilter : undefined
            }
            await dispatch(getInviteCodes(data));
        } catch (error: any) {
            toast.error(error?.message || 'Не удалось создать инвайт-коды');
        } finally {
            setIsCreating(false);
        }
    };

    const handleChangeStatusClick = async (inviteCodeId: string, newStatus: InviteCodeStatus) => {
        try {
            await dispatch(changeStatus({ inviteCodeId, newStatus })).unwrap();
            toast.success(`Статус изменён на ${getStatusText(newStatus)}`);
            dispatch(setNewStatus({ inviteCodeId, newStatus }));
        } catch (error: any) {
            toast.error(error?.message || 'Не удалось изменить статус');
        }
    };

    const handleDeleteClick = async (inviteCodeId: string) => {
        if (window.confirm("Вы уверены, что хотите удалить этот инвайт-код?")) {
            try {
                await dispatch(deleteInviteCode({ inviteCodeId })).unwrap();
                toast.success('Инвайт-код удалён');
                dispatch(deleteInviteCodeAfterRequest(inviteCodeId));
            } catch (error: any) {
                toast.error(error?.message || 'Не удалось удалить инвайт-код');
            }
        }
    };

    const getStatusClass = (status: InviteCodeStatus) => {
        switch(status) {
            case INVITE_CODE_STATUS.FREE:
                return styles["status-free"];
            case INVITE_CODE_STATUS.BOOKED:
                return styles["status-booked"];
            case INVITE_CODE_STATUS.USED:
                return styles["status-used"];
            default:
                return styles["status-other"];
        }
    };

    const getStatusText = (status: InviteCodeStatus) => {
        switch(status) {
            case INVITE_CODE_STATUS.FREE:
                return "Свободен";
            case INVITE_CODE_STATUS.BOOKED:
                return "Забронирован";
            case INVITE_CODE_STATUS.USED:
                return "Использован";
            default:
                return status;
        }
    };

    const getNextStatus = (currentStatus: InviteCodeStatus): InviteCodeStatus | null => {
        switch(currentStatus) {
            case INVITE_CODE_STATUS.FREE:
                return INVITE_CODE_STATUS.BOOKED;
            case INVITE_CODE_STATUS.BOOKED:
                return INVITE_CODE_STATUS.FREE;
            case INVITE_CODE_STATUS.USED:
                return null;
            default:
                return null;
        }
    };

    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <div className={styles["header-content"]}>
                    <h1 className={styles["header-title"]}>Инвайт-коды</h1>
                </div>
                <div className={styles["header-right-content"]}>
                    <div className={styles["create-panel"]}>
                        <div className={styles["create-group"]}>
                            <input
                                type="number"
                                className={styles["create-input"]}
                                value={createCount}
                                onChange={(e) => setCreateCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                                min={1}
                                max={100}
                                disabled={isCreating}
                            />
                        </div>
                        <button 
                            className={styles["create-btn"]}
                            onClick={handleCreateInviteCodes}
                            disabled={isCreating}
                        >
                            {isCreating ? "Создание..." : "Создать инвайт-коды"}
                        </button>
                    </div>
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
                            Поиск по ID кода
                        </label>
                        <input 
                            type="search" 
                            className={styles["filter-input"]}
                            placeholder="Введите ID инвайт-кода..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles["filter-group"]}>
                        <label className={styles["filter-label"]}>
                            Статус
                        </label>
                        <select 
                            className={styles["status-select"]}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as "all" | InviteCodeStatus)}
                        >
                            <option value="all">Все</option>
                            <option value={INVITE_CODE_STATUS.FREE}>Свободные</option>
                            <option value={INVITE_CODE_STATUS.BOOKED}>Забронированные</option>
                            <option value={INVITE_CODE_STATUS.USED}>Использованные</option>
                        </select>
                    </div>

                    <div className={styles["filter-group"]}>
                        <label className={styles["filter-label"]}>
                            Дата от
                        </label>
                        <input 
                            type="date" 
                            className={styles["filter-input-date"]}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className={styles["filter-group"]}>
                        <label className={styles["filter-label"]}>
                            Дата до
                        </label>
                        <input 
                            type="date" 
                            className={styles["filter-input-date"]}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                        />
                    </div>

                    {(searchQuery || startDate || endDate || statusFilter !== "all") && (
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
                    <span>Загрузка инвайт-кодов...</span>
                </div>
            ) : inviteCodes && inviteCodes.data.length > 0 ? (
                <>
                    <div className={styles["table"]}>
                        <div className={styles["table-header"]}>
                            <div className={styles["col-id"]}>ID</div>
                            <div className={styles["col-user"]}>Закреплён за</div>
                            <div className={styles["col-status"]}>Статус</div>
                            <div className={styles["col-created"]}>Создан</div>
                            <div className={styles["col-actions"]}>Действия</div>
                        </div>
                        <div className={styles["table-body"]}>
                            {inviteCodes.data.map((code) => (
                                <div key={code.id} className={styles["code-row"]}>
                                    <div className={styles["col-id"]}>
                                        <span className={styles["code-id"]}>{code.id}</span>
                                    </div>
                                    <div className={styles["col-user"]}>
                                        {code.user ? (
                                            <Link to={`/profile/${code.user.id}`} className={styles["user-link"]}>
                                                <span className={styles["user-id"]}>ID: {code.user.id.slice(0, 10) + "..."}</span>
                                                <span className={styles["user-name"]}>{code.user.nickname}</span>
                                            </Link>
                                        ) : (
                                            <span className={styles["no-user"]}>—</span>
                                        )}
                                    </div>
                                    <div className={styles["col-status"]}>
                                        <span className={clsx(styles["status-badge"], getStatusClass(code.status))}>
                                            {getStatusText(code.status)}
                                        </span>
                                    </div>
                                    <div className={styles["col-created"]}>
                                        <span className={styles["date"]}>
                                            {new Date(code.createdAt).toLocaleDateString('ru-RU', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className={styles["col-actions"]}>
                                        {code.status !== INVITE_CODE_STATUS.USED && (
                                            <div className={styles["action-buttons"]}>
                                                <button 
                                                    className={styles["status-btn"]}
                                                    onClick={() => {
                                                        const nextStatus = getNextStatus(code.status);
                                                        if (nextStatus) {
                                                            handleChangeStatusClick(code.id, nextStatus);
                                                        }
                                                    }}
                                                    title={`Изменить статус на ${getStatusText(getNextStatus(code.status) as InviteCodeStatus)}`}
                                                >
                                                    {code.status === INVITE_CODE_STATUS.FREE && "Забронировать"}
                                                    {code.status === INVITE_CODE_STATUS.BOOKED && "Разбронировать"}
                                                </button>
                                                
                                                <button 
                                                    className={styles["delete-btn"]}
                                                    onClick={() => handleDeleteClick(code.id)}
                                                    title="Удалить код"
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {inviteCodes.totalPages > 1 && (
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
                                <span className={styles["page-total"]}>{inviteCodes.totalPages}</span>
                            </div>
                            <button 
                                className={clsx(styles["page-btn"], currentPage === inviteCodes.totalPages && styles["disabled"])}
                                onClick={handleNextPage}
                                disabled={currentPage === inviteCodes.totalPages}
                            >
                                Следующая
                            </button>
                        </div>
                    )}

                    <div className={styles["stats"]}>
                        Всего кодов: <span className={styles["stats-value"]}>{inviteCodes.total}</span>
                        {(startDate || endDate || statusFilter !== "all") && (
                            <span className={styles["filter-badge"]}>
                                {statusFilter !== "all" && ` ${getStatusText(statusFilter as InviteCodeStatus)}`}
                                {startDate && ` с ${startDate}`}
                                {endDate && ` по ${endDate}`}
                            </span>
                        )}
                    </div>
                </>
            ) : (
                <div className={styles["empty-state"]}>
                    <p>Нет инвайт-кодов</p>
                    <span className={styles["empty-hint"]}>
                        {searchQuery || startDate || endDate || statusFilter !== "all" ? "По заданным фильтрам ничего не найдено" : "Создайте инвайт-коды для приглашения игроков"}
                    </span>
                </div>
            )}
        </div>
    );
}

export default InviteCodesPage;