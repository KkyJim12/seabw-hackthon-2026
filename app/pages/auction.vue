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
    <!-- Page header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="eyebrow">Live market</p>
        <h1 class="mt-1.5 text-4xl font-black tracking-tight sm:text-5xl">Auction lots</h1>
        <p class="mt-3 max-w-xl text-base leading-7 text-[var(--muted)]">
          Bid on authenticated limited pieces — AP Royal Oak, KAWS figures, and archive Supreme collabs with real-time Base settlement.
        </p>
      </div>
      <div class="tag-live w-fit shrink-0">
        <span class="live-dot" />
        {{ auctions.length }} live lots
      </div>
    </div>

    <!-- Auction grid -->
    <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="item in auctions" :key="item.id" class="product-card">
        <!-- Image with live overlay -->
        <div class="relative overflow-hidden">
          <img class="h-60 w-full object-cover" :src="item.image" :alt="item.title">
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent p-4">
            <div class="flex items-center justify-between">
              <div class="tag-live">
                <span class="live-dot" />
                {{ item.status }}
              </div>
              <span class="text-sm font-bold text-white/65">{{ item.bidCount }} bids</span>
            </div>
          </div>
        </div>

        <!-- Lot info -->
        <div class="p-5">
          <div class="flex items-center justify-between gap-2">
            <span class="tag">Auction</span>
            <span class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{{ item.maker }}</span>
          </div>

          <h2 class="mt-3 text-lg font-black tracking-tight leading-snug">{{ item.title }}</h2>

          <!-- Current bid highlight -->
          <div class="mt-4 rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-3.5">
            <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Current bid</p>
            <p class="mt-0.5 text-3xl font-black tracking-tight tabular">{{ item.bid }}</p>
          </div>

          <!-- Requirements -->
          <div
            v-if="requirementLabels(item.requirement).length"
            class="mt-4 rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-3"
          >
            <p class="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Required to bid</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="label in requirementLabels(item.requirement)" :key="label" class="tag">{{ label }}</span>
            </div>
          </div>

          <!-- Shop link -->
          <div class="mt-4 flex justify-end">
            <NuxtLink class="secondary-button text-sm" :to="`/shop-info/${item.shopId}`">
              <Icon name="lucide:store" class="size-4" />
              Shop
            </NuxtLink>
          </div>

          <!-- Bid action -->
          <div class="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <input
              v-model.number="bidById[item.id]"
              class="input tabular"
              min="1"
              step="10"
              type="number"
              aria-label="Bid amount"
            >
            <button
              class="primary-button text-sm"
              type="button"
              :disabled="!canParticipate(item.requirement)"
            >
              <Icon
                :name="canParticipate(item.requirement) ? 'lucide:gavel' : 'lucide:lock'"
                class="size-4"
              />
              {{ canParticipate(item.requirement) ? 'Bid' : 'Locked' }}
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
