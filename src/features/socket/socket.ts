import { io, Socket } from 'socket.io-client';

import type {
    ClientToServerEvents,
    ServerToClientEvents,
} from './types/events';

import {
    SOCKETSTATUS
} from './types/index';

import type {
    SocketStatus,
    SocketUser,
} from './types/index';


interface SocketConfig {
    url: string;
    autoConnect?: boolean;
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    auth?: {
        token?: string;
        userId?: string;
    };
}

class SocketService {
    private static instance: SocketService;
    private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
    
    private status: SocketStatus = SOCKETSTATUS.DISCONNECTED;
    private currentUser: SocketUser | null = null;
    private currentRooms = new Set<string>();
    
    private statusCallbacks: ((status: SocketStatus) => void)[] = [];
    private errorCallbacks: ((error: Error) => void)[] = [];
    
    private constructor() {}
    
    static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }
    
    connect(config: SocketConfig): void {
        if (this.status === SOCKETSTATUS.CONNECTED || this.status === SOCKETSTATUS.CONNECTING) {
            console.warn('Socket is already connecting or connected');
            return;
        }
        
        this.updateStatus(SOCKETSTATUS.CONNECTING);
        
        try {
            this.socket = io(config.url, {
                autoConnect: config.autoConnect ?? true,
                reconnection: config.reconnection ?? true,
                reconnectionAttempts: config.reconnectionAttempts ?? 5,
                reconnectionDelay: config.reconnectionDelay ?? 1000,
                auth: config.auth,
                transports: ['websocket', 'polling'],
                timeout: 10000,
            });
            
            this.setupEventListeners();
            
        } 
        catch (error) {
            console.error('Failed to create socket connection:', error);
            this.updateStatus(SOCKETSTATUS.ERROR);
            this.notifyError(error as Error);
        }
    }
    
    /**
     * Настройка обработчиков событий Socket.io
     */
    private setupEventListeners(): void {
        if (!this.socket) return;
        
        // Системные события
        this.socket.on('connect', this.handleConnect.bind(this));
        this.socket.on('disconnect', this.handleDisconnect.bind(this));
        this.socket.on('connect_error', this.handleConnectError.bind(this));
        this.socket.on('error', this.handleError.bind(this));
        
        // Серверные события (будем добавлять позже через on() метод)
    }
    
    /**
     * Обработка успешного подключения
     */
    private handleConnect(): void {
        console.log('Socket connected with ID:', this.socket?.id);
        this.updateStatus(SOCKETSTATUS.CONNECTED);
        
        
        // Устанавливаем текущего пользователя
        this.currentUser = {
        socketId: this.socket?.id || '',
        userId: '', // Будет установлен после аутентификации
        username: ''
        };
    }
    
    /**
     * Обработка отключения
     */
    private handleDisconnect(reason: string): void {
        console.log('Socket disconnected:', reason);
        this.updateStatus(SOCKETSTATUS.DISCONNECTED);
        this.currentRooms.clear();
        
        // Автоматическое переподключение обрабатывается Socket.io
        if (reason === 'io server disconnect') {
        // Сервер принудительно отключил
        this.socket?.connect();
        }
    }
    
    /**
     * Обработка ошибки подключения
     */
    private handleConnectError(error: Error): void {
        console.error('Socket connection error:', error);
        this.updateStatus(SOCKETSTATUS.ERROR);
        this.notifyError(error);
    }
    
    /**
     * Обработка общей ошибки
     */
    private handleError(error: any): void {
        console.error('Socket error:', error);
        this.notifyError(new Error(error.message || 'Unknown socket error'));
    }
    

    
    emit<E extends keyof ClientToServerEvents>(
        event: E,
        ...args: Parameters<ClientToServerEvents[E]>
    ): void {
        if (!this.socket?.connected) {
            console.warn(`Cannot emit ${event}: socket not connected`);
            return;
        }
        
        try {
            this.socket.emit(event, ...args);
        } catch (error) {
            console.error(`Failed to emit ${event}:`, error);
            this.notifyError(error as Error);
        }
    }
    
    on<E extends keyof ServerToClientEvents>(
        event: E,
        callback: ServerToClientEvents[E]
    ): void {
        if (!this.socket) {
            console.warn(`Cannot listen to ${event}: socket not initialized`);
            return;
        }
        
        this.socket.on(event, callback as any);
    }
    
    /**
     * Отписка от события
     */
    off<E extends keyof ServerToClientEvents>(
        event: E,
        callback?: ServerToClientEvents[E]
    ): void {
        if (!this.socket) return;
        
        if (callback) {
        this.socket.off(event, callback as any);
        } else {
        this.socket.off(event);
        }
    }
    
    /**
     * Отключение от сервера
     */
    disconnect(): void {
        if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
        this.updateStatus(SOCKETSTATUS.DISCONNECTED);
        this.currentUser = null;
        }
    }
    
    /**
     * Обновление статуса и уведомление подписчиков
     */
    private updateStatus(status: SocketStatus): void {
        this.status = status;
        this.statusCallbacks.forEach(callback => callback(status));
    }
    
    /**
     * Уведомление об ошибке
     */
    private notifyError(error: Error): void {
        this.errorCallbacks.forEach(callback => callback(error));
    }
    
    /**
     * Подписка на изменение статуса
     */
    onStatusChange(callback: (status: SocketStatus) => void): () => void {
        this.statusCallbacks.push(callback);
        
        // Возвращаем функцию для отписки
        return () => {
        const index = this.statusCallbacks.indexOf(callback);
        if (index > -1) {
            this.statusCallbacks.splice(index, 1);
        }
        };
    }
    
    /**
     * Подписка на ошибки
     */
    onError(callback: (error: Error) => void): () => void {
        this.errorCallbacks.push(callback);
        
        return () => {
        const index = this.errorCallbacks.indexOf(callback);
        if (index > -1) {
            this.errorCallbacks.splice(index, 1);
        }
        };
    }
    
    // =============== Геттеры ===============
    
    getStatus(): SocketStatus {
        return this.status;
    }
    
    isConnected(): boolean {
        return this.status === SOCKETSTATUS.CONNECTED;
    }
    
    getSocketId(): string | null {
        return this.socket?.id || null;
    }
    
    getCurrentUser(): SocketUser | null {
        return this.currentUser;
    }
    
    getCurrentRooms(): string[] {
        return Array.from(this.currentRooms);
    }
    
    getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> | null {
        return this.socket;
    }
}

// Экспортируем Singleton экземпляр
export default SocketService.getInstance();