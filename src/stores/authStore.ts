import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    user: null as any
  }),

  actions: {
    async login(email: string, password: string) {
      const res = await api.post('/login', { email, password })
      this.token = res.data.token
    },

    async fetchUser() {
      const res = await api.get('/me', {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.user = res.data
    },

    async register(name: string, email: string, password: string) {
      await api.post('/register', { name, email, password })
    },

    logout() {
      this.token = ''
      this.user = null
    }
  },

  persist: {
    storage: localStorage,
    paths: ['token', 'user']
  }
})
