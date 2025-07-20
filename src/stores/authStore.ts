import { defineStore } from 'pinia'
import { loginUser, registerUser, getMe } from '../services/userService'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || '')

  const login = async (email: string, password: string) => {
    const res = await loginUser({ email, password })
    token.value = res.data.token
    localStorage.setItem('token', token.value)
    await fetchUser()
  }

  const register = async (name: string, email: string, password: string) => {
    await registerUser({ name, email, password })
  }

  const fetchUser = async () => {
    const res = await getMe()
    user.value = res.data
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
  }

  // 🔁 Se houver um token salvo, busca o usuário ao carregar a store
  if (token.value) {
    fetchUser().catch(() => {
      // Se o token for inválido, limpa tudo
      logout()
    })
  }

  return { user, token, login, register, fetchUser, logout }
})
