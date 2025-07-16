import api from './api'

export const createTrade = (cards: { cardId: string; type: 'OFFERING' | 'RECEIVING' }[]) =>
  api.post('/trades', { cards })

export const getAllTrades = () => api.get('/trades')

export const deleteTrade = (id: string) => api.delete(`/trades/${id}`)
