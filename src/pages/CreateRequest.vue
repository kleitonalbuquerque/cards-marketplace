<template>
  <AppLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold mb-4">Nova Troca</h1>

      <!-- Suas Cartas -->
      <div>
        <h2 class="font-semibold mb-2">Cartas que você está oferecendo</h2>
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
        <div v-else>
          <p>Nenhuma carta sua foi encontrada.</p>
        </div>
      </div>

      <div class="divider-solid"></div>

      <!-- Cartas desejadas -->
      <div>
        <h2 class="font-semibold mb-2">Cartas que você deseja receber</h2>
        <div v-if="paginatedCards.length" class="space-y-2">
          <label
            v-for="card in paginatedCards"
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
        <div v-else>
          <p>Nenhuma carta disponível para troca.</p>
        </div>

        <!-- Controles de paginação -->
        <div class="mt-4 flex justify-between items-center">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>

      <button
        @click="createRequest"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Enviar Solicitação de Troca
      </button>
    </div>
  </AppLayout>
</template>

<style scoped>
.divider-solid {
  border-top: 1px solid #bbb;
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCardStore } from "../stores/cardStore";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import AppLayout from "../components/layout/AppLayout.vue";

const cardStore = useCardStore();
const authStore = useAuthStore();
const router = useRouter();

const selectedOffering = ref<number[]>([]);
const selectedReceiving = ref<number[]>([]);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedCards = computed(() => {
  const all = cardStore.allCards?.list || [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return all.slice(start, end);
});

const totalPages = computed(() => {
  const all = cardStore.allCards?.list || [];
  return Math.ceil(all.length / itemsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function createRequest() {
  if (!selectedOffering.value.length || !selectedReceiving.value.length) {
    alert("Você precisa selecionar cartas para oferecer e receber.");
    return;
  }

  console.log("Cartas que estou oferecendo:", selectedOffering.value);
  console.log("Cartas que desejo receber:", selectedReceiving.value);

  router.push("/requests");
}

onMounted(() => {
  cardStore.fetchAllCards();
  cardStore.fetchUserCards();
});
</script>
