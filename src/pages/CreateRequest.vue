<template>
  <AppLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold mb-4">Nova Troca</h1>
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
        @click="submitRequest"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Enviar Solicitação de Troca
      </button>

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
import { ref, computed, onMounted } from "vue";
import { useCardStore } from "../stores/cardStore";
import { useExchangeStore } from "../stores/exchangeStore";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import AppLayout from "../components/layout/AppLayout.vue";

type Card = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

const cardStore = useCardStore();
const exchangeStore = useExchangeStore();
const authStore = useAuthStore();
const router = useRouter();

const myCards = computed<Card[]>(() => cardStore.myCards || []);
const allCards = computed<Card[]>(() =>
  Array.isArray(cardStore.allCards) ? cardStore.allCards : []
);

const selectedOffering = ref<string[]>([]);
const selectedReceiving = ref<string[]>([]);

const user = computed(() => authStore.user);
const userRequests = computed(() =>
  exchangeStore.requests.filter(req => req.userId === user.value?.id)
);

async function submitRequest() {
  const tradeCards = [
    ...selectedOffering.value.map(id => ({ cardId: id, type: "OFFERING" as "OFFERING" })),
    ...selectedReceiving.value.map(id => ({ cardId: id, type: "RECEIVING" as "RECEIVING" })),
  ];
  await exchangeStore.createRequest(tradeCards);
  router.push("/requests");
}

async function cancelRequest(id: string) {
  if (confirm("Deseja cancelar esta solicitação?")) {
    await exchangeStore.deleteRequest(id);
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
