<script setup lang="ts">
import { useAppKit, useAppKitAccount, useAppKitTheme, useDisconnect } from '@reown/appkit/vue'

const colorMode = useColorMode()
const config = useRuntimeConfig()
const { open } = useAppKit()
const account = useAppKitAccount({ namespace: 'eip155' })
const { setThemeMode } = useAppKitTheme()
const { disconnect } = useDisconnect()
const isWalletMenuOpen = ref(false)

const hasWalletConnectProjectId = computed(() => Boolean(config.public.walletConnectProjectId))
const walletAddress = computed(() => account.value.address)
const { formattedUsdc, mintMockUsdc } = useMockUsdc(walletAddress)
const shortAddress = computed(() => {
  const address = account.value.address

  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect'
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const openWallet = async () => {
  if (!hasWalletConnectProjectId.value) {
    isWalletMenuOpen.value = true

    return
  }

  await open({ view: account.value.isConnected ? 'Account' : 'Connect', namespace: 'eip155' })
}

const toggleWalletMenu = async () => {
  if (!account.value.isConnected) {
    isWalletMenuOpen.value = !isWalletMenuOpen.value

    return
  }

  isWalletMenuOpen.value = !isWalletMenuOpen.value
}

const handleMintMockUsdc = () => {
  mintMockUsdc()
  isWalletMenuOpen.value = true
}

const handleDisconnect = async () => {
  await disconnect({ namespace: 'eip155' })
  isWalletMenuOpen.value = false
}

onMounted(() => {
  setThemeMode(colorMode.value === 'dark' ? 'dark' : 'light')
})

watch(
  () => colorMode.value,
  (mode) => {
    setThemeMode(mode === 'dark' ? 'dark' : 'light')
  }
)
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--page)]/86 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
      <NuxtLink class="flex items-center gap-3" to="/" aria-label="BaseVault home">
        <span class="grid size-11 place-items-center rounded-2xl bg-[#0052ff] text-white shadow-lg shadow-blue-700/25">
          <Icon name="lucide:gem" class="size-5" />
        </span>
        <span class="text-xl font-semibold">BaseVault</span>
      </NuxtLink>

      <nav class="hidden items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel-soft)] p-1 shadow-sm md:flex">
        <NuxtLink class="nav-link" to="/">Home</NuxtLink>
        <NuxtLink class="nav-link" to="/shop">Shop</NuxtLink>
        <NuxtLink class="nav-link" to="/preorder">Pre-order</NuxtLink>
        <NuxtLink class="nav-link" to="/auction">Auction</NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <ClientOnly>
          <div class="relative">
            <button class="wallet-button" type="button" @click="toggleWalletMenu">
              <Icon name="lucide:wallet" class="size-4" />
              {{ shortAddress }}
              <Icon name="lucide:chevron-down" class="size-4" />
            </button>

            <div v-if="isWalletMenuOpen" class="absolute right-0 mt-3 w-72 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-4 text-left shadow-2xl shadow-blue-950/10 backdrop-blur">
              <p class="text-xs font-bold uppercase text-[var(--muted)]">Wallet</p>
              <p class="mt-1 truncate font-semibold">{{ account.address || 'No wallet connected' }}</p>

              <div class="mt-4 rounded-2xl bg-[var(--panel-soft)] p-4">
                <p class="text-sm text-[var(--muted)]">Mock USDC balance</p>
                <p class="mt-1 text-3xl font-semibold">{{ formattedUsdc }} USDC</p>
              </div>

              <button class="primary-button mt-3 w-full" type="button" @click="handleMintMockUsdc">
                <Icon name="lucide:coins" class="size-5" />
                Mint 1,000 mock USDC
              </button>
              <NuxtLink class="secondary-button mt-2 w-full" to="/profile" @click="isWalletMenuOpen = false">
                <Icon name="lucide:user-round" class="size-5" />
                View profile
              </NuxtLink>
              <NuxtLink class="secondary-button mt-2 w-full" to="/my-shops" @click="isWalletMenuOpen = false">
                <Icon name="lucide:store" class="size-5" />
                Manage shop
              </NuxtLink>
              <button class="secondary-button mt-2 w-full" type="button" :disabled="!hasWalletConnectProjectId" @click="openWallet">
                <Icon name="lucide:settings" class="size-5" />
                {{ account.isConnected ? 'Wallet settings' : 'Connect wallet' }}
              </button>
              <button v-if="account.isConnected" class="secondary-button mt-2 w-full" type="button" @click="handleDisconnect">
                <Icon name="lucide:log-out" class="size-5" />
                Disconnect
              </button>
            </div>
          </div>
        </ClientOnly>
        <button class="icon-button" type="button" :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`" @click="toggleTheme">
          <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="size-5" />
        </button>
      </div>
    </div>
  </header>
</template>
