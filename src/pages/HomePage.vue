<script setup lang="ts">
import ThePasteSection from "@/components/ThePasteSection.vue"
import ThePasteSettingsSection from "@/components/ThePasteSettingsSection.vue"
import Button from "@/components/ui/Button.vue"
import {createPaste} from "@/api/api"
import {usePasteStore} from "@/stores/pasteStore"
import {storeToRefs} from "pinia"
import {useClipboard} from "@vueuse/core"
import router from "@/router/router";

const {copy, copied} = useClipboard()

const {paste} = storeToRefs(usePasteStore())
const createNewPaste = async () => {
  const text = paste.value.text
  const pasteURL = await createPaste(paste.value)
  // reset paste
  paste.value = {
    expiring_date: "9999-12-31T23:59:59.999Z",
    burn_after_read: false,
  }

  const url = `${import.meta.env.VITE_FRONTEND_URL}/paste/${pasteURL?.url}`

  if (pasteURL) {
    await copy(url)
  }

  if (typeof text === "string") {
    localStorage.setItem("content", text)
  }

  await router.push({
    name: "paste",
    params: {
      id: pasteURL?.url,
    },
  })
}
</script>

<template>
  <main class="m-3 w-100 sm:w-3/4 md:w-2/3 xl:w-1/3 sm:m-auto h-screen bg-background">
    <ThePasteSection/>
    <ThePasteSettingsSection/>
    <Button @click="createNewPaste()" class="w-full sm:m-auto sm:w-1/2 mt-3">
      <span v-if="!copied">
        Create and copy Paste
      </span>
      <span v-else>Copied!</span>
    </Button>
  </main>
</template>
