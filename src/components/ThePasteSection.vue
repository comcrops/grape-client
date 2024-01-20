<script setup lang="ts">
import { ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { usePasteStore } from "@/stores/configStore"

const content = ref<string>("")

const { paste } = storeToRefs(usePasteStore())
watch(content, () => {
  paste.value.text = content.value
})
</script>

<template>
  <p class="text-xl">New Paste</p>
  <textarea v-model="content"
            class="font-mono p-2 mt-2 sm:mb-2 w-full h-1/3 border border-foreground min-h-56 rounded-md"
            placeholder="Paste Here..."
            autofocus
  ></textarea>
</template>
