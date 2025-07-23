<template>
  <AppLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold mb-4">Nova Troca</h1>

      <!-- Suas Cartas -->
      <div>
        <h2 class="font-semibold mb-2">Cartas que você está oferecendo</h2>
        <div v-if="myCards.length" class="space-y-2">
          <label
            v-for="card in myCards"
            :key="card.id"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              :value="card.id"
              v-model="selectedOffering"
              class="accent-blue-600"
            />
            <span>{{ card.name }}</span>
          </label>
        </div>
        <div v-else>
          <p>Nenhuma carta sua foi encontrada.</p>
        </div>
      </div>

      <div class="divider-solid"></div>

      <!-- Cartas desejadas (todas do sistema) -->
      <div>
        <h2 class="font-semibold mb-2">Cartas que você deseja receber</h2>
        <div v-if="allCards.length" class="space-y-2 max-h-64 overflow-y-auto">
          <label
            v-for="card in allCards"
            :key="card.id"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              :value="card.id"
              v-model="selectedReceiving"
              class="accent-green-600"
            />
            <span>{{ card.name }}</span>
          </label>
        </div>
        <div v-else>
          <p>Nenhuma carta disponível para troca.</p>
        </div>
      </div>

      <button
        @click="createRequest"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Enviar Solicitação de Troca
      </button>

      <!-- Suas solicitações de troca -->
      <div class="mt-8">
        <h2 class="font-semibold mb-2">Suas solicitações de troca</h2>
        <div v-if="userRequests.length">
          <div
            v-for="req in userRequests"
            :key="req.id"
            class="border rounded p-3 mb-2 flex justify-between items-center"
          >
            <div>
              <span class="font-bold">Solicitação #{{ req.id }}</span>
              <span class="ml-2 text-xs text-gray-500">{{ req.createdAt }}</span>
            </div>
            <button
              @click="cancelRequest(req.id)"
              class="text-red-600 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
        <div v-else>
          <p>Você não possui solicitações de troca.</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCardStore } from "../stores/cardStore";
import { useExchangeStore } from "../stores/exchangeStore";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import AppLayout from "../components/layout/AppLayout.vue";

const cardStore = useCardStore();
const exchangeStore = useExchangeStore();
const authStore = useAuthStore();
const router = useRouter();

const selectedOffering = ref<string[]>([]);
const selectedReceiving = ref<string[]>([]);

const myCards = computed(() => cardStore.myCards || []);
const allCards = computed(() =>
  Array.isArray(cardStore.allCards) ? cardStore.allCards : cardStore.allCards.list || []
);

const user = computed(() => authStore.user);
const userRequests = computed(() =>
  exchangeStore.requests.filter(req => req.userId === user.value?.id)
);

async function createRequest() {
  if (!selectedOffering.value.length || !selectedReceiving.value.length) {
    alert("Você precisa selecionar cartas para oferecer e receber.");
    return;
  }

  const cards = [
    ...selectedOffering.value.map(cardId => ({ cardId, type: "OFFERING" })),
    ...selectedReceiving.value.map(cardId => ({ cardId, type: "RECEIVING" })),
  ];

  try {
    await exchangeStore.createRequest(cards, authStore.token);
    alert("Solicitação criada com sucesso!");
    router.push("/requests");
  } catch (e) {
    alert("Erro ao criar solicitação.");
  }
}

async function cancelRequest(id: string) {
  if (confirm("Deseja cancelar esta solicitação?")) {
    await exchangeStore.deleteRequest(id, authStore.token);
    await exchangeStore.fetchRequests();
  }
}

onMounted(() => {
  cardStore.fetchAllCards();
  cardStore.fetchUserCards();
  exchangeStore.fetchRequests();
});
</script>

<style scoped>
.divider-solid {
  border-top: 1px solid #bbb;
}
</style>
