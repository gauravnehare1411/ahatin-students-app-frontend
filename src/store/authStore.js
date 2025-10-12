import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: !!localStorage.getItem('access_token'),
    userRoles: JSON.parse(localStorage.getItem("roles") || '[]'),
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    tokenType: localStorage.getItem("token_type") || null,
    expiresIn: localStorage.getItem("expires_in") || null,

    login: (data) => {
        const {
            access_token,
            refresh_token,
            token_type,
            expires_in,
            roles,
        } = data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("token_type", token_type);
        localStorage.setItem("expires_in", expires_in);
        localStorage.setItem("roles", JSON.stringify(roles));
        
        set({
            isLoggedIn: true,
            userRoles: roles || [],
            accessToken: access_token,
            refreshToken: refresh_token,
            tokenType: token_type,
            expiresIn: expires_in,
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