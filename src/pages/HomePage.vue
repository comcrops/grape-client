<script setup lang="ts">
import ThePasteSection from "@/components/ThePasteSection.vue"
import ThePasteSettingsSection from "@/components/ThePasteSettingsSection.vue"
import Button from "@/components/ui/Button.vue"
import {createPaste} from "@/api/api"
import {usePasteStore} from "@/stores/pasteStore"
import {storeToRefs} from "pinia"
import {useClipboard} from "@vueuse/core"
import router from "@/router/router";
import { onMounted } from "vue"

const {copy, copied} = useClipboard()

const {paste} = storeToRefs(usePasteStore())

async function createNewPaste() {
  const text = paste.value.text
  const pasteUrl = await createPaste(paste.value)

  if (pasteUrl?.error) {
    alert(pasteUrl?.error)
    return
  }

  const url = `${import.meta.env.VITE_FRONTEND_URL}/paste/${pasteUrl?.url}`

  if (pasteUrl) {
    await copy(url)
  }

  if (typeof text === "string") {

  }

  await router.push({
    name: "paste",
    params: {
      id: pasteUrl?.url,
    },
  })
}

function resetPaste() {
  paste.value = {
    expiring_date: "9999-12-31T23:59:59.999Z",
    burn_after_read: false,
  }
}

onMounted(() => {
  resetPaste()
})

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
