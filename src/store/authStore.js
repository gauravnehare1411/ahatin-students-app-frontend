import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: !!localStorage.getItem('access_token'),
    userRoles: JSON.parse(localStorage.getItem("roles") || '[]'),

    login: () => {
        set({
            isLoggedIn: true,
            userRoles: JSON.parse(localStorage.getItem('roles') || '[]'),
        });
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({
            isLoggedIn: false,
            userRoles: [],
        })
    }
}));

export default useAuthStore;