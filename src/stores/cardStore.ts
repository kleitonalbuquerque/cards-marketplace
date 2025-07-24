import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAllCards,
  getMyCards,
  addCardsToUser,
  getCardById,
} from '../services/cardService'

export const useCardStore = defineStore('cardStore', () => {
  const myCards = ref<any[]>([])
  const allCards = ref<any[]>([])
  const selectedCard = ref(null)

  const fetchUserCards = async () => {
    const res = await getMyCards()
    myCards.value = res.data
  }

  const fetchAllCards = async () => {
    const res = await getAllCards(1, 9999)
    allCards.value = res.data.list || []
  }

  const fetchCardById = async (id: string) => {
    const res = await getCardById(id)
    selectedCard.value = res.data
  }

  const addCards = async (cardIds: string[]) => {
    await addCardsToUser(cardIds)
    await fetchUserCards()
  }

  return {
    myCards,
    allCards,
    selectedCard,
    fetchUserCards,
    fetchAllCards,
    fetchCardById,
    addCards,
  }
})
