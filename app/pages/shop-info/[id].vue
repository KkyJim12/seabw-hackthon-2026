<script setup lang="ts">
const route = useRoute()
const { shops, preorders, auctions } = useMarketData()
const shop = computed(() => (shops.find((item) => item.id === route.params.id) ?? shops[0])!)
const shopPreorders = computed(() => preorders.filter((item) => item.shopId === shop.value!.id))
const shopAuctions = computed(() => auctions.filter((item) => item.shopId === shop.value!.id))
</script>

<template>
  <section v-if="shop" class="page-shell">
    <div class="grid gap-6 lg:grid-cols-[1fr_340px]">
      <!-- Shop header card -->
      <div class="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
        <div class="relative h-72 overflow-hidden">
          <img class="h-full w-full object-cover" :src="shop.image" :alt="shop.name">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div class="absolute bottom-5 left-5 right-5">
            <span class="tag mb-3 inline-flex">{{ shop.category }}</span>
            <h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">{{ shop.name }}</h1>
            <p class="mt-1 text-sm font-bold text-white/60">{{ shop.handle }}</p>
          </div>
        </div>
        <div class="p-6">
          <p class="eyebrow">About</p>
          <p class="mt-2 text-base leading-7 text-[var(--muted)]">{{ shop.description }}</p>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-4">
        <WalletPanel />
        <dl class="grid grid-cols-3 gap-2.5 lg:grid-cols-1">
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

    <!-- Products grid -->
    <div class="mt-10 grid gap-8 lg:grid-cols-2">
      <!-- Pre-orders -->
      <section>
        <div class="mb-5 flex items-center justify-between">
          <div>
            <p class="eyebrow">Pre-order</p>
            <h2 class="mt-0.5 text-xl font-black tracking-tight">Upcoming drops</h2>
          </div>
          <span class="flex size-9 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--panel)]" style="color: var(--accent)">
            <Icon name="lucide:package-check" class="size-4" />
          </span>
        </div>
        <div v-if="shopPreorders.length" class="grid gap-4">
          <NuxtLink
            v-for="item in shopPreorders"
            :key="item.id"
            class="product-card block"
            to="/preorder"
          >
            <div class="relative overflow-hidden">
              <img class="h-48 w-full object-cover" :src="item.image" :alt="item.title">
              <div class="absolute inset-x-0 bottom-0 h-1 bg-black/20">
                <div class="h-full" style="background: var(--accent)" :style="{ width: `${item.progress}%` }" />
              </div>
              <div class="absolute top-3 right-3 rounded-lg border border-white/12 bg-black/55 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
                {{ item.status }}
              </div>
            </div>
            <div class="p-4">
              <span class="tag">Pre-order</span>
              <h3 class="mt-3 text-base font-black tracking-tight">{{ item.title }}</h3>
              <p class="mt-1.5 text-sm text-[var(--muted)]">{{ item.reserved }} reserved · {{ item.price }}</p>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="rounded-xl border border-dashed border-[var(--line)] bg-[var(--panel-soft)] p-8 text-center text-sm text-[var(--muted)]">
          No pre-orders listed yet
        </div>
      </section>

      <!-- Auctions -->
      <section>
        <div class="mb-5 flex items-center justify-between">
          <div>
            <p class="eyebrow">Auction</p>
            <h2 class="mt-0.5 text-xl font-black tracking-tight">Live lots</h2>
          </div>
          <span class="flex size-9 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--panel)]" style="color: var(--live)">
            <Icon name="lucide:gavel" class="size-4" />
          </span>
        </div>
        <div v-if="shopAuctions.length" class="grid gap-4">
          <NuxtLink
            v-for="item in shopAuctions"
            :key="item.id"
            class="product-card block"
            to="/auction"
          >
            <div class="relative overflow-hidden">
              <img class="h-48 w-full object-cover" :src="item.image" :alt="item.title">
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div class="tag-live inline-flex">
                  <span class="live-dot" />
                  {{ item.status }}
                </div>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-base font-black tracking-tight">{{ item.title }}</h3>
              <p class="mt-1.5 text-sm text-[var(--muted)]">{{ item.bidCount }} bids · {{ item.bid }}</p>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="rounded-xl border border-dashed border-[var(--line)] bg-[var(--panel-soft)] p-8 text-center text-sm text-[var(--muted)]">
          No active auctions
        </div>
      </section>
    </div>
  </section>
</template>
