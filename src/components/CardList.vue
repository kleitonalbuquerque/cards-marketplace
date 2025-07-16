<script setup lang="ts">
import { onMounted } from "vue";
import { useCardStore } from "../stores/cardStore";

const cardStore = useCardStore();

onMounted(() => {
  cardStore.fetchAllCards();
});
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <div
      v-for="card in cardStore.allCards"
      :key="card.id"
      class="bg-white dark:bg-gray-800 shadow rounded p-4"
    >
      <img
        :src="card.imageUrl"
        :alt="card.name"
        class="w-full h-40 object-cover mb-2"
      />
      <h2 class="text-lg font-semibold">{{ card.name }}</h2>
      <p class="text-sm text-gray-400">{{ card.description }}</p>
    </div>
  </div>
</template>
