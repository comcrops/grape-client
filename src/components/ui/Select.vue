<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <select
    v-model="model"
    class="border border-accent drop-shadow-sm p-2 bg-background dark:border-accent rounded-md"
  >
    <slot />
  </select>
</template>
