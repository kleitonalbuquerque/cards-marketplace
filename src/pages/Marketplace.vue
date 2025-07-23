<template>
  <AppLayout>
    <div class="text-white mb-4">
      <h1 class="text-2xl font-bold">Cartas disponíveis para troca</h1>
      <div
        v-if="paginatedCards.length"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4"
      >
        <div
          v-for="card in paginatedCards"
          :key="card.id"
          class="bg-gray-800 rounded-lg p-4 shadow-md text-white"
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
          {{ (currentPage - 1) * itemsPerPage + 1 }}
          -
          {{ Math.min(currentPage * itemsPerPage, allCards.length) }}
          de {{ allCards.length }} cartas
        </span>
        <div class="flex gap-4 items-center">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-700 rounded text-white"
          >
            Anterior
          </button>
          <span class="text-black text-sm">Página {{ currentPage }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
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
import { onMounted, computed, ref } from "vue";
import { useCardStore } from "../stores/cardStore";
import AppLayout from "../components/layout/AppLayout.vue";

const cardStore = useCardStore();

const itemsPerPage = 10;
const currentPage = ref(1);

const allCards = computed(() =>
  Array.isArray(cardStore.allCards) ? cardStore.allCards : cardStore.allCards.list || []
);

const totalPages = computed(() =>
  Math.ceil(allCards.value.length / itemsPerPage)
);

const paginatedCards = computed(() =>
  allCards.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
);

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

onMounted(() => {
  cardStore.fetchAllCards();
});
</script>
