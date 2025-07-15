import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as any
  }),

  actions: {
    async login(email: string, password: string) {
      const res = await axios.post('/users/login', { email, password })
      this.token = res.data.token
      localStorage.setItem('token', this.token)
    },

    async register(name: string, email: string, password: string) {
      await axios.post('/users/register', { name, email, password })
    },

    async fetchUser() {
      const res = await axios.get('/users/me', {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.user = res.data
    },

    logout() {
      this.token = ''
      localStorage.removeItem('token')
      this.user = null
    }
  }
})
