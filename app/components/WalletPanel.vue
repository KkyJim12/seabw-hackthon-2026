<script setup lang="ts">
import { base } from '@reown/appkit/networks'
import { useAppKit, useAppKitAccount, useAppKitNetwork, useDisconnect } from '@reown/appkit/vue'

const config = useRuntimeConfig()
const { open } = useAppKit()
const account = useAppKitAccount({ namespace: 'eip155' })
const network = useAppKitNetwork()
const { disconnect } = useDisconnect()

const hasWalletConnectProjectId = computed(() => Boolean(config.public.walletConnectProjectId))
const isBaseChain = computed(() => Number(network.value.chainId) === base.id)
const shortAddress = computed(() => {
  const address = account.value.address
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : 'Not connected'
})

const openWallet = async () => {
  if (!hasWalletConnectProjectId.value) return
  await open({ view: account.value.isConnected ? 'Account' : 'Connect', namespace: 'eip155' })
}

const switchToBase = async () => {
  await network.value.switchNetwork(base)
}
</script>

<template>
  <ClientOnly>
    <section class="panel">
      <!-- Network status -->
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="eyebrow">Network</p>
          <h2 class="mt-1 text-xl font-bold tracking-tight">Base</h2>
        </div>
        <span class="chain-badge" :class="{ 'is-live': account.isConnected && isBaseChain }">
          {{ account.isConnected && isBaseChain ? 'Ready' : 'Base only' }}
        </span>
      </div>

      <!-- Wallet info -->
      <div class="mt-4 rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-3">
        <dl class="grid gap-2.5 text-sm">
          <div class="flex items-center justify-between gap-3">
            <dt class="text-[var(--muted)] font-medium">Address</dt>
            <dd class="font-bold tabular">{{ shortAddress }}</dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-[var(--muted)] font-medium">Chain ID</dt>
            <dd class="font-bold tabular">{{ network.chainId || base.id }}</dd>
          </div>
        </dl>
      </div>

      <!-- Actions -->
      <div class="mt-4 grid gap-2">
        <button class="primary-button w-full text-sm" type="button" :disabled="!hasWalletConnectProjectId" @click="openWallet">
          <Icon name="lucide:wallet-cards" class="size-4" />
          {{ account.isConnected ? 'Manage wallet' : 'Connect wallet' }}
        </button>
        <button class="secondary-button w-full text-sm" type="button" :disabled="!account.isConnected || isBaseChain" @click="switchToBase">
          <Icon name="lucide:plug-zap" class="size-4" />
          Switch to Base
        </button>
      </div>

      <button
        v-if="account.isConnected"
        class="mt-3 w-full text-center text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition hover:text-[var(--live)]"
        type="button"
        @click="disconnect({ namespace: 'eip155' })"
      >
        Disconnect
      </button>
    </section>
  </ClientOnly>
</template>
