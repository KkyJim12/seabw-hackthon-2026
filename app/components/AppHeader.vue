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
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : 'Connect'
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
  (mode) => { setThemeMode(mode === 'dark' ? 'dark' : 'light') }
)
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--page)]/90 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">

      <!-- Logo -->
      <NuxtLink class="flex items-center gap-2.5 shrink-0" to="/" aria-label="BaseVault home">
        <span
          class="grid size-8 place-items-center rounded-lg text-white"
          style="background: var(--accent); box-shadow: 0 2px 12px var(--accent-glow)"
        >
          <Icon name="lucide:zap" class="size-4" />
        </span>
        <span class="text-sm font-black tracking-[0.14em] uppercase text-[var(--ink)]">BaseVault</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-0.5 rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-1 md:flex">
        <NuxtLink class="nav-link" to="/">Home</NuxtLink>
        <NuxtLink class="nav-link" to="/shop">Shop</NuxtLink>
        <NuxtLink class="nav-link" to="/preorder">Pre-order</NuxtLink>
        <NuxtLink class="nav-link" to="/auction">Auction</NuxtLink>
      </nav>

      <!-- Right controls -->
      <div class="flex items-center gap-2">
        <ClientOnly>
          <div class="relative">
            <button class="wallet-button text-sm" type="button" @click="toggleWalletMenu">
              <Icon name="lucide:wallet" class="size-4" />
              {{ shortAddress }}
              <Icon name="lucide:chevron-down" class="size-3.5 opacity-70" />
            </button>

            <!-- Wallet dropdown -->
            <div
              v-if="isWalletMenuOpen"
              class="absolute right-0 mt-2.5 w-72 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-2xl backdrop-blur-xl"
              style="box-shadow: 0 20px 60px rgba(0,5,40,0.18)"
            >
              <!-- Address -->
              <div class="rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-3">
                <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Wallet</p>
                <p class="mt-1 truncate text-sm font-semibold">{{ account.address || 'No wallet connected' }}</p>
              </div>

              <!-- USDC balance -->
              <div class="mt-3 rounded-xl bg-[var(--accent-soft)] border border-[var(--line)] p-3">
                <p class="text-xs font-bold uppercase tracking-widest" style="color: var(--accent)">Mock USDC</p>
                <p class="mt-0.5 text-2xl font-black tabular" style="color: var(--ink)">{{ formattedUsdc }}</p>
              </div>

              <!-- Actions -->
              <div class="mt-3 grid gap-2">
                <button class="primary-button w-full text-sm" type="button" @click="handleMintMockUsdc">
                  <Icon name="lucide:coins" class="size-4" />
                  Mint 1,000 mock USDC
                </button>
                <NuxtLink class="secondary-button w-full text-sm" to="/profile" @click="isWalletMenuOpen = false">
                  <Icon name="lucide:user-round" class="size-4" />
                  Profile
                </NuxtLink>
                <NuxtLink class="secondary-button w-full text-sm" to="/my-shops" @click="isWalletMenuOpen = false">
                  <Icon name="lucide:store" class="size-4" />
                  Manage shops
                </NuxtLink>
                <button class="secondary-button w-full text-sm" type="button" :disabled="!hasWalletConnectProjectId" @click="openWallet">
                  <Icon name="lucide:settings" class="size-4" />
                  {{ account.isConnected ? 'Wallet settings' : 'Connect wallet' }}
                </button>
                <button v-if="account.isConnected" class="secondary-button w-full text-sm" type="button" @click="handleDisconnect">
                  <Icon name="lucide:log-out" class="size-4" />
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </ClientOnly>

        <!-- Theme toggle -->
        <button
          class="icon-button"
          type="button"
          :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
          @click="toggleTheme"
        >
          <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="size-4" />
        </button>
      </div>
    </div>
  </header>
</template>
