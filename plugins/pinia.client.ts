// plugins/piniaPersist.client.ts
import { defineNuxtPlugin } from '#app'
import type { Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  // Utilise directement $pinia injecté par Nuxt
  const pinia = nuxtApp.$pinia as Pinia;
  pinia.use(piniaPluginPersistedstate);
})
