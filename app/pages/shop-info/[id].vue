<script setup lang="ts">
const route = useRoute()
const { shops, preorders, auctions } = useMarketData()
const shop = computed(() => shops.find((item) => item.id === route.params.id) || shops[0])
const shopPreorders = computed(() => preorders.filter((item) => item.shopId === shop.value.id))
const shopAuctions = computed(() => auctions.filter((item) => item.shopId === shop.value.id))
</script>

<template>
  <section class="page-shell">
    <div class="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div class="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)]">
        <img class="h-80 w-full object-cover" :src="shop.image" :alt="shop.name">
        <div class="p-6">
          <p class="eyebrow">Shop Info Page</p>
          <h1 class="mt-2 text-4xl font-semibold sm:text-5xl">{{ shop.name }}</h1>
          <p class="mt-3 text-[var(--muted)]">{{ shop.handle }} &middot; {{ shop.category }}</p>
          <p class="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{{ shop.description }}</p>
        </div>
      </div>

      <aside class="space-y-5">
        <WalletPanel />
        <dl class="grid grid-cols-3 gap-3 lg:grid-cols-1">
          <div class="metric">
            <dt>Pre-order</dt>
            <dd>{{ shop.preorderCount }}</dd>
          </div>
          <div class="metric">
            <dt>Auction</dt>
            <dd>{{ shop.auctionCount }}</dd>
          </div>
          <div class="metric">
            <dt>Sales</dt>
            <dd>{{ shop.sales }}</dd>
          </div>
        </dl>
      </aside>
    </div>

    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <section>
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-2xl font-semibold">Pre-order</h2>
          <Icon name="lucide:package-check" class="size-6 text-blue-500" />
        </div>
        <div class="grid gap-4">
          <NuxtLink v-for="item in shopPreorders" :key="item.id" class="product-card" to="/preorder">
            <img class="h-52 w-full object-cover" :src="item.image" :alt="item.title">
            <div class="p-5">
              <span class="tag">{{ item.status }}</span>
              <h3 class="mt-4 text-2xl font-semibold">{{ item.title }}</h3>
              <p class="mt-2 text-[var(--muted)]">{{ item.reserved }} reserved &middot; {{ item.price }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section>
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-2xl font-semibold">Auction</h2>
          <Icon name="lucide:gavel" class="size-6 text-blue-500" />
        </div>
        <div class="grid gap-4">
          <NuxtLink v-for="item in shopAuctions" :key="item.id" class="product-card" to="/auction">
            <img class="h-52 w-full object-cover" :src="item.image" :alt="item.title">
            <div class="p-5">
              <span class="tag">{{ item.status }}</span>
              <h3 class="mt-4 text-2xl font-semibold">{{ item.title }}</h3>
              <p class="mt-2 text-[var(--muted)]">{{ item.bidCount }} bids &middot; {{ item.bid }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>
