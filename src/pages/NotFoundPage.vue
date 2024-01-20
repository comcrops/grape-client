<script setup lang="ts">
import Button from "@/components/ui/Button.vue"
</script>

<template>
  <div class="text-center h-screen w-full mt-32 sm:mt-16">
    <p class="text-7xl font-bold text-primary p-5">404</p>
    <p class="text-lg mb-12 sm:mb-5">Whatever you are looking for, it doesn't exist.</p>
    <RouterLink to="/">
      <Button class="m-auto w-1/2 sm:w-32">Back to home</Button>
    </RouterLink>
  </div>
</template>
