// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@wagmi/vue/nuxt',
    'dayjs-nuxt',
    'nuxt-toast'
  ],

  runtimeConfig: {
    public: {
      walletConnectProjectId: process.env.NUXT_PUBLIC_WALLETCONNECT_PROJECT_ID || process.env.NUXT_PROJECT_ID || ''
    }
  }
})
