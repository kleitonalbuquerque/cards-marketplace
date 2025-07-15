import { defineStore } from 'pinia'
import axios from 'axios'

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    requests: [] as any[]
  }),

  actions: {
    async fetchRequests() {
      const res = await axios.get('/exchange-requests')
      this.requests = res.data
    },

    async createRequest(data: any, token: string) {
      await axios.post('/exchange-requests', data, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },

    async deleteRequest(id: string, token: string) {
      await axios.delete(`/exchange-requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
  }
})
