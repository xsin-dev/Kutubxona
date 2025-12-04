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
  }))
);
