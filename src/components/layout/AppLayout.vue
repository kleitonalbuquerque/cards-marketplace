<template>
  <div>
    <Navbar />
    <main class="container mx-auto mt-8 px-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue";
</script>
