<template>
  <div class="app-layout">
    <Navbar />
    <main class="container mx-auto mt-8 px-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue";
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
</style>
