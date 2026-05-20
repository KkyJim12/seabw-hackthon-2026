<script setup lang="ts">
const { shops } = useMarketData()
</script>

<template>
  <section class="page-shell">
    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="eyebrow">Marketplace</p>
        <h1 class="mt-1.5 text-4xl font-black tracking-tight sm:text-5xl">Browse shops</h1>
        <p class="mt-3 max-w-xl text-base leading-7 text-[var(--muted)]">
          Discover authenticated limited-item sellers — Bearbrick, AP watches, Supreme drops, and sneaker collabs.
        </p>
      </div>
      <NuxtLink class="secondary-button w-fit shrink-0 text-sm" to="/preorder">
        <Icon name="lucide:layout-grid" class="size-4" />
        All drops
      </NuxtLink>
    </div>

    <!-- Shop grid -->
    <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <article v-for="shop in shops" :key="shop.id" class="product-card">
        <!-- Shop image with category overlay -->
        <div class="relative overflow-hidden">
          <img
            class="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            :src="shop.image"
            :alt="shop.name"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div class="absolute bottom-3 left-3">
            <span class="tag">{{ shop.category }}</span>
          </div>
          <NuxtLink
            class="absolute top-3 right-3 flex size-8 items-center justify-center rounded-lg border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
            :to="`/shop-info/${shop.id}`"
            :aria-label="`Open ${shop.name}`"
          >
            <Icon name="lucide:arrow-up-right" class="size-4" />
          </NuxtLink>
        </div>

        <!-- Shop info -->
        <div class="p-5">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <h2 class="text-xl font-black tracking-tight">{{ shop.name }}</h2>
              <p class="mt-0.5 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{{ shop.handle }}</p>
            </div>
          </div>
          <p class="mt-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{{ shop.description }}</p>

          <dl class="mt-4 grid grid-cols-3 gap-2">
            <div class="metric">
              <dt>Pre</dt>
              <dd>{{ shop.preorderCount }}</dd>
            </div>
            <div class="metric">
              <dt>Auc</dt>
              <dd>{{ shop.auctionCount }}</dd>
            </div>
            <div class="metric">
              <dt>Sales</dt>
              <dd>{{ shop.sales }}</dd>
            </div>
          </dl>

          <NuxtLink class="primary-button mt-4 w-full text-sm" :to="`/shop-info/${shop.id}`">
            Enter shop
            <Icon name="lucide:arrow-right" class="size-4" />
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>
