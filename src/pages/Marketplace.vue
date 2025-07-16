<script setup lang="ts">
import { onMounted } from "vue";
import { useCardStore } from "../stores/cardStore";

const cardStore = useCardStore();

onMounted(() => {
  cardStore.fetchAllCards();
});
</script>

<template>
  <div class="p-6 text-white">
    <h1 class="text-2xl font-bold mb-4">Cartas disponíveis para troca</h1>

    <div
      v-if="cardStore.allCards?.list?.length"
      class="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div
        v-for="card in cardStore.allCards.list"
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
  </div>
</template>
