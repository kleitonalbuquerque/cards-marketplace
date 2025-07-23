<template>
  <AppLayout>
    <div class="text-white mb-4">
      <h1 class="text-2xl font-bold">Cartas disponíveis para troca</h1>

      <div
        v-if="cards.length"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4"
      >
        <div
          v-for="card in cards"
          :key="card.id"
          class="bg-white text-black p-4 rounded-lg shadow"
        >
          <img
            :src="card.imageUrl"
            :alt="card.name"
            class="w-full h-40 object-cover rounded mb-2"
          />
          <h2 class="text-lg font-bold">{{ card.name }}</h2>
          <p class="text-sm">{{ card.description }}</p>
        </div>
      </div>

      <p v-else class="text-center mt-8 text-gray-400">
        Nenhuma carta disponível para exibir.
      </p>

      <div class="flex justify-center gap-4 mt-4 flex-col items-center">
        <span class="text-black text-sm">
          Exibindo
          {{ (cardStore.page - 1) * cardStore.rpp + 1 }}
          -
          {{ (cardStore.page - 1) * cardStore.rpp + cards.length }}
          cartas
        </span>
        
        <div class="flex gap-4 items-center">
          <button
            @click="prevPage"
            :disabled="cardStore.page === 1"
            class="px-4 py-2 bg-gray-700 rounded text-white"
          >
            Anterior
          </button>
          <span class="text-black text-sm">Página {{ cardStore.page }}</span>
          <button
            @click="nextPage"
            :disabled="cards.length < cardStore.rpp"
            class="px-4 py-2 bg-gray-700 rounded text-white"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useCardStore } from "../stores/cardStore";
import AppLayout from "../components/layout/AppLayout.vue";

const cardStore = useCardStore();

// Garante que cards seja sempre array
const cards = computed(() =>
  Array.isArray(cardStore.allCards) ? cardStore.allCards : cardStore.allCards.list || []
);

function nextPage() {
  cardStore.page++;
  cardStore.fetchAllCards();
}

function prevPage() {
  if (cardStore.page > 1) {
    cardStore.page--;
    cardStore.fetchAllCards();
  }
}

onMounted(() => {
  cardStore.fetchAllCards();
});
</script>
