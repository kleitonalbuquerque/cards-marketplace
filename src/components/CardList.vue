<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    <CardItem v-for="card in cards" :key="card.id" :card="card" />
  </div>
</template>

<script setup lang="ts">
import CardItem from "./CardItem.vue";

defineProps<{ cards: any[] }>();
</script>
