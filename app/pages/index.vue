<script setup lang="ts">
const { preorders, auctions } = useMarketData()
const highlightPreorder = preorders[0]!
const highlightAuction = auctions[0]!
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-[var(--line)]">
      <!-- Dot grid background -->
      <div class="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(26,94,255,0.13)_1px,transparent_1px)] [background-size:26px_26px]" />
      <!-- Radial glow -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_62%_-15%,rgba(26,94,255,0.18),transparent)]" />

      <div class="relative mx-auto grid min-h-[600px] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <!-- Left: editorial copy -->
        <div class="flex flex-col justify-center py-8 lg:py-14">
          <div
            class="mb-6 inline-flex w-fit items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest"
            style="color: var(--accent)"
          >
            <span class="live-dot" />
            Live drops · Base-native settlement
          </div>

          <h1 class="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-[4.5rem]">
            The Drop Market<br>
            <span style="color: var(--accent)">for Collectors.</span>
          </h1>

          <p class="mt-6 max-w-lg text-base leading-7 text-[var(--muted)]">
            Pre-order upcoming limited releases and bid on authenticated drops — Bearbrick, AP watches, Supreme collabs, and Nike collab sneakers. Settled on Base.
          </p>

          <div class="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <NuxtLink class="primary-button" to="/preorder">
              <Icon name="lucide:package-check" class="size-4" />
              Browse drops
            </NuxtLink>
            <NuxtLink class="secondary-button" to="/auction">
              <Icon name="lucide:gavel" class="size-4" />
              Live auction
            </NuxtLink>
          </div>

          <dl class="mt-10 grid max-w-sm grid-cols-3 gap-2.5">
            <div class="metric">
              <dt>Volume</dt>
              <dd>$20M+</dd>
            </div>
            <div class="metric">
              <dt>Drops</dt>
              <dd>2.8K</dd>
            </div>
            <div class="metric">
              <dt>Fill rate</dt>
              <dd>94%</dd>
            </div>
          </dl>
        </div>

        <!-- Right: featured auction card -->
        <div class="flex items-end pb-8 lg:pb-14">
          <div
            class="w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]"
            style="box-shadow: 0 24px 80px rgba(0,8,50,0.12)"
          >
            <div class="relative">
              <img
                class="h-[380px] w-full object-cover"
                :src="highlightAuction.image"
                :alt="highlightAuction.title"
              >
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/88 via-black/40 to-transparent p-5 text-white">
                <div class="flex items-end justify-between gap-3">
                  <div class="min-w-0">
                    <div class="tag-live mb-2">
                      <span class="live-dot" />
                      Live Auction · {{ highlightAuction.status }}
                    </div>
                    <h2 class="truncate text-xl font-black tracking-tight">{{ highlightAuction.title }}</h2>
                    <p class="mt-0.5 text-sm text-white/60">{{ highlightAuction.bidCount }} bids · {{ highlightAuction.maker }}</p>
                  </div>
                  <div class="shrink-0 rounded-xl border border-white/12 bg-white/10 px-3.5 py-3 text-right backdrop-blur">
                    <p class="text-xs font-bold uppercase tracking-widest text-white/55">Current bid</p>
                    <p class="mt-0.5 text-2xl font-black tabular">{{ highlightAuction.bid }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spotlight drops -->
    <section class="page-shell">
      <div class="mb-6 flex items-center justify-between gap-4">
        <div>
          <p class="eyebrow">Spotlight</p>
          <h2 class="mt-1 text-2xl font-black tracking-tight">Featured drops</h2>
        </div>
        <NuxtLink class="secondary-button text-sm" to="/shop">
          View all shops
          <Icon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
      </div>

      <div class="grid gap-5 lg:grid-cols-2">
        <!-- Highlight pre-order -->
        <article class="product-card">
          <div class="relative overflow-hidden">
            <img class="h-64 w-full object-cover" :src="highlightPreorder.image" :alt="highlightPreorder.title">
            <!-- Allocation bar at bottom of image -->
            <div class="absolute inset-x-0 bottom-0 h-1 bg-black/20">
              <div class="h-full transition-all duration-700" style="background: var(--accent)" :style="{ width: `${highlightPreorder.progress}%` }" />
            </div>
            <div class="absolute top-3 left-3">
              <span class="tag">Pre-order</span>
            </div>
            <div class="absolute top-3 right-3 rounded-lg border border-white/12 bg-black/55 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
              {{ highlightPreorder.status }}
            </div>
          </div>
          <div class="p-5">
            <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{{ highlightPreorder.maker }}</p>
            <h3 class="mt-1.5 text-xl font-black tracking-tight leading-snug">{{ highlightPreorder.title }}</h3>
            <div class="mt-4">
              <div class="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wide">
                <span class="text-[var(--muted)]">{{ highlightPreorder.reserved }}/{{ highlightPreorder.cap }} reserved</span>
                <span style="color: var(--accent)">{{ highlightPreorder.progress }}%</span>
              </div>
              <div class="h-1.5 overflow-hidden rounded-full bg-[var(--track)]">
                <div class="h-full rounded-full transition-all" style="background: var(--accent)" :style="{ width: `${highlightPreorder.progress}%` }" />
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Price</p>
                <p class="mt-0.5 text-2xl font-black tracking-tight tabular">{{ highlightPreorder.price }}</p>
              </div>
              <NuxtLink class="primary-button text-sm" to="/preorder">
                Reserve now
                <Icon name="lucide:arrow-right" class="size-4" />
              </NuxtLink>
            </div>
          </div>
        </article>

        <!-- Highlight auction -->
        <article class="product-card">
          <div class="relative overflow-hidden">
            <img class="h-64 w-full object-cover" :src="highlightAuction.image" :alt="highlightAuction.title">
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div class="flex items-center justify-between">
                <div class="tag-live">
                  <span class="live-dot" />
                  {{ highlightAuction.status }}
                </div>
                <span class="text-sm font-bold text-white/70">{{ highlightAuction.bidCount }} bids</span>
              </div>
            </div>
          </div>
          <div class="p-5">
            <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{{ highlightAuction.maker }}</p>
            <h3 class="mt-1.5 text-xl font-black tracking-tight leading-snug">{{ highlightAuction.title }}</h3>
            <div class="mt-4 rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
              <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Current bid</p>
              <p class="mt-0.5 text-3xl font-black tracking-tight tabular">{{ highlightAuction.bid }}</p>
            </div>
            <div class="mt-5 flex items-center justify-end">
              <NuxtLink class="primary-button text-sm" to="/auction">
                Enter auction
                <Icon name="lucide:gavel" class="size-4" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
