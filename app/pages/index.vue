<script setup lang="ts">
const { preorders, auctions } = useMarketData()
const highlightPreorder = preorders[0]
const highlightAuction = auctions[0]
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-[var(--line)]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(0,82,255,0.24),transparent_32%),linear-gradient(135deg,rgba(13,67,184,0.16),transparent_44%)]" />
      <div class="relative mx-auto grid min-h-[620px] max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div class="flex flex-col justify-center py-10 lg:py-16">
          <div class="mb-5 flex w-fit items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-200">
            <Icon name="lucide:radio" class="size-4" />
            Base-native luxury drops and authenticated auctions
          </div>
          <h1 class="max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            Luxury brand pre-orders and auctions in one blue-chip market.
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Browse authenticated luxury shops, reserve incoming brand-name pieces, and bid on rare watches, handbags, jewelry, and sneakers with wallet flows set to Base.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <NuxtLink class="primary-button" to="/shop">
              <Icon name="lucide:shopping-bag" class="size-5" />
              Create shop
            </NuxtLink>
            <NuxtLink class="secondary-button" to="/auction">
              <Icon name="lucide:gavel" class="size-5" />
              View live auction
            </NuxtLink>
          </div>

          <dl class="mt-12 grid max-w-2xl grid-cols-3 gap-3">
            <div class="metric">
              <dt>GMV</dt>
              <dd>$4.8M</dd>
            </div>
            <div class="metric">
              <dt>Creators</dt>
              <dd>1.2K</dd>
            </div>
            <div class="metric">
              <dt>Fill rate</dt>
              <dd>94%</dd>
            </div>
          </dl>
        </div>

        <div class="flex items-end pb-8 lg:pb-12">
          <div class="w-full rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-3 shadow-2xl shadow-blue-950/10 backdrop-blur">
            <div class="relative overflow-hidden rounded-[1.45rem]">
              <img class="h-[420px] w-full object-cover" :src="highlightAuction.image" :alt="highlightAuction.title">
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                <div class="flex items-end justify-between gap-4">
                  <div>
                    <p class="text-sm text-blue-200">Highlight Auction</p>
                    <h2 class="mt-1 text-3xl font-semibold">{{ highlightAuction.title }}</h2>
                  </div>
                  <div class="rounded-2xl bg-white/14 px-4 py-3 text-right backdrop-blur">
                    <p class="text-xs text-white/70">Current bid</p>
                    <p class="text-2xl font-semibold">{{ highlightAuction.bid }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="page-shell grid gap-6 lg:grid-cols-2">
      <article class="product-card">
        <img class="h-72 w-full object-cover" :src="highlightPreorder.image" :alt="highlightPreorder.title">
        <div class="p-5">
          <p class="eyebrow">Highlight Pre-order</p>
          <div class="mt-3 flex items-start justify-between gap-4">
            <div>
              <h2 class="text-3xl font-semibold">{{ highlightPreorder.title }}</h2>
              <p class="mt-2 text-[var(--muted)]">{{ highlightPreorder.maker }} · {{ highlightPreorder.status }}</p>
            </div>
            <span class="tag">{{ highlightPreorder.price }}</span>
          </div>
          <div class="mt-6 h-2 overflow-hidden rounded-full bg-[var(--track)]">
            <div class="h-full rounded-full bg-[#0052ff]" :style="{ width: `${highlightPreorder.progress}%` }" />
          </div>
          <NuxtLink class="primary-button mt-6" to="/preorder">
            <Icon name="lucide:package-check" class="size-5" />
            Reserve now
          </NuxtLink>
        </div>
      </article>

      <article class="product-card">
        <img class="h-72 w-full object-cover" :src="highlightAuction.image" :alt="highlightAuction.title">
        <div class="p-5">
          <p class="eyebrow">Highlight Auction</p>
          <div class="mt-3 flex items-start justify-between gap-4">
            <div>
              <h2 class="text-3xl font-semibold">{{ highlightAuction.title }}</h2>
              <p class="mt-2 text-[var(--muted)]">{{ highlightAuction.bidCount }} bids · {{ highlightAuction.status }}</p>
            </div>
            <span class="tag">{{ highlightAuction.bid }}</span>
          </div>
          <NuxtLink class="primary-button mt-6" to="/auction">
            <Icon name="lucide:gavel" class="size-5" />
            Enter auction
          </NuxtLink>
        </div>
      </article>
    </section>
  </div>
</template>
