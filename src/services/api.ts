import axios from 'axios'

const api = axios.create({
  baseURL: 'https://cards-marketplace-api-2fjj.onrender.com'
})

export default api
