import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: true,
  setIsAuthenticated: () => set((state: boolean) => ({ isAuthenticated: state })),
}));

export default useAuthStore
