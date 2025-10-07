import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: !!localStorage.getItem('access_token'),
    userRoles: JSON.parse(localStorage.getItem("roles") || '[]'),
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,

    login: () => {
        set({
            isLoggedIn: true,
            userRoles: JSON.parse(localStorage.getItem('roles') || '[]'),
        });
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('roles');
        localStorage.removeItem('token_type');
        localStorage.removeItem('expires_in');
        
        set({
            isLoggedIn: false,
            userRoles: [],
        })
    }
}));

export default useAuthStore;