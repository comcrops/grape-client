import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                icons: [
                    {
                        src: "@/assets/grape512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable any"
                    },
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    optimizeDeps: {
        include: ["oh-vue-icons/icons"]
    },
})
