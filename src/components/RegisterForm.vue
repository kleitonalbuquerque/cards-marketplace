<template>
  <form
    @submit.prevent="handleRegister"
    class="flex flex-col gap-4 max-w-md mx-auto"
  >
    <AppInput label="Nome" v-model="name" required />
    <AppInput label="Email" v-model="email" type="email" required />
    <AppInput label="Senha" v-model="password" type="password" required />
    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded">
      Criar Conta
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import AppInput from "./ui/AppInput.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  try {
    await authStore.register(name.value, email.value, password.value);
    router.push("/login");
  } catch (err) {
    alert("Erro ao registrar usuário.");
  }
};
</script>
