<script setup lang="ts">
const { shops } = useMarketData()
</script>

<template>
  <section class="page-shell">
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="eyebrow">Shop Page</p>
        <h1 class="mt-2 text-4xl font-semibold sm:text-5xl">Browse shops</h1>
        <p class="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Discover luxury sellers, then click into a shop to see its pre-order catalog and live auction lots.
        </p>
      </div>
      <NuxtLink class="secondary-button w-fit" to="/preorder">
        <Icon name="lucide:layout-grid" class="size-5" />
        All products
      </NuxtLink>
    </div>

    <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <article v-for="shop in shops" :key="shop.id" class="product-card">
        <img class="h-56 w-full object-cover" :src="shop.image" :alt="shop.name">
        <div class="p-4">
          <div class="flex items-center justify-between gap-3">
            <span class="tag">{{ shop.category }}</span>
            <NuxtLink class="icon-button small" :to="`/shop-info/${shop.id}`" :aria-label="`Open ${shop.name}`">
              <Icon name="lucide:arrow-up-right" class="size-4" />
            </NuxtLink>
          </div>
          <h2 class="mt-4 text-2xl font-semibold">{{ shop.name }}</h2>
          <p class="mt-2 line-clamp-3 leading-7 text-[var(--muted)]">{{ shop.description }}</p>
          <dl class="mt-5 grid grid-cols-3 gap-2">
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
          <NuxtLink class="primary-button mt-5 w-full" :to="`/shop-info/${shop.id}`">
            <Icon name="lucide:store" class="size-5" />
            View shop
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>
