<script setup lang="ts">
import Select from "@/components/ui/Select.vue"
import { ref, watch } from "vue"
import SelectOption from "@/components/ui/SelectOption.vue"
import Input from "@/components/ui/Input.vue"
import { storeToRefs } from "pinia"
import { usePasteStore } from "@/stores/configStore"

const pastePassword = ref<string>("")
const pasteURL = ref<string>("")
const pasteBurn = ref<boolean>(false)

const expirationOptions: string[] = [
  "Never",
  "10 Minutes",
  "1 Hour",
  "1 Day",
  "1 Week",
  "2 Weeks",
  "1 Month",
  "6 Months",
  "1 Year"
]
const expirationSelect = ref<string>(expirationOptions[0])

const assertNever = (value: string): never => {
  throw new Error(`Unexpected selected value: ${value}`)
}
const getExpirationTimestamp = (option: typeof expirationOptions[number]): number => {
  const now = new Date().getTime()
  switch (option) {
    case "Never":
      return new Date("9999-12-31T23:59:59").getTime()
    case "10 Minutes":
      return now + 10 * 60 * 1000 / 1000
    case "1 Hour":
      return now + 60 * 60 * 1000 / 1000
    case "1 Day":
      return now + 24 * 60 * 60 * 1000 / 1000
    case "1 Week":
      return now + 7 * 24 * 60 * 60 * 1000 / 1000
    case "2 Weeks":
      return now + 14 * 24 * 60 * 60 * 1000 / 1000
    case "1 Month":
      return now + 30 * 24 * 60 * 60 * 1000 / 1000
    case "6 Months":
      return now + 6 * 30 * 24 * 60 * 60 * 1000 / 1000
    case "1 Year":
      return now + 365 * 24 * 60 * 60 * 1000 / 1000
    default:
      return assertNever(option)
  }
}

const { paste } = storeToRefs(usePasteStore())
watch([expirationSelect, pastePassword, pasteURL, pasteBurn], () => {
  paste.value.expiring_date = getExpirationTimestamp(expirationSelect.value)
  paste.value.url = pasteURL.value
  paste.value.burn_after_read = pasteBurn.value
  paste.value.password = pastePassword.value
})

</script>

<template>
  <p class="text-xl sm:text-center sm:mb-2">Optional Paste Settings</p>
  <div class="flex flex-col gap-3 w-100 sm:w-1/2 sm:mb-3 sm:m-auto mt-2 p-4 border border-foreground rounded-md">
    <Input v-model="pastePassword" type="text" label=" Secure this paste:" placeholder="password" />
    <Input v-model="pasteURL" type="text" label="Change to custom url:" placeholder="url" />
    <p class="text-sm">Paste Expiration:</p>
    <Select v-model="expirationSelect">
      <SelectOption v-for="option in expirationOptions" :key="option" :text="option" />
    </Select>
    <div class="flex flex-row gap-3">
      <Input v-model="pasteBurn" type="checkbox" label="Burn after read:" />
    </div>
  </div>
</template>
