<template>
  <div class="space-y-4">
    <div
      v-for="trade in trades"
      :key="trade.id"
      class="border rounded p-4 shadow"
    >
      <p><strong>Usuário:</strong> {{ trade.user?.name || "Anônimo" }}</p>
      <p>
        <strong>Oferece:</strong>
        {{
          trade.tradeCards
            .filter((c) => c.type === "OFFERING")
            .map((c) => c.card?.name || c.cardId)
            .join(", ")
        }}
      </p>
      <p>
        <strong>Quer receber:</strong>
        {{
          trade.tradeCards
            .filter((c) => c.type === "RECEIVING")
            .map((c) => c.card?.name || c.cardId)
            .join(", ")
        }}
      </p>
      <button
        v-if="authStore.user?.id === trade.userId"
        @click="deleteRequest(trade.id)"
        class="text-red-500 underline mt-2"
      >
        Deletar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useExchangeStore } from "../stores/exchangeStore";
import { useAuthStore } from "../stores/authStore";

// Tipos locais
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

const trades = computed<Trade[]>(() =>
  exchangeStore.requests.map((trade: any) => ({
    id: trade.id,
    userId: trade.userId,
    createdAt: trade.createdAt,
    user: trade.user,
    tradeCards: trade.tradeCards.map((card: any) => ({
      id: card.id ?? "",
      cardId: card.cardId,
      tradeId: card.tradeId ?? "",
      type: card.type,
      card: card.card,
    })),
  }))
);

const deleteRequest = async (id: string) => {
  await exchangeStore.deleteRequest(id);
  await exchangeStore.fetchRequests();
};
</script>
