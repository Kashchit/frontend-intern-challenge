import axios from 'axios';

// Two base URLs are needed since auth and tasks come from different mock APIs
export const authApi = axios.create({
    baseURL: 'https://reqres.in/api',
});

export const taskApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

// Attach token automatically if present (future-proofing, ReqRes doesn't actually need it)
taskApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});