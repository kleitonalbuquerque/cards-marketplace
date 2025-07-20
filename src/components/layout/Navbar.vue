<template>
  <nav
    class="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow"
  >
    <RouterLink to="/" class="text-xl font-bold text-blue-400 hover:text-white">
      CardMarket
    </RouterLink>

    <div class="flex gap-6 text-sm">
      <RouterLink
        to="/create-request"
        v-if="auth.user"
        class="hover:text-blue-300"
        >Nova Troca</RouterLink
      >
      <RouterLink to="/login" v-if="!auth.user" class="hover:text-blue-300"
        >Login</RouterLink
      >
      <RouterLink to="/register" v-if="!auth.user" class="hover:text-blue-300"
        >Registrar</RouterLink
      >
      <RouterLink to="/user" v-if="auth.user" class="hover:text-blue-300"
        >Minhas Cartas</RouterLink
      >
      <button
        @click="auth.logout"
        v-if="auth.user"
        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        <RouterLink to="/" v-if="auth.user" class="hover:text-blue-300"
          >Sair</RouterLink
        >
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore";
const auth = useAuthStore();
</script>
