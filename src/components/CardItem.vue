<template>
  <div class="border rounded p-4 shadow hover:scale-105 transition">
    <img :src="card.image" alt="card" class="w-full h-40 object-cover mb-2" />
    <p class="text-center font-semibold">{{ card.name }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ card: any }>();
</script>
