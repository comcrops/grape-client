<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <select v-model="model" class="border border-foreground p-2 rounded-md">
    <slot />
  </select>
</template>
