<template>
  <nav
    class="bg-gray-800 text-white px-6 py-4 flex justify-between items-center"
  >
    <RouterLink to="/" class="text-2xl font-bold text-white"
      >CardMarket</RouterLink
    >

    <div class="flex items-center gap-6 text-sm">
      <RouterLink to="/marketplace" class="hover:underline"
        >Marketplace</RouterLink
      >
      <RouterLink to="/create-request" v-if="auth.user" class="hover:underline"
        >Nova Troca</RouterLink
      >
      <RouterLink to="/login" v-if="!auth.user" class="hover:underline"
        >Login</RouterLink
      >
      <RouterLink to="/register" v-if="!auth.user" class="hover:underline"
        >Registrar</RouterLink
      >
      <button
        @click="auth.logout"
        v-if="auth.user"
        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
      >
        Sair
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore";
const auth = useAuthStore();
</script>
