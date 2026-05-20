<script setup lang="ts">
import { base } from '@reown/appkit/networks'
import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/vue'

const { open } = useAppKit()
const account = useAppKitAccount({ namespace: 'eip155' })
const network = useAppKitNetwork()
const walletAddress = computed(() => account.value.address)
const { mockUsdcBalance, formattedUsdc, mintMockUsdc } = useMockUsdc(walletAddress)
const { kycCredential, xCredential, stakedUsdc, stakeUsdc } = useSybilCredentials()
const stakeAmount = ref(250)
const mintedNfts = ref<Record<string, boolean>>({})

const participationHistory = [
  { id: 'preorder-hermes-birkin', type: 'Pre-order', item: 'Hermes Birkin 25 Gold Togo', shop: 'Maison Vault', status: 'Success', result: 'Allocation confirmed' },
  { id: 'auction-rolex-daytona', type: 'Auction', item: 'Rolex Daytona Panda 116500LN', shop: 'Crown Time', status: 'Success', result: 'Winning bid' },
  { id: 'auction-patek-nautilus', type: 'Auction', item: 'Patek Philippe Nautilus Blue Dial', shop: 'Crown Time', status: 'Outbid', result: 'Bid lost' },
  { id: 'preorder-cartier-love', type: 'Pre-order', item: 'Cartier Love Bracelet White Gold', shop: 'Blue Chip Jewels', status: 'Pending', result: 'Queue review' }
]

const shortAddress = computed(() => {
  const address = account.value.address

  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'
})
const isBaseChain = computed(() => Number(network.value.chainId) === base.id)
const totalPreorders = computed(() => participationHistory.filter((item) => item.type === 'Pre-order').length)
const totalAuctions = computed(() => participationHistory.filter((item) => item.type === 'Auction').length)
const successfulClaims = computed(() => participationHistory.filter((item) => item.status === 'Success'))
const mintedClaims = computed(() => successfulClaims.value.filter((item) => mintedNfts.value[item.id]))
const successfulPreorders = computed(() => successfulClaims.value.filter((item) => item.type === 'Pre-order').length)
const successfulAuctions = computed(() => successfulClaims.value.filter((item) => item.type === 'Auction').length)

const handleStake = () => {
  if (stakeAmount.value <= 0 || mockUsdcBalance.value < stakeAmount.value) {
    return
  }

  mockUsdcBalance.value -= stakeAmount.value
  stakeUsdc(stakeAmount.value)
}

const mintRewardNft = (id: string) => {
  mintedNfts.value[id] = true
}
</script>

