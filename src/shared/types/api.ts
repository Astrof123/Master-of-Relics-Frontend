import type { AxiosRequestConfig } from "axios";

export interface RequestOptions extends AxiosRequestConfig {
    withAuth?: boolean;
    retryOnUnauthorized?: boolean;
}