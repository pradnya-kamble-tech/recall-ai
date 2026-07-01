/**
 * RecallAI — API Client Configuration
 *
 * Centralized HTTP client for all frontend-to-backend communication.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const API_V1 = `${API_BASE_URL}/api/v1`;

interface RequestOptions extends Omit<RequestInit, "body"> {
    body?: unknown;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const { body, headers, ...rest } = options;

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...rest,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new ApiError(response.status, error.detail || "Request failed");
        }

        return response.json();
    }

    get<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    }

    post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: "POST", body });
    }

    put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: "PUT", body });
    }

    patch<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: "PATCH", body });
    }

    delete<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }
}

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}

export const api = new ApiClient(API_V1);
