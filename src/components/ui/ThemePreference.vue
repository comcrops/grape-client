<script setup lang="ts">
import { watchEffect } from "vue"
import { useColorMode, useCycleList } from "@vueuse/core"
import Button from "@/components/ui/Button.vue"

const mode = useColorMode()

const { state, next } = useCycleList(['dark', 'light'], { initialValue: mode })

watchEffect(() => mode.value = state.value as any)
</script>

<template>
  <Button @click="next()">
    <span class="w-16 capitalize">{{ state }}</span>
  </Button>
</template>
