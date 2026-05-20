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

  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'
})

const openWallet = async () => {
  if (!hasWalletConnectProjectId.value) {
    return
  }

  await open({ view: account.value.isConnected ? 'Account' : 'Connect', namespace: 'eip155' })
}

const switchToBase = async () => {
  await network.value.switchNetwork(base)
}
</script>

<template>
  <ClientOnly>
    <section class="panel">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm text-[var(--muted)]">Wallet network</p>
          <h2 class="mt-1 text-2xl font-semibold">Base</h2>
        </div>
        <span class="chain-badge" :class="{ 'is-live': account.isConnected && isBaseChain }">
          {{ account.isConnected && isBaseChain ? 'Ready' : 'Base only' }}
        </span>
      </div>

      <div class="mt-5 grid gap-3">
        <button class="primary-button w-full" type="button" :disabled="!hasWalletConnectProjectId" @click="openWallet">
          <Icon name="lucide:wallet-cards" class="size-5" />
          {{ account.isConnected ? 'Manage wallet' : 'Connect wallet' }}
        </button>
        <button class="secondary-button w-full" type="button" :disabled="!account.isConnected || isBaseChain" @click="switchToBase">
          <Icon name="lucide:plug-zap" class="size-5" />
          Switch to Base
        </button>
      </div>

      <div class="mt-5 rounded-2xl bg-[var(--panel-soft)] p-4">
        <dl class="grid gap-3 text-sm">
          <div class="flex items-center justify-between gap-3">
            <dt class="text-[var(--muted)]">Address</dt>
            <dd class="font-semibold">{{ shortAddress }}</dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-[var(--muted)]">Chain ID</dt>
            <dd class="font-semibold">{{ network.chainId || base.id }}</dd>
          </div>
        </dl>
      </div>

      <button v-if="account.isConnected" class="mt-4 text-sm font-bold text-[var(--muted)] underline underline-offset-4" type="button" @click="disconnect({ namespace: 'eip155' })">
        Disconnect
      </button>
    </section>
  </ClientOnly>
</template>
