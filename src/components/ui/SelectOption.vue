<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <option>{{ text }}</option>
</template>
