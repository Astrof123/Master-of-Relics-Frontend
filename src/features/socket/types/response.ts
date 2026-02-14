export interface SocketCallbackResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    error: {
        code: number;
        details?: any;
    }
}