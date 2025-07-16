<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-950 text-white">
    <form
      @submit.prevent="submitExchange"
      class="bg-gray-900 w-full max-w-lg p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 class="text-2xl font-bold text-center">Nova Solicitação de Troca</h2>

      <!-- Cartas que o usuário vai oferecer -->
      <div>
        <label class="block mb-1 text-sm font-medium">Escolha cartas para oferecer:</label>
        <select
          v-model="selectedOfferedCards"
          multiple
          class="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option
            v-for="card in myCards"
            :key="card.id"
            :value="card.id"
          >
            {{ card.name }}
          </option>
        </select>
      </div>

      <!-- Cartas que o usuário quer receber -->
      <div>
        <label class="block mb-1 text-sm font-medium">Escolha cartas desejadas:</label>
        <select
          v-model="selectedRequestedCards"
          multiple
          class="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option
            v-for="card in allCards"
            :key="card.id"
            :value="card.id"
          >
            {{ card.name }}
          </option>
        </select>
      </div>

      <!-- Botão -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
      >
        Criar Solicitação
      </button>

      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCardStore } from '../stores/cardStore'
import { useExchangeStore } from '../stores/exchangeStore'
import { useRouter } from 'vue-router'

const cardStore = useCardStore()
const exchangeStore = useExchangeStore()
const router = useRouter()

const selectedOfferedCards = ref<string[]>([])
const selectedRequestedCards = ref<string[]>([])
const error = ref('')

const myCards = ref<any[]>([])
const allCards = ref<any[]>([])

onMounted(async () => {
  await cardStore.fetchUserCards()
  await cardStore.fetchAllCards()
  myCards.value = cardStore.myCards
  allCards.value = cardStore.allCards
})

const submitExchange = async () => {
  if (!selectedOfferedCards.value.length || !selectedRequestedCards.value.length) {
    error.value = 'Selecione pelo menos uma carta em cada campo.'
    return
  }

  try {
    await exchangeStore.createExchange({
      offeredCards: selectedOfferedCards.value,
      requestedCards: selectedRequestedCards.value,
    })
    router.push('/marketplace')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao criar troca.'
  }
}
</script>
