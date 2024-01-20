<script setup lang="ts">
import ThePasteSection from "@/components/ThePasteSection.vue"
import ThePasteSettingsSection from "@/components/ThePasteSettingsSection.vue"
import Button from "@/components/ui/Button.vue"
import { createPaste } from "@/api/api"
import { usePasteStore } from "@/stores/configStore"
import { storeToRefs } from "pinia"
import router from "@/router/router"

const { paste } = storeToRefs(usePasteStore())
const createNewPaste = async () => {
  const pasteURL = await createPaste(paste.value)
  if (pasteURL)
    await router.push(pasteURL)
}
</script>

<template>
  <main class="m-3 w-100 sm:w-2/3 md:w-1/2 sm:m-auto h-screen bg-background">
    <ThePasteSection />
    <ThePasteSettingsSection />
    <Button @click="createNewPaste()" class="w-full sm:m-auto sm:w-1/2 mt-3">Create new Paste</Button>
  </main>
</template>