<template>
  <section class="page-shell">
    <div class="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div>
        <p class="eyebrow">Profile</p>
        <h1 class="mt-2 text-4xl font-semibold sm:text-5xl">Wallet profile</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          View wallet details and anti-sybil credentials used by luxury drops: KYC, X reputation, and staked USDC.
        </p>

        <section class="panel mt-8">
          <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p class="text-sm text-[var(--muted)]">Wallet address</p>
              <h2 class="mt-2 break-all text-2xl font-semibold">{{ account.address || 'No wallet connected' }}</h2>
            </div>
            <span class="chain-badge" :class="{ 'is-live': account.isConnected && isBaseChain }">
              {{ account.isConnected && isBaseChain ? 'Base ready' : 'Connect Base' }}
            </span>
          </div>

          <dl class="mt-6 grid gap-3 sm:grid-cols-3">
            <div class="metric">
              <dt>Status</dt>
              <dd>{{ account.isConnected ? 'Live' : 'Off' }}</dd>
            </div>
            <div class="metric">
              <dt>Address</dt>
              <dd>{{ shortAddress }}</dd>
            </div>
            <div class="metric">
              <dt>Chain</dt>
              <dd>{{ network.chainId || base.id }}</dd>
            </div>
          </dl>
        </section>

        <section class="mt-6 grid gap-5 md:grid-cols-2">
          <article class="panel">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="eyebrow">KYC</p>
                <h2 class="mt-2 text-2xl font-semibold">Sumsub verification</h2>
              </div>
              <span class="chain-badge is-live">Verified</span>
            </div>
            <dl class="mt-5 grid gap-3 text-sm">
              <div class="flex items-center justify-between gap-3">
                <dt class="text-[var(--muted)]">Provider</dt>
                <dd class="font-semibold">{{ kycCredential.provider }}</dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt class="text-[var(--muted)]">Nationality</dt>
                <dd class="font-semibold">{{ kycCredential.nationality }}</dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt class="text-[var(--muted)]">Age</dt>
                <dd class="font-semibold">{{ kycCredential.age }}</dd>
              </div>
            </dl>
          </article>

          <article class="panel">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="eyebrow">X Connect</p>
                <h2 class="mt-2 text-2xl font-semibold">{{ xCredential.handle }}</h2>
              </div>
              <span class="chain-badge is-live">Connected</span>
            </div>
            <dl class="mt-5 grid gap-3 text-sm">
              <div class="flex items-center justify-between gap-3">
                <dt class="text-[var(--muted)]">Followers</dt>
                <dd class="font-semibold">{{ xCredential.followers.toLocaleString() }}</dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt class="text-[var(--muted)]">Account age</dt>
                <dd class="font-semibold">{{ xCredential.accountAgeMonths }} months</dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt class="text-[var(--muted)]">Signal</dt>
                <dd class="font-semibold">Reputation pass</dd>
              </div>
            </dl>
          </article>
        </section>
      </div>

      <aside class="space-y-5">
        <section class="panel">
          <p class="text-sm text-[var(--muted)]">Mock USDC balance</p>
          <p class="mt-2 text-4xl font-semibold">{{ formattedUsdc }}</p>
          <p class="mt-1 text-[var(--muted)]">USDC</p>
          <button class="primary-button mt-5 w-full" type="button" @click="mintMockUsdc()">
            <Icon name="lucide:coins" class="size-5" />
            Mint 1,000 mock USDC
          </button>
          <button class="secondary-button mt-3 w-full" type="button" @click="open({ view: account.isConnected ? 'Account' : 'Connect', namespace: 'eip155' })">
            <Icon name="lucide:wallet" class="size-5" />
            {{ account.isConnected ? 'Manage wallet' : 'Connect wallet' }}
          </button>
        </section>

        <section class="panel">
          <p class="eyebrow">Stake Page</p>
          <h2 class="mt-2 text-2xl font-semibold">Stake USDC</h2>
          <p class="mt-3 text-[var(--muted)]">Some high-value auctions and pre-orders require a staked USDC threshold.</p>
          <div class="mt-5 rounded-2xl bg-[var(--panel-soft)] p-4">
            <p class="text-sm text-[var(--muted)]">Currently staked</p>
            <p class="mt-1 text-3xl font-semibold">{{ stakedUsdc.toLocaleString() }} USDC</p>
          </div>
          <label class="form-field mt-5">
            <span>Stake amount</span>
            <input v-model.number="stakeAmount" class="input" min="1" type="number">
          </label>
          <button class="primary-button mt-3 w-full" type="button" :disabled="mockUsdcBalance < stakeAmount" @click="handleStake">
            <Icon name="lucide:lock-keyhole" class="size-5" />
            Stake mock USDC
          </button>
        </section>
      </aside>
    </div>

    <section class="panel mt-6">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p class="eyebrow">Participation</p>
          <h2 class="mt-2 text-2xl font-semibold">Auction and pre-order history</h2>
        </div>
        <span class="tag">{{ participationHistory.length }} total</span>
      </div>

      <dl class="mt-6 grid gap-3 sm:grid-cols-4">
        <div class="metric">
          <dt>Pre-order</dt>
          <dd>{{ totalPreorders }}</dd>
        </div>
        <div class="metric">
          <dt>Auction</dt>
          <dd>{{ totalAuctions }}</dd>
        </div>
        <div class="metric">
          <dt>Success Pre</dt>
          <dd>{{ successfulPreorders }}</dd>
        </div>
        <div class="metric">
          <dt>Success Auc</dt>
          <dd>{{ successfulAuctions }}</dd>
        </div>
      </dl>

      <div class="mt-6 overflow-hidden rounded-2xl border border-[var(--line)]">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[820px] text-left">
            <thead class="bg-[var(--panel-soft)] text-sm uppercase text-[var(--muted)]">
              <tr>
                <th class="px-5 py-4">Item</th>
                <th class="px-5 py-4">Type</th>
                <th class="px-5 py-4">Shop</th>
                <th class="px-5 py-4">Status</th>
                <th class="px-5 py-4">Result</th>
                <th class="px-5 py-4">NFT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="history in participationHistory" :key="history.id" class="border-t border-[var(--line)]">
                <td class="px-5 py-4 font-semibold">{{ history.item }}</td>
                <td class="px-5 py-4"><span class="tag">{{ history.type }}</span></td>
                <td class="px-5 py-4">{{ history.shop }}</td>
                <td class="px-5 py-4">{{ history.status }}</td>
                <td class="px-5 py-4 text-[var(--muted)]">{{ history.result }}</td>
                <td class="px-5 py-4">
                  <button
                    v-if="history.status === 'Success' && !mintedNfts[history.id]"
                    class="primary-button min-h-10 px-3"
                    type="button"
                    @click="mintRewardNft(history.id)"
                  >
                    <Icon name="lucide:badge-plus" class="size-4" />
                    Mint
                  </button>
                  <span v-else-if="mintedNfts[history.id]" class="tag">Minted</span>
                  <span v-else class="text-sm text-[var(--muted)]">Not eligible</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="panel mt-6">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p class="eyebrow">Minted NFT</p>
          <h2 class="mt-2 text-2xl font-semibold">Proof badges</h2>
          <p class="mt-2 text-[var(--muted)]">Minted proof NFTs appear here as badges after claiming from the history table.</p>
        </div>
        <span class="tag">{{ mintedClaims.length }} minted</span>
      </div>

      <div v-if="mintedClaims.length" class="mt-6 grid gap-4 md:grid-cols-3">
        <article v-for="claim in mintedClaims" :key="claim.id" class="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-5">
          <div class="grid size-14 place-items-center rounded-2xl bg-[#0052ff] text-white">
            <Icon name="lucide:badge-check" class="size-7" />
          </div>
          <span class="tag mt-5 inline-flex">{{ claim.type }} badge</span>
          <h3 class="mt-4 text-xl font-semibold">{{ claim.item }}</h3>
          <p class="mt-2 text-sm text-[var(--muted)]">Minted proof from {{ claim.shop }}</p>
        </article>
      </div>
      <div v-else class="mt-6 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--panel-soft)] p-6 text-[var(--muted)]">
        No proof NFTs minted yet. Mint from a successful row in the history table.
      </div>
    </section>
  </section>
</template>
