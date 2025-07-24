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
        {{
          req.tradeCards
            .filter((c: TradeCard) => c.type === "OFFERING")
            .map((c: TradeCard) => c.card?.name || c.cardId)
            .join(", ")
        }}
      </p>
      <p>
        <strong>Quer receber:</strong>
        {{
          req.tradeCards
            .filter((c: TradeCard) => c.type === "RECEIVING")
            .map((c: TradeCard) => c.card?.name || c.cardId)
            .join(", ")
        }}
      </p>
      <button
        v-if="authStore.user?.id === req.userId"
        @click="deleteRequest(req.id)"
        class="text-red-500 underline mt-2"
      >
        Deletar
      </button>
    </div>
    <div v-for="trade in trades" :key="trade.id">
      <div>
        <span>Usuário: {{ trade.user?.name || trade.userId }}</span>
        <span>Oferecendo:</span>
        <span
          v-for="c in trade.tradeCards.filter((c: TradeCard) => c.type === 'OFFERING')"
          :key="c.id"
        >
          {{ c.card?.name || c.cardId }}
        </span>
        <span>Recebendo:</span>
        <span
          v-for="c in trade.tradeCards.filter((c: TradeCard) => c.type === 'RECEIVING')"
          :key="c.id"
        >
          {{ c.card?.name || c.cardId }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useExchangeStore } from "../stores/exchangeStore";
import { useAuthStore } from "../stores/authStore";

// Tipos locais caso não tenha um arquivo types/trade.ts
type TradeCard = {
  id: string;
  cardId: string;
  tradeId: string;
  type: "OFFERING" | "RECEIVING";
  card?: { id: string; name: string; description: string; imageUrl: string; createdAt: string };
};

type Trade = {
  id: string;
  userId: string;
  createdAt: string;
  user?: { name: string };
  tradeCards: TradeCard[];
};

const exchangeStore = useExchangeStore();
const authStore = useAuthStore();

onMounted(() => {
  exchangeStore.fetchRequests();
});

const deleteRequest = async (id: string) => {
  await exchangeStore.deleteRequest(id);
  await exchangeStore.fetchRequests();
};

const trades = defineProps<{ trades: Trade[] }>().trades;
</script>
