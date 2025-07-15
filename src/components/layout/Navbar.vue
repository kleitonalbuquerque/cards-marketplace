<template>
  <nav class="bg-gray-900 text-white px-6 py-4 flex justify-between">
    <RouterLink to="/" class="font-bold">CardMarket</RouterLink>
    <div class="flex gap-4">
      <RouterLink to="/marketplace">Marketplace</RouterLink>
      <RouterLink to="/create-request" v-if="auth.user">Nova Troca</RouterLink>
      <RouterLink to="/login" v-if="!auth.user">Login</RouterLink>
      <RouterLink to="/register" v-if="!auth.user">Registrar</RouterLink>
      <button @click="auth.logout" v-if="auth.user">Sair</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore";
const auth = useAuthStore();
</script>
