<script setup lang="ts">
const { auctions } = useMarketData()
const { requirementLabels, canParticipate } = useSybilCredentials()
const bidById = reactive<Record<string, number>>({})

for (const item of auctions) {
  bidById[item.id] = Number(item.bid.replace(/[$,]/g, '')) + 20
}
</script>

<template>
  <section class="page-shell">
    <p class="eyebrow">Auction Page</p>
    <h1 class="mt-2 text-4xl font-semibold sm:text-5xl">All auction products</h1>
    <p class="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
      A live marketplace of rare luxury lots from every shop, with current bids, time remaining, and shop-level discovery.
    </p>

    <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="item in auctions" :key="item.id" class="product-card">
        <img class="h-64 w-full object-cover" :src="item.image" :alt="item.title">
        <div class="p-5">
          <div class="flex items-center justify-between gap-3">
            <span class="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-bold text-blue-700 dark:text-blue-200">{{ item.status }}</span>
            <span class="text-sm font-bold text-[var(--muted)]">{{ item.maker }}</span>
          </div>
          <h2 class="mt-4 text-2xl font-semibold">{{ item.title }}</h2>
          <div class="mt-5 flex items-end justify-between gap-3">
            <div>
              <p class="text-sm text-[var(--muted)]">Current bid</p>
              <p class="text-3xl font-semibold">{{ item.bid }}</p>
              <p class="mt-1 text-sm text-[var(--muted)]">{{ item.bidCount }} bids</p>
            </div>
            <NuxtLink class="secondary-button" :to="`/shop-info/${item.shopId}`">
              <Icon name="lucide:store" class="size-5" />
              Shop
            </NuxtLink>
          </div>
          <div v-if="requirementLabels(item.requirement).length" class="mt-4 rounded-2xl bg-[var(--panel-soft)] p-3">
            <p class="text-xs font-bold uppercase text-[var(--muted)]">Required verification</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span v-for="label in requirementLabels(item.requirement)" :key="label" class="tag">{{ label }}</span>
            </div>
          </div>
          <div class="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <input v-model.number="bidById[item.id]" class="input" min="1" step="10" type="number" aria-label="Bid amount">
            <button class="primary-button" type="button" :disabled="!canParticipate(item.requirement)">
              <Icon :name="canParticipate(item.requirement) ? 'lucide:gavel' : 'lucide:shield-alert'" class="size-5" />
              {{ canParticipate(item.requirement) ? 'Bid' : 'Locked' }}
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
