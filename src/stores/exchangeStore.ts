import { defineStore } from 'pinia'
import { createTrade, getAllTrades, deleteTrade } from '../services/tradeService'

export interface TradeCard {
  cardId: string
  type: 'OFFERING' | 'RECEIVING'
}

export interface Trade {
  id: string
  userId: string
  tradeCards: TradeCard[]
  createdAt: string
}

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    requests: [] as Trade[],
    userRequests: [] as Trade[],
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totalItems: 0,
  }),

  actions: {
    async fetchRequests(page = 1) {
      try {
        const limit = this.perPage
        const res = await getAllTrades()
        const all = res.data.list || []
        this.requests = all
        this.totalItems = all.length
        this.totalPages = Math.ceil(this.totalItems / limit)
        this.currentPage = page
      } catch (error) {
        console.error('Erro ao buscar solicitações de troca:', error)
      }
    },

    async fetchUserRequests(userId: string) {
      try {
        const res = await getAllTrades()
        const all = res.data.list || []
        this.userRequests = all.filter((trade: any) => trade.userId === userId)
      } catch (error) {
        this.userRequests = []
        console.error('Erro ao buscar solicitações do usuário:', error)
      }
    },

    async createRequest(cards: TradeCard[]) {
      try {
        await createTrade(cards)
        await this.fetchRequests()
      } catch (error) {
        console.error('Erro ao criar solicitação de troca:', error)
      }
    },

    async deleteRequest(id: string) {
      try {
        await deleteTrade(id)
        await this.fetchRequests(this.currentPage)
      } catch (error) {
        console.error('Erro ao deletar solicitação:', error)
      }
    },

    setPage(page: number) {
      this.fetchRequests(page)
    }
  }
})
