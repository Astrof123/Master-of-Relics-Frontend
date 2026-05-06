import { useProfile } from "@/features/profile/hooks/useProfile";
import styles from "./ReportsPage.module.css";
import { useEffect, useState } from "react";
import type { GetReportsData } from "@/features/profile/types/requests";
import { useAppSelector } from "@/app/store";
import { REPORT_TYPE_NAMING } from "@/features/profile/constants/report";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { REPORT_TYPE } from "@/features/profile/types/report";

function ReportsPage() {
    const { handleGetReports } = useProfile();
    const reports = useAppSelector(state => state.report.reports);
    const isLoading = useAppSelector(state => state.report.isLoading);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [processedFilter, setProcessedFilter] = useState<"all" | "processed" | "unprocessed">("all");
    const limit = 10;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        let isProcessedValue: boolean | undefined = undefined;
        if (processedFilter === "processed") {
            isProcessedValue = true;
        } else if (processedFilter === "unprocessed") {
            isProcessedValue = false;
        }

        const data: GetReportsData = {
            limit: limit,
            page: currentPage,
            reportedUserId: debouncedSearch || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            isProcessed: isProcessedValue
        }

        handleGetReports(data);
    }, [handleGetReports, currentPage, debouncedSearch, startDate, endDate, processedFilter]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (reports && currentPage < reports.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setStartDate("");
        setEndDate("");
        setProcessedFilter("all");
        setCurrentPage(1);
    };

    const handleRowClick = (reportId: number) => {
        setExpandedRow(expandedRow === reportId ? null : reportId);
    };

    const getReportTypeClass = (reportType: string) => {
        switch(reportType) {
            case REPORT_TYPE.OBSTRUCTION_OF_PLAY:
                return styles["type-obstruction"];
            case REPORT_TYPE.OFFENSIVE_NICKNAME:
                return styles["type-offensive-nickname"];
            default:
                return styles["type-other"];
        }
    };

    return (
        <div className={styles["reports-container"]}>
            <div className={styles["reports-header"]}>
                <div className={styles["header-content"]}>
                    <h1 className={styles["header-title"]}>Жалобы игроков</h1>
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

            {showFilters && (
                <div className={styles["filters-panel"]}>
                    <div className={styles["filter-group"]}>
                        <label className={styles["filter-label"]}>
                            Поиск по ID нарушителя
                        </label>
                        <input 
                            type="search" 
                            className={styles["filter-input"]}
                            placeholder="Введите ID нарушителя..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles["filter-group"]}>
                        <label className={styles["filter-label"]}>
                            Статус обработки
                        </label>
                        <div className={styles["filter-buttons"]}>
                            <button 
                                className={clsx(styles["status-filter-btn"], processedFilter === "all" && styles["status-filter-btn--active"])}
                                onClick={() => setProcessedFilter("all")}
                            >
                                Все
                            </button>
                            <button 
                                className={clsx(styles["status-filter-btn"], processedFilter === "unprocessed" && styles["status-filter-btn--active"])}
                                onClick={() => setProcessedFilter("unprocessed")}
                            >
                                Необработанные
                            </button>
                            <button 
                                className={clsx(styles["status-filter-btn"], processedFilter === "processed" && styles["status-filter-btn--active"])}
                                onClick={() => setProcessedFilter("processed")}
                            >
                                Обработанные
                            </button>
                        </div>
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
                    <div className={styles["filter-button-wrapper"]}>
                        <div className={styles["filter-button-extra-div"]}>

                        </div>
                        <button 
                            className={styles["reset-filters"]}
                            onClick={handleResetFilters}
                        >
                            Сбросить
                        </button>
                    </div>

                </div>
            )}

            {isLoading ? (
                <div className={styles["loading"]}>
                    <div className={styles["loading-spinner"]}></div>
                    <span>Загрузка жалоб...</span>
                </div>
            ) : reports && reports.data.length > 0 ? (
                <>
                    <div className={styles["reports-table"]}>
                        <div className={styles["table-header"]}>
                            <div className={styles["col-type"]}>Тип</div>
                            <div className={styles["col-text"]}>Описание</div>
                            <div className={styles["col-reported"]}>Нарушитель</div>
                            <div className={styles["col-requester"]}>Пожаловался</div>
                            <div className={styles["col-date"]}>Дата</div>
                            <div className={styles["col-status"]}>Статус</div>
                            <div className={styles["col-icon"]}></div>
                        </div>
                        <div className={styles["table-body"]}>
                            {reports.data.map((report) => (
                                <div key={report.id} className={styles["report-wrapper"]}>
                                    <div 
                                        className={clsx(styles["report-row"], expandedRow === report.id && styles["report-row--expanded"])}
                                        onClick={() => handleRowClick(report.id)}
                                    >
                                        <div className={styles["col-type"]}>
                                            <span className={clsx(styles["type-badge"], getReportTypeClass(report.reportType))}>
                                                {REPORT_TYPE_NAMING[report.reportType] || report.reportType}
                                            </span>
                                        </div>
                                        <div className={styles["col-text"]}>
                                            <span className={styles["report-text"]} title={report.text}>
                                                {report.text.length > 50 ? report.text.slice(0, 50) + "..." : report.text}
                                            </span>
                                        </div>
                                        <div className={styles["col-reported"]}>
                                            <Link to={`/profile/${report.reportedUserId}`} className={styles["user-link"]} onClick={(e) => e.stopPropagation()}>
                                                <span className={styles["user-id"]}>ID: {report.reportedUser.id.slice(0, 10) + "..."}</span>
                                                <span className={styles["user-name"]}>{report.reportedUser.nickname}</span>
                                            </Link>
                                        </div>
                                        <div className={styles["col-requester"]}>
                                            <Link to={`/profile/${report.requesterUserId}`} className={styles["user-link"]} onClick={(e) => e.stopPropagation()}>
                                                <span className={styles["user-id"]}>ID: {report.requesterUser.id.slice(0, 10) + "..."}</span>
                                                <span className={styles["user-name"]}>{report.requesterUser.nickname}</span>
                                            </Link>
                                        </div>
                                        <div className={styles["col-date"]}>
                                            <span className={styles["date"]}>
                                                {new Date(report.createdAt).toLocaleDateString('ru-RU', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <div className={styles["col-status"]}>
                                            <span className={clsx(styles["status-badge"], report.isProcessed ? styles["status-processed"] : styles["status-unprocessed"])}>
                                                {report.isProcessed ? "Обработана" : "Не обработана"}
                                            </span>
                                        </div>
                                        <div className={styles["expand-icon"]}>
                                            {expandedRow === report.id ? "▲" : "▼"}
                                        </div>
                                    </div>
                                    {expandedRow === report.id && (
                                        <div className={styles["expanded-content"]}>
                                            <div className={styles["full-text-label"]}>Полный текст жалобы:</div>
                                            <div className={styles["full-text"]}>{report.text}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {reports.totalPages > 1 && (
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
                                <span className={styles["page-total"]}>{reports.totalPages}</span>
                            </div>
                            <button 
                                className={clsx(styles["page-btn"], currentPage === reports.totalPages && styles["disabled"])}
                                onClick={handleNextPage}
                                disabled={currentPage === reports.totalPages}
                            >
                                Следующая
                            </button>
                        </div>
                    )}

                    <div className={styles["stats"]}>
                        Всего жалоб: <span className={styles["stats-value"]}>{reports.total}</span>
                        {(startDate || endDate || processedFilter !== "all") && (
                            <span className={styles["filter-badge"]}>
                                {processedFilter !== "all" && (processedFilter === "processed" ? " обработанные" : " необработанные")}
                                {startDate && ` с ${startDate}`}
                                {endDate && ` по ${endDate}`}
                            </span>
                        )}
                    </div>
                </>
            ) : (
                <div className={styles["empty-state"]}>
                    <p>Нет жалоб</p>
                    <span className={styles["empty-hint"]}>
                        {searchQuery || startDate || endDate || processedFilter !== "all" ? "По заданным фильтрам ничего не найдено" : "Жалобы от игроков появятся здесь"}
                    </span>
                </div>
            )}
        </div>
    );
}

export default ReportsPage;