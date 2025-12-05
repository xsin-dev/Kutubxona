import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist((set) => ({
    // Theme
    isDark: false,
    toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

    // Search
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Login
    access:null,
    user: null,
    isAuth: false,
    login: (user, access) => {
      set({
        user,
        access,
        isAuth: true,
      });
    },
    logout: () => {
      set({
        user: null,
        access:null,
        isAuth: false,
      });
      localStorage.clear();
    },
  }))
);
