<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCardStore } from "../stores/cardStore";
import { useAuthStore } from "../stores/authStore";
import api from "../services/api";

const cardStore = useCardStore();
const authStore = useAuthStore();

const selectedOffering = ref<string[]>([]);
const selectedReceiving = ref<string[]>([]);
const successMessage = ref("");

onMounted(() => {
  cardStore.fetchAllCards();
  cardStore.fetchUserCards();
});

async function createTrade() {
  const cards = [
    ...selectedOffering.value.map((id) => ({ cardId: id, type: "OFFERING" })),
    ...selectedReceiving.value.map((id) => ({ cardId: id, type: "RECEIVING" })),
  ];

  try {
    await api.post("/trades", { cards });
    successMessage.value = "Solicitação de troca criada com sucesso!";
    selectedOffering.value = [];
    selectedReceiving.value = [];
  } catch (error) {
    console.error("Erro ao criar troca:", error);
  }
}
</script>

<template>
  <div class="p-6 text-white">
    <h1 class="text-2xl font-bold mb-6">Criar Solicitação de Troca</h1>

    <div class="grid grid-cols-2 gap-6">
      <!-- Cartas do usuário (OFFERING) -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Suas Cartas (OFFERING)</h2>
        <div v-if="cardStore.myCards.length" class="space-y-2">
          <label
            v-for="card in cardStore.myCards"
            :key="card.id"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              :value="card.id"
              v-model="selectedOffering"
            />
            <span>{{ card.name }}</span>
          </label>
        </div>
      </div>

      <!-- Cartas gerais (RECEIVING) -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Cartas Desejadas (RECEIVING)</h2>
        <div v-if="cardStore.allCards?.list?.length" class="space-y-2">
          <label
            v-for="card in cardStore.allCards.list"
            :key="card.id"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              :value="card.id"
              v-model="selectedReceiving"
            />
            <span>{{ card.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <button
      @click="createTrade"
      class="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
    >
      Criar Troca
    </button>

    <p v-if="successMessage" class="mt-4 text-green-400">
      {{ successMessage }}
    </p>
  </div>
</template>
