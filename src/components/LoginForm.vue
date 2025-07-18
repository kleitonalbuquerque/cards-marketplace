<template>
  <form
    @submit.prevent="handleLogin"
    class="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded shadow"
  >
    <h2 class="text-xl font-semibold mb-2">Login</h2>
    <AppInput label="Email" v-model="email" type="email" required />
    <AppInput label="Senha" v-model="password" type="password" required />
    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">
      Entrar
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import AppInput from "./ui/AppInput.vue";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    await authStore.fetchUser();
    router.push("/");
  } catch (err) {
    alert("Falha no login.");
  }
};
</script>
