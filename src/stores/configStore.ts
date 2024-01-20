import { ref } from "vue"
import { defineStore } from "pinia"
import type { Paste } from "@/model/paste"

export const usePasteStore = defineStore("paste", () => {
  const never: number = Number.MAX_SAFE_INTEGER
  const paste = ref<Paste>({
    text: "",
    password: "",
    url: "",
    burn_after_read: false,
    expiring_date: never,
  })

  return { paste }
})
