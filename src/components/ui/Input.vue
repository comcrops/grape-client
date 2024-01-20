<script setup lang="ts">
const model = defineModel()
defineProps<{
  label: string,
  type: string,
  placeholder?: string
}>()
</script>

<template>
  <p class="text-sm">
    <label>{{ label }}</label>
  </p>
  <input v-if="type == 'checkbox'" v-model="model" :type="type" class="h-4 w-4" />
  <input v-else v-model="model" :type="type" :placeholder="placeholder" class="border border-foreground p-2 rounded-md" />
  <slot />
</template>
