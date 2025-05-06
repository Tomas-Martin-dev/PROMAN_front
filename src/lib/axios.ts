import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_baseURL
});

api.interceptors.request.use( config =>{
    const token = localStorage.getItem("AuthUser"); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api