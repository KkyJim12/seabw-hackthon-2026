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
  { id: 'preorder-bearbrick-kaws', type: 'Pre-order', item: 'Bearbrick 1000% KAWS BFF Pastel', shop: 'Bear Form', status: 'Success', result: 'Allocation confirmed' },
  { id: 'auction-ap-royal-oak', type: 'Auction', item: 'AP Royal Oak 15500ST Blue Dial', shop: 'Dial Edit', status: 'Success', result: 'Winning bid' },
  { id: 'auction-kaws-companion', type: 'Auction', item: 'KAWS Companion Flayed Open Edition', shop: 'Bear Form', status: 'Outbid', result: 'Bid lost' },
  { id: 'preorder-supreme-box-logo', type: 'Pre-order', item: 'Supreme FW25 Box Logo Hoodie Black', shop: 'Supreme Hub', status: 'Pending', result: 'Queue review' }
]

const shortAddress = computed(() => {
  const address = account.value.address
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : 'Not connected'
})
const isBaseChain = computed(() => Number(network.value.chainId) === base.id)
const totalPreorders = computed(() => participationHistory.filter((item) => item.type === 'Pre-order').length)
const totalAuctions = computed(() => participationHistory.filter((item) => item.type === 'Auction').length)
const successfulClaims = computed(() => participationHistory.filter((item) => item.status === 'Success'))
const mintedClaims = computed(() => successfulClaims.value.filter((item) => mintedNfts.value[item.id]))
const successfulPreorders = computed(() => successfulClaims.value.filter((item) => item.type === 'Pre-order').length)
const successfulAuctions = computed(() => successfulClaims.value.filter((item) => item.type === 'Auction').length)

const handleStake = () => {
  if (stakeAmount.value <= 0 || mockUsdcBalance.value < stakeAmount.value) return
  mockUsdcBalance.value -= stakeAmount.value
  stakeUsdc(stakeAmount.value)
}

const mintRewardNft = (id: string) => {
  mintedNfts.value[id] = true
}

const statusColor = (status: string) => {
  if (status === 'Success') return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  if (status === 'Outbid') return 'bg-red-500/10 text-red-500'
  return 'bg-[var(--accent-soft)] text-[var(--accent)]'
}
</script>

<template>
  <section class="page-shell">
    <div class="grid gap-6 lg:grid-cols-[1fr_360px]">
      <!-- Main column -->
      <div>
        <p class="eyebrow">Profile</p>
        <h1 class="mt-1.5 text-4xl font-black tracking-tight sm:text-5xl">Wallet profile</h1>
        <p class="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Anti-sybil credentials used by limited drops: KYC, X reputation, and staked USDC.
        </p>

        <!-- Wallet card -->
        <section class="panel mt-8">
          <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Wallet address</p>
              <h2 class="mt-1.5 break-all text-xl font-black tracking-tight">{{ account.address || 'No wallet connected' }}</h2>
            </div>
            <span class="chain-badge shrink-0" :class="{ 'is-live': account.isConnected && isBaseChain }">
              {{ account.isConnected && isBaseChain ? 'Base ready' : 'Connect Base' }}
            </span>
          </div>
          <dl class="mt-5 grid gap-2.5 sm:grid-cols-3">
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

        <!-- Credentials -->
        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <article class="panel">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="eyebrow">KYC</p>
                <h2 class="mt-1.5 text-xl font-black tracking-tight">Sumsub verification</h2>
              </div>
              <span class="chain-badge is-live shrink-0">Verified</span>
            </div>
            <dl class="mt-4 grid gap-2.5 text-sm">
              <div class="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-2.5">
                <dt class="text-[var(--muted)]">Provider</dt>
                <dd class="font-bold">{{ kycCredential.provider }}</dd>
              </div>
              <div class="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-2.5">
                <dt class="text-[var(--muted)]">Nationality</dt>
                <dd class="font-bold">{{ kycCredential.nationality }}</dd>
              </div>
              <div class="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-2.5">
                <dt class="text-[var(--muted)]">Age</dt>
                <dd class="font-bold">{{ kycCredential.age }}</dd>
              </div>
            </dl>
          </article>

          <article class="panel">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="eyebrow">X Connect</p>
                <h2 class="mt-1.5 text-xl font-black tracking-tight">{{ xCredential.handle }}</h2>
              </div>
              <span class="chain-badge is-live shrink-0">Connected</span>
            </div>
            <dl class="mt-4 grid gap-2.5 text-sm">
              <div class="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-2.5">
                <dt class="text-[var(--muted)]">Followers</dt>
                <dd class="font-bold tabular">{{ xCredential.followers.toLocaleString() }}</dd>
              </div>
              <div class="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-2.5">
                <dt class="text-[var(--muted)]">Account age</dt>
                <dd class="font-bold">{{ xCredential.accountAgeMonths }} months</dd>
              </div>
              <div class="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-2.5">
                <dt class="text-[var(--muted)]">Signal</dt>
                <dd class="font-bold">Reputation pass</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-4">
        <!-- USDC balance -->
        <section class="panel">
          <p class="eyebrow">Balance</p>
          <p class="mt-2 text-4xl font-black tracking-tight tabular">{{ formattedUsdc }}</p>
          <p class="mt-0.5 text-sm text-[var(--muted)]">Mock USDC</p>
          <button class="primary-button mt-5 w-full text-sm" type="button" @click="mintMockUsdc()">
            <Icon name="lucide:coins" class="size-4" />
            Mint 1,000 mock USDC
          </button>
          <button
            class="secondary-button mt-2 w-full text-sm"
            type="button"
            @click="open({ view: account.isConnected ? 'Account' : 'Connect', namespace: 'eip155' })"
          >
            <Icon name="lucide:wallet" class="size-4" />
            {{ account.isConnected ? 'Manage wallet' : 'Connect wallet' }}
          </button>
        </section>

        <!-- Stake USDC -->
        <section class="panel">
          <p class="eyebrow">Staking</p>
          <h2 class="mt-1.5 text-xl font-black tracking-tight">Stake USDC</h2>
          <p class="mt-2 text-sm leading-6 text-[var(--muted)]">High-value drops require a staked USDC threshold to participate.</p>
          <div class="mt-4 rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-3.5">
            <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Currently staked</p>
            <p class="mt-0.5 text-2xl font-black tracking-tight tabular">{{ stakedUsdc.toLocaleString() }} USDC</p>
          </div>
          <label class="form-field mt-4">
            <span>Stake amount</span>
            <input v-model.number="stakeAmount" class="input tabular" min="1" type="number">
          </label>
          <button
            class="primary-button mt-3 w-full text-sm"
            type="button"
            :disabled="mockUsdcBalance < stakeAmount"
            @click="handleStake"
          >
            <Icon name="lucide:lock-keyhole" class="size-4" />
            Stake mock USDC
          </button>
        </section>
      </aside>
    </div>

    <!-- Participation history -->
    <section class="panel mt-6">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p class="eyebrow">History</p>
          <h2 class="mt-1.5 text-2xl font-black tracking-tight">Drop participation</h2>
        </div>
        <span class="tag">{{ participationHistory.length }} total</span>
      </div>

      <dl class="mt-5 grid gap-2.5 sm:grid-cols-4">
        <div class="metric">
          <dt>Pre-order</dt>
          <dd>{{ totalPreorders }}</dd>
        </div>
        <div class="metric">
          <dt>Auction</dt>
          <dd>{{ totalAuctions }}</dd>
        </div>
        <div class="metric">
          <dt>Won Pre</dt>
          <dd>{{ successfulPreorders }}</dd>
        </div>
        <div class="metric">
          <dt>Won Auc</dt>
          <dd>{{ successfulAuctions }}</dd>
        </div>
      </dl>

      <div class="mt-5 overflow-hidden rounded-xl border border-[var(--line)]">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[820px] text-left text-sm">
            <thead class="border-b border-[var(--line)] bg-[var(--panel-soft)]">
              <tr>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Item</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Type</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Shop</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Status</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Result</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">NFT</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="history in participationHistory"
                :key="history.id"
                class="border-t border-[var(--line)] transition hover:bg-[var(--panel-soft)]"
              >
                <td class="px-5 py-4 font-bold">{{ history.item }}</td>
                <td class="px-5 py-4"><span class="tag">{{ history.type }}</span></td>
                <td class="px-5 py-4 text-[var(--muted)]">{{ history.shop }}</td>
                <td class="px-5 py-4">
                  <span class="rounded-md px-2 py-1 text-xs font-black uppercase tracking-widest" :class="statusColor(history.status)">
                    {{ history.status }}
                  </span>
                </td>
                <td class="px-5 py-4 text-[var(--muted)]">{{ history.result }}</td>
                <td class="px-5 py-4">
                  <button
                    v-if="history.status === 'Success' && !mintedNfts[history.id]"
                    class="primary-button min-h-8 px-3 text-xs"
                    type="button"
                    @click="mintRewardNft(history.id)"
                  >
                    <Icon name="lucide:badge-plus" class="size-3.5" />
                    Mint
                  </button>
                  <span v-else-if="mintedNfts[history.id]" class="tag">Minted</span>
                  <span v-else class="text-xs text-[var(--muted)]">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Minted NFT badges -->
    <section class="panel mt-5">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p class="eyebrow">Proof NFTs</p>
          <h2 class="mt-1.5 text-2xl font-black tracking-tight">Drop badges</h2>
          <p class="mt-1.5 text-sm text-[var(--muted)]">Minted on-chain proof of participation — unlocked from the history table.</p>
        </div>
        <span class="tag">{{ mintedClaims.length }} minted</span>
      </div>

      <div v-if="mintedClaims.length" class="mt-5 grid gap-4 md:grid-cols-3">
        <article
          v-for="claim in mintedClaims"
          :key="claim.id"
          class="rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-5"
        >
          <div
            class="grid size-12 place-items-center rounded-xl text-white"
            style="background: var(--accent); box-shadow: 0 4px 16px var(--accent-glow)"
          >
            <Icon name="lucide:badge-check" class="size-6" />
          </div>
          <span class="tag mt-4 inline-flex">{{ claim.type }}</span>
          <h3 class="mt-3 text-base font-black tracking-tight leading-snug">{{ claim.item }}</h3>
          <p class="mt-1.5 text-xs text-[var(--muted)]">Proof badge · {{ claim.shop }}</p>
        </article>
      </div>
      <div
        v-else
        class="mt-5 rounded-xl border border-dashed border-[var(--line)] bg-[var(--panel-soft)] p-8 text-center text-sm text-[var(--muted)]"
      >
        No proof badges yet. Mint from a successful row above.
      </div>
    </section>
  </section>
</template>
