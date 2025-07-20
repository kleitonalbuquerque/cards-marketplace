<template>
  <AppLayout>
    <div v-if="user">
      <h1 class="text-2xl font-bold mb-4">Suas Cartas, {{ user.name }}</h1>
      <p class="text-gray-300 mb-6">Troque cartas de forma rápida e segura.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div
          v-for="card in user.cards"
          :key="card.id"
          class="bg-gray-800 rounded-lg p-4 shadow-md text-white"
        >
          <img
            :src="card.imageUrl"
            alt="Card Image"
            class="w-full h-40 object-cover mb-2 rounded"
          />
          <h2 class="font-semibold text-lg">{{ card.name }}</h2>
          <p class="text-sm text-gray-300">{{ card.description }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-white">Carregando informações do usuário...</p>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "../components/layout/AppLayout.vue";
import { useAuthStore } from "../stores/authStore";
import { computed } from "vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
