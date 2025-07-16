<template>
  <form
    @submit.prevent="handleRegister"
    class="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded shadow"
  >
    <h2 class="text-xl font-semibold mb-2">Criar Conta</h2>
    <AppInput label="Nome" v-model="name" required />
    <AppInput label="Email" v-model="email" type="email" required />
    <AppInput label="Senha" v-model="password" type="password" required />

    <button
      type="submit"
      class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
    >
      Registrar
    </button>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import AppInput from "../components/ui/AppInput.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  error.value = "";
  try {
    await authStore.register(name.value, email.value, password.value);
    router.push("/login");
  } catch (err: any) {
    error.value = err.response?.data?.message || "Erro ao registrar usuário.";
  }
};
</script>
