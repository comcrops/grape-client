import "./assets/base.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "@/router/router"
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiEye, BiEyeSlash } from "oh-vue-icons/icons";

addIcons(BiEye, BiEyeSlash);

const app = createApp(App)
app.component("v-icon", OhVueIcon);
app.use(router)
app.use(createPinia())

app.mount("#app")
