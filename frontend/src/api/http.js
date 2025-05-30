import axios from 'axios';
import { useAuthStore } from '../store/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // change this to your backend URL
});

api.interceptors.request.use(config => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  else {
    delete config.headers.Authorization; // 💡 avoid sending invalid header
  }
  return config;
});

export default api;
