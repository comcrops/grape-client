<script setup lang="ts">
import ThemePreference from "@/components/ui/ThemePreference.vue"
</script>

<template>
  <header>
    <div class="flex justify-center">
      <img alt="Grape logo" class="logo" src="@/assets/grape.png" width="112" height="102" />
    </div>
  </header>
  <RouterView />
  <footer class="flex flex-col items-center m-3">
    <p>Preference</p>
    <ThemePreference />
    <a href="https://github.com/s-prechtl/grape-client">
      <img alt="Git logo" class="mt-2 w-16 h-16" src="@/assets/github.svg"/>
    </a>

  </footer>
</template>
