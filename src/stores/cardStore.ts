import { defineStore } from 'pinia'
import axios from 'axios'

export const useCardStore = defineStore('cards', {
  state: () => ({
    myCards: [] as any[]
  }),

  actions: {
    async fetchMyCards(token: string) {
      const res = await axios.get('/cards/my-cards', {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.myCards = res.data
    },

    async addCard(cardData: { name: string; image: string }, token: string) {
      await axios.post('/cards', cardData, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
  }
})
