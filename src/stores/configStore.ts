import { ref } from "vue"
import { defineStore } from "pinia"
import type { Paste } from "@/model/paste"

export const usePasteStore = defineStore("paste", () => {
  const never: number = 253402297199000
  const paste = ref<Paste>({
    text: "",
    password: "",
    url: "",
    burn_after_read: false,
    expiring_date: never
  })

  return { paste }
})
