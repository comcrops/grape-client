<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getPaste, getPasteWithPassword } from "@/api/api"
import type { PasteTextResponse } from "@/model/response"
import { useRoute, useRouter } from "vue-router"
import Input from "@/components/ui/Input.vue"
import Button from "@/components/ui/Button.vue"
import CopyToClipboardButton from "@/components/ui/CopyToClipboardButton.vue"

const content = ref<string>("")
const router = useRouter()
const route = useRoute()
const pasteId = route.params.id

function isPasteTextResponse(response: any): response is PasteTextResponse {
  return typeof response === "object" && response !== null && "text" in response
}

async function promptForPassword() {
  const password = prompt("Enter the Paste Password:")
  if (!password) {
    await router.push("/")
    return
  }
  const result = await getPasteWithPassword(pasteId as string, password)
  if (typeof result !== "string") {
    if (isPasteTextResponse(result)) {
      content.value = result.text
    } else {
      alert("Undefined response for getPaste()")
    }
  } else {
    switch (result) {
      case "Paste not found":
        alert("Paste not found")
        await router.push("/")
        return
      case "Wrong Password":
        await promptForPassword()
        break
      default:
        alert("Unknown error for Paste")
    }
  }
}

onMounted(async () => {
  const result = await getPaste(pasteId as string)
  if (typeof result !== "string") {
    if (isPasteTextResponse(result)) {
      content.value = result.text
    } else {
      alert("Undefined response for getPaste()")
    }
  } else {
    switch (result) {
      case "Paste not found":
        alert("Paste not found")
        await router.push("/")
        return
      case "Password protected":
        await promptForPassword()
        break
      default:
        alert("Unknown error for Paste")
    }
  }
})
</script>

<template>
  <main class="m-3 w-100 sm:w-2/3 md:w-1/2 sm:m-auto h-screen bg-background">
    <p class="text-xl">Paste {{ pasteId }}</p>
    <textarea
      v-model="content"
      class="font-mono p-2 mt-2 sm:mb-2 w-full h-1/2 border border-accent drop-shadow-sm dark:border-accent bg-background min-h-56 rounded-md"
      autofocus
    ></textarea>
    <div class="flex grow gap-2 w-full sm:w-96">
      <CopyToClipboardButton class="grow" :source="content" />
      <Button @click="router.push('/')" variant="outline" class="grow">Back to Home</Button>
    </div>
  </main>
</template>
