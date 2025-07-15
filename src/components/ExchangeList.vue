<template>
  <div class="space-y-4">
    <div
      v-for="req in exchangeStore.requests"
      :key="req.id"
      class="border rounded p-4 shadow"
    >
      <p><strong>Usuário:</strong> {{ req.user?.name || "Anônimo" }}</p>
      <p>
        <strong>Oferece:</strong>
        {{ req.cardsToGive.map((c) => c.name).join(", ") }}
      </p>
      <p>
        <strong>Quer receber:</strong>
        {{ req.cardsToReceive.map((c) => c.name).join(", ") }}
      </p>
      <button
        v-if="authStore.user?.id === req.userId"
        @click="deleteRequest(req.id)"
        class="text-red-500 underline mt-2"
      >
        Deletar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useExchangeStore } from "../stores/exchangeStore";
import { useAuthStore } from "../stores/authStore";

const exchangeStore = useExchangeStore();
const authStore = useAuthStore();

onMounted(() => {
  exchangeStore.fetchRequests();
});

const deleteRequest = async (id: string) => {
  await exchangeStore.deleteRequest(id, authStore.token);
  await exchangeStore.fetchRequests();
};
</script>
