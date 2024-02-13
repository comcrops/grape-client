<script setup lang="ts">
import Select from "@/components/ui/Select.vue"
import { ref, watch } from "vue"
import SelectOption from "@/components/ui/SelectOption.vue"
import Input from "@/components/ui/Input.vue"
import { storeToRefs } from "pinia"
import { usePasteStore } from "@/stores/pasteStore"



const pastePassword = ref<string>("")
const pasteURL = ref<string>("")
const pasteBurn = ref<boolean>(false)
const passwordIcon = ref<string>("bi-eye-slash")
const passwordVisibility = ref<string>("password")

const expirationOptions: string[] = [
    "Never",
    "10 Minutes",
    "1 Hour",
    "1 Day",
    "1 Week",
    "2 Weeks",
    "1 Month",
    "6 Months",
    "1 Year",
]
const expirationSelect = ref<string>(expirationOptions[0])

const assertNever = (value: string): never => {
    throw new Error(`Unexpected selected value: ${value}`)
}
const getExpirationTimestamp = (option: (typeof expirationOptions)[number]): string => {
    switch (option) {
        case "Never":
            return "9999-12-31T23:59:59.999Z"
        case "10 Minutes":
            return new Date(new Date().getTime() + 10 * 60 * 1000).toISOString()
        case "1 Hour":
            return new Date(new Date().getTime() + 60 * 60 * 1000).toISOString()
        case "1 Day":
            return new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
        case "1 Week":
            return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        case "2 Weeks":
            return new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()
        case "1 Month":
            return new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
        case "6 Months":
            return new Date(new Date().getTime() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString()
        case "1 Year":
            return new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toISOString()
        default:
            return assertNever(option)
    }
}

function togglePasswordVisibility() {
    passwordIcon.value = passwordIcon.value === "bi-eye" ? "bi-eye-slash" : "bi-eye"
    passwordVisibility.value = passwordVisibility.value === "password" ? "text" : "password"
}

const { paste } = storeToRefs(usePasteStore())
watch([expirationSelect, pastePassword, pasteURL, pasteBurn], () => {
    paste.value.expiring_date = getExpirationTimestamp(expirationSelect.value)
    paste.value.url = pasteURL.value
    paste.value.password = pastePassword.value
    paste.value.burn_after_read = pasteBurn.value
})
</script>

<template>
    <p class="text-xl sm:text-center sm:mb-2">Optional Paste Settings</p>
    <div
        class="flex flex-col gap-3 w-100 sm:w-1/2 sm:mb-3 sm:m-auto mt-2 p-4 border border-accent dark:border-accent rounded-md">
        <p class="text-sm">Secure this paste:</p>
        <div class="flex flex-row items-center">
            <Input v-model="pastePassword" :type="passwordVisibility" label="" placeholder="password"/>
            <v-icon :name="passwordIcon" @click="togglePasswordVisibility()" class="cursor-pointer border pl-5 pr-5"/>
        </div>
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

