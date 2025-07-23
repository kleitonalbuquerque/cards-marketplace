<template>
  <AppLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold mb-4">Minhas Solicitações de Troca</h1>
      <div v-if="userRequests.length">
        <div
          v-for="req in userRequests"
          :key="req.id"
          class="border rounded p-3 mb-2 flex justify-between items-center"
        >
          <div>
            <span class="font-bold">Solicitação #{{ req.id }}</span>
            <span class="ml-2 text-xs text-gray-500">{{ req.createdAt }}</span>
            <div class="text-xs mt-1">
              <span class="font-semibold">Oferecendo:</span>
              <span v-for="c in req.tradeCards.filter(c => c.type === 'OFFERING')" :key="c.cardId" class="ml-1">
                {{ c.card?.name || c.cardId }}
              </span>
              <br>
              <span class="font-semibold">Quer receber:</span>
              <span v-for="c in req.tradeCards.filter(c => c.type === 'RECEIVING')" :key="c.cardId" class="ml-1">
                {{ c.card?.name || c.cardId }}
              </span>
            </div>
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
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useExchangeStore } from "../stores/exchangeStore";
import { useAuthStore } from "../stores/authStore";
import AppLayout from "../components/layout/AppLayout.vue";

const exchangeStore = useExchangeStore();
const authStore = useAuthStore();

const user = computed(() => authStore.user);
const userRequests = computed(() => exchangeStore.userRequests);

async function cancelRequest(id: string) {
  if (confirm("Deseja cancelar esta solicitação?")) {
    await exchangeStore.deleteRequest(id, authStore.token);
    if (user.value?.id) {
      await exchangeStore.fetchUserRequests(user.value.id);
    }
  }
}

onMounted(async () => {
  if (user.value?.id) {
    await exchangeStore.fetchUserRequests(user.value.id);
  }
});

watch(user, async (newUser) => {
  if (newUser?.id) {
    await exchangeStore.fetchUserRequests(newUser.id);
  }
});
</script>