import api from './api'

export const registerUser = (data: any) => api.post('/register', data)
export const loginUser = (data: any) => api.post('/login', data)
export const getMe = () => api.get('/me')
