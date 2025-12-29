//file xu ly goi api co ban dung chung, dung env cho base url, xu ly error voi toast
import { toast } from 'react-toastify';
interface ApiResponse<T> {
    code: number;
    message: string;
    data?: T;
}

class ApiClient {
    private baseUrl: string;
    constructor(endpoint: string) {
        this.baseUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'}${endpoint}`;
    }

    //ham lay ra session id
    private getOrCreateSessionId(): string {
        let sessionId = sessionStorage.getItem('sessionId'); //dung sessionStorage thay vi local de session-based
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    //dung url voi params
    private buildApiUrl(endpoint: string, additionalParams: Record<string, any> = {}): string {
        const params = new URLSearchParams(additionalParams);
        return `${this.baseUrl}${endpoint}?${params.toString()}`;
    }

    //wrapper cho fetch, xu ly header va error
    private async apiCall<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                'X-Session-Id': this.getOrCreateSessionId(),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            const data: ApiResponse<T> = await response.json();

            if (!response.ok || data.code >= 400) {
                throw new Error(data.message || 'API call failed');
            }
            return data;
        } catch (error: any) {
            //global error handler: show toast
            toast.error(error.message || 'An unexpected error occurred.');
            throw error;
        }
    }

    //cac phuong thuc public de sd o service con
    public async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
        return this.apiCall(this.buildApiUrl(endpoint, params), { method: 'GET' });
    }

    public async post<T>(endpoint: string, body: any, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
        return this.apiCall(this.buildApiUrl(endpoint, params), {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    public async put<T>(endpoint: string, body: any, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
        return this.apiCall(this.buildApiUrl(endpoint, params), {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    public async delete<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
        return this.apiCall(this.buildApiUrl(endpoint, params), { method: 'DELETE' });
    }
}

export default ApiClient;