import api from './api'

export const getAllCards = (page = 1, rpp = 10) =>
  api.get('/cards', {
    params: {
      page,
      rpp,
    },
  })

export const getCardById = (id: string) => api.get(`/cards/${id}`)

export const getMyCards = () => api.get('/me/cards')

export const addCardsToUser = (cardIds: string[]) =>
  api.post('/me/cards', { cardIds })
