import { createAppKit } from '@reown/appkit/vue'
import { base, type AppKitNetwork } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { WagmiPlugin } from '@wagmi/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const projectId = config.public.walletConnectProjectId || 'YOUR_PROJECT_ID'
  const networks = [base] as [AppKitNetwork, ...AppKitNetwork[]]

  const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true
  })

  nuxtApp.vueApp.use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig })

  createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    defaultNetwork: base,
    metadata: {
      name: 'BaseVault',
      description: 'Luxury brand pre-order and auction platform on Base',
      url: window.location.origin,
      icons: [`${window.location.origin}/favicon.ico`]
    },
    enableNetworkSwitch: true,
    themeMode: 'light',
    themeVariables: {
      '--apkt-accent': '#0052ff',
      '--apkt-color-mix': '#0052ff',
      '--apkt-color-mix-strength': 28,
      '--apkt-border-radius-master': '12px'
    }
  })
})
