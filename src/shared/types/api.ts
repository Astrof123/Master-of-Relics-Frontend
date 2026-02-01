import type { AxiosRequestConfig } from 'node_modules/axios/index.d.cts';


export interface RequestOptions extends AxiosRequestConfig {
    withAuth?: boolean;
    retry?: boolean;
}