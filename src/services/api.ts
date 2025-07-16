// api.ts
import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const api = axios.create({
  baseURL: 'https://cards-marketplace-api-2fjj.onrender.com',
})

// Adiciona o token automaticamente
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
