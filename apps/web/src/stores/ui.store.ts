import { create } from "zustand";

interface UIState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (isOpen: boolean) => set({ sidebarOpen: isOpen }),
}));
