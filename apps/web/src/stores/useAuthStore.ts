import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
    refresh: (newAccessToken: string) => void;
    hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            login: (user, accessToken) =>
                set({ user, accessToken, isAuthenticated: true }),
            logout: async () => {
                const token = get().accessToken;
                if (token) {
                    try {
                        await fetch("http://127.0.0.1:8000/api/v1/auth/logout", {
                            method: "POST",
                            headers: { Authorization: `Bearer ${token}` }
                        });
                    } catch (e) {
                        // Suppress network errors on logout
                    }
                }

                // Clear the access token cookie
                document.cookie = "auth-token=; path=/; max-age=0; SameSite=Lax";

                set({ user: null, accessToken: null, isAuthenticated: false });

                // Redirect to login
                window.location.href = "/login";
            },
            refresh: (newAccessToken) =>
                set({ accessToken: newAccessToken }),
            hydrate: () => {
                // Next.js client component hydration hook point if needed
            },
        }),
        {
            name: "recallai-auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
