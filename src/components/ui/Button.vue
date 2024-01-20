<script setup lang="ts"></script>

<template>
  <button
    class="cursor-pointer flex justify-center items-center text-background dark:text-foreground bg-primary hover:bg-purple-500 active:border active:border-primary rounded-md duration-100 p-2"
  >
    <slot />
  </button>
</template>
