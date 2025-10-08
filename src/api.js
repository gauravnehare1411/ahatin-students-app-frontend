import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    const skipAuth = ['/token', '/register'];
    const isAuthEndpoint = skipAuth.some((url) => config.url.includes(url));

    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      // DEBUG: Check what's actually in localStorage
      console.log('access_token:', localStorage.getItem('access_token'));
      console.log('refresh_token:', localStorage.getItem('refresh_token'));
      console.log('roles:', localStorage.getItem('roles'));
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      // FIX: Better check for refresh token existence
      if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('roles');
        window.location.href = '/app/sign-in';
        return Promise.reject(error);
      }
      
      try {
        
        // Request new tokens using refresh token
        const response = await axios.post(
          'http://127.0.0.1:8000/token/refresh',
          { refresh_token: refreshToken }
        );
        
        const { access_token, refresh_token, roles } = response.data;
        
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        
        if (roles) {
          localStorage.setItem('roles', JSON.stringify(roles));
        }
        
        // Update the authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        // Process any queued requests
        processQueue(null, access_token);
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid, redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('roles');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;