import { defineStore } from 'pinia'
import axios from 'axios'

export interface TradeCard {
  cardId: string
  type: 'OFFERING' | 'RECEIVING'
}

export interface Trade {
  id: string
  userId: string
  cards: TradeCard[]
  createdAt: string
}

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    requests: [] as Trade[],
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totalItems: 0,
  }),

  actions: {
    async fetchRequests(page = 1) {
      try {
        const limit = this.perPage
        const res = await axios.get('/trades', {
          params: { page, limit }
        })

        // Adapte conforme o retorno real da sua API
        this.requests = res.data.items || res.data.trades || []
        this.totalItems = res.data.total || this.requests.length
        this.totalPages = Math.ceil(this.totalItems / limit)
        this.currentPage = page
      } catch (error) {
        console.error('Erro ao buscar solicitações de troca:', error)
      }
    },

    async createRequest(cards: TradeCard[], token: string) {
      try {
        await axios.post('/trades', { cards }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        await this.fetchRequests() // Atualiza lista após criar
      } catch (error) {
        console.error('Erro ao criar solicitação de troca:', error)
      }
    },

    async deleteRequest(id: string, token: string) {
      try {
        await axios.delete(`/trades/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        await this.fetchRequests(this.currentPage) // Atualiza a página atual
      } catch (error) {
        console.error('Erro ao deletar solicitação:', error)
      }
    },

    setPage(page: number) {
      this.fetchRequests(page)
    }
  }
})
