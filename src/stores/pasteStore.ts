import { ref } from "vue"
import { defineStore } from "pinia"
import type { Paste } from "@/model/paste"

export const usePasteStore = defineStore("paste", () => {
  const paste = ref<Paste | Partial<Paste>>({
    expiring_date: "9999-12-31T23:59:59.999Z",
    burn_after_read: false,
  })

  return { paste }
})
