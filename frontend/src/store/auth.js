import { defineStore } from 'pinia';
import api from '../api/http';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  actions: {
    async login(email, password) {
      const res = await api.post('/auth/login', { email, password });
      this.token = res.data.token;
      localStorage.setItem('token', this.token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  }
});
