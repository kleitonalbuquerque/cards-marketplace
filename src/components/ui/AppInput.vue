<template>
  <div class="flex flex-col gap-1">
    <label v-if="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      class="border rounded px-3 py-2"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineModel } from "vue";

defineProps<{
  label?: string;
  type?: string;
  placeholder?: string;
}>();

const model = defineModel();
</script>
