<template>
  <form
    @submit.prevent="handleCreate"
    class="flex flex-col gap-4 max-w-lg mx-auto"
  >
    <h2 class="text-xl font-bold">Criar Solicitação de Troca</h2>

    <label>Escolha as cartas que você quer oferecer:</label>
    <select multiple v-model="selectedOffered" class="border p-2">
      <option v-for="card in myCards" :key="card.id" :value="card.id">
        {{ card.name }}
      </option>
    </select>

    <label>Escolha as cartas que deseja receber:</label>
    <select multiple v-model="selectedDesired" class="border p-2">
      <option v-for="card in allCards" :key="card.id" :value="card.id">
        {{ card.name }}
      </option>
    </select>

    <button type="submit" class="bg-purple-600 text-white py-2 px-4 rounded">
      Enviar Solicitação
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useCardStore } from "../stores/cardStore";
import { useExchangeStore } from "../stores/exchangeStore";

const selectedOffered = ref<string[]>([]);
const selectedDesired = ref<string[]>([]);

const auth = useAuthStore();
const cardStore = useCardStore();
const exchangeStore = useExchangeStore();

const myCards = ref<any[]>([]);
const allCards = ref<any[]>([]);

onMounted(async () => {
  await cardStore.fetchMyCards(auth.token);
  myCards.value = cardStore.myCards;

  const res = await fetch(
    "https://cards-marketplace-api-2fjj.onrender.com/cards"
  );
  allCards.value = await res.json();
});

const handleCreate = async () => {
  await exchangeStore.createRequest(
    {
      cardsToGive: selectedOffered.value,
      cardsToReceive: selectedDesired.value,
    },
    auth.token
  );
  alert("Solicitação criada com sucesso!");
};
</script>
