<script setup lang="ts">
defineProps<{
  variant?: "outline"
}>()
</script>

<template>
  <button v-if="variant !== 'outline'"
    class="cursor-pointer flex justify-center items-center text-background dark:text-foreground bg-primary hover:bg-purple-500 active:border active:border-primary rounded-md duration-100 p-2"
  >
    <slot />
  </button>
  <button v-else
    class="cursor-pointer flex justify-center items-center text-primary dark:text-primary bg-background border border-primary hover:bg-accent active:bg-primary active:text-background rounded-md duration-100 p-2">
    <slot />
  </button>
</template>
