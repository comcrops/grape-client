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
  </footer>
</template>
