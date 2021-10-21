import create from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem("token"),
  setLogin: (isLoggedIn) => set(() => ({ isLoggedIn })),
  userDetails: {},
  setUserDetails: (userDetails) => set(() => ({ userDetails })),
}));
