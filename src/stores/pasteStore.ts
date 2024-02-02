import { ref } from "vue"
import { defineStore } from "pinia"
import type { Paste } from "@/model/paste"

export const usePasteStore = defineStore("paste", () => {
  const paste = ref<Paste | Partial<Paste>>({})

  return { paste }
})
