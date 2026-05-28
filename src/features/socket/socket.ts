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
    private tokenRefreshCallback: (() => Promise<string>) | null = null;
    
    private constructor() {}
    
    static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }
    
    connect(config: SocketConfig): void {
        if (this.status === SOCKETSTATUS.CONNECTED || this.status === SOCKETSTATUS.CONNECTING) {
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
            this.updateStatus(SOCKETSTATUS.ERROR);
            this.notifyError(error as Error);
        }
    }
    
    setTokenRefreshCallback(callback: () => Promise<string>): void {
        this.tokenRefreshCallback = callback;
    }

    private setupEventListeners(): void {
        if (!this.socket) return;
        
        this.socket.on('connect', this.handleConnect.bind(this));
        this.socket.on('disconnect', this.handleDisconnect.bind(this));
        this.socket.on('connect_error', this.handleConnectError.bind(this));
        this.socket.on('error', this.handleError.bind(this));
    }
    
    private handleConnect(): void {
        this.updateStatus(SOCKETSTATUS.CONNECTED);
        
        this.currentUser = {
        socketId: this.socket?.id || '',
        userId: '',
        username: ''
        };
    }
    
    private handleDisconnect(reason: string): void {
        this.updateStatus(SOCKETSTATUS.DISCONNECTED);
        this.currentRooms.clear();
        
        if (reason === 'io server disconnect') {
        this.socket?.connect();
        }
    }
    
    private handleConnectError(error: Error): void {

        if (error.message.includes('Невалидный токен')) {
            this.handleTokenRefresh();
        } else {
            this.updateStatus(SOCKETSTATUS.ERROR);
            this.notifyError(error);
        }
    }
    
    private async handleTokenRefresh(): Promise<void> {
        if (!this.tokenRefreshCallback) {
            this.updateStatus(SOCKETSTATUS.ERROR);
            this.notifyError(new Error('Unable to refresh token: no callback provided'));
            return;
        }
        
        try {
            const newToken = await this.tokenRefreshCallback();
            
            if (this.socket) {
                this.socket.auth = { 
                    ...this.socket.auth, 
                    token: newToken 
                };
                
                this.socket.connect();
            }
        } catch (refreshError) {
            this.updateStatus(SOCKETSTATUS.ERROR);
            this.notifyError(new Error('Token refresh failed'));
        }
    }

    private handleError(error: any): void {
        this.notifyError(new Error(error.message || 'Unknown socket error'));
    }    
    
    emit<E extends keyof ClientToServerEvents>(
        event: E & (string | symbol),
        ...args: Parameters<ClientToServerEvents[E]>
    ): void {
        if (!this.socket?.connected) {
            return;
        }
        
        try {
            this.socket.emit(event, ...args);
        } catch (error) {
            this.notifyError(error as Error);
        }
    }
    
    on<E extends keyof ServerToClientEvents>(
        event: E & (string | symbol),
        callback: ServerToClientEvents[E]
    ): void {
        if (!this.socket) {
            return;
        }
        this.socket.on(event as string, callback as any);
    }
    

    off<E extends keyof ServerToClientEvents>(
        event: E & (string | symbol),
        callback?: ServerToClientEvents[E]
    ): void {
        if (!this.socket) return;
        
        if (callback) {
            this.socket.off(event, callback as any);
        } 
        else {
            this.socket.off(event);
        }
    }
    
    disconnect(): void {
        if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
        this.updateStatus(SOCKETSTATUS.DISCONNECTED);
        this.currentUser = null;
        }
    }
    
    private updateStatus(status: SocketStatus): void {
        this.status = status;
        this.statusCallbacks.forEach(callback => callback(status));
    }
    
    private notifyError(error: Error): void {
        this.errorCallbacks.forEach(callback => callback(error));
    }
    
    onStatusChange(callback: (status: SocketStatus) => void): () => void {
        this.statusCallbacks.push(callback);

        return () => {
            const index = this.statusCallbacks.indexOf(callback);
            if (index > -1) {
                this.statusCallbacks.splice(index, 1);
            }
        };
    }
    
    onError(callback: (error: Error) => void): () => void {
        this.errorCallbacks.push(callback);
        
        return () => {
        const index = this.errorCallbacks.indexOf(callback);
        if (index > -1) {
            this.errorCallbacks.splice(index, 1);
        }
        };
    }

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

export default SocketService.getInstance();