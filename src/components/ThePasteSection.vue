<script setup lang="ts">
import { ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { usePasteStore } from "@/stores/pasteStore"

const content = ref<string>("")

const { paste } = storeToRefs(usePasteStore())

</script>

<template>
  <p class="text-xl">New Paste</p>
  <textarea
    v-model="paste.text"
    class="font-mono p-2 mt-2 sm:mb-2 w-full h-1/3 border border-accent drop-shadow-sm dark:border-accent bg-background min-h-56 rounded-md"
    placeholder="Paste Here..."
    autofocus
  ></textarea>
</template>
