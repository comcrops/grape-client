<script setup lang="ts">
import { useClipboard } from "@vueuse/core"
import { ref } from "vue"
import Button from "@/components/ui/Button.vue"

const props = defineProps<{
  source: string
}>()

const src = ref<string>(props.source)

const { copy, copied, isSupported } = useClipboard({ src })
</script>

<template>
  <Button v-if="isSupported">
    <button @click="copy(source)">
      <span v-if="!copied">
        <slot />
      </span>
      <span v-else>Copied!</span>
    </button>
  </Button>
  <p v-else>Your browser does not support Clipboard API</p>
</template>
