<script setup lang="ts">
const { preorders } = useMarketData()
const { requirementLabels, canParticipate } = useSybilCredentials()
const quantityById = reactive<Record<string, number>>({})

for (const item of preorders) {
  quantityById[item.id] = 1
}
</script>

<template>
  <section class="page-shell">
    <p class="eyebrow">Pre-order Page</p>
    <h1 class="mt-2 text-4xl font-semibold sm:text-5xl">All pre-order products</h1>
    <p class="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
      A marketplace view of incoming luxury brand-name items from every shop. Reserve handbags, watches, sneakers, and jewelry before they land.
    </p>

    <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="item in preorders" :key="item.id" class="product-card">
        <img class="h-64 w-full object-cover" :src="item.image" :alt="item.title">
        <div class="p-5">
          <div class="flex items-center justify-between gap-3">
            <span class="tag">{{ item.status }}</span>
            <span class="text-sm font-bold text-[var(--muted)]">{{ item.maker }}</span>
          </div>
          <h2 class="mt-4 text-2xl font-semibold">{{ item.title }}</h2>
          <div class="mt-5 h-2 overflow-hidden rounded-full bg-[var(--track)]">
            <div class="h-full rounded-full bg-[#0052ff]" :style="{ width: `${item.progress}%` }" />
          </div>
          <p class="mt-3 text-sm text-[var(--muted)]">{{ item.reserved }} of {{ item.cap }} reserved</p>
          <div v-if="requirementLabels(item.requirement).length" class="mt-4 rounded-2xl bg-[var(--panel-soft)] p-3">
            <p class="text-xs font-bold uppercase text-[var(--muted)]">Required verification</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span v-for="label in requirementLabels(item.requirement)" :key="label" class="tag">{{ label }}</span>
            </div>
          </div>
          <div class="mt-5 flex items-end justify-between gap-3">
            <div>
              <p class="text-sm text-[var(--muted)]">Reservation price</p>
              <p class="text-3xl font-semibold">{{ item.price }}</p>
            </div>
            <NuxtLink class="secondary-button" :to="`/shop-info/${item.shopId}`">
              <Icon name="lucide:store" class="size-5" />
              Shop
            </NuxtLink>
          </div>
          <div class="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <input v-model.number="quantityById[item.id]" class="input" min="1" max="5" type="number" aria-label="Quantity">
            <button class="primary-button" type="button" :disabled="!canParticipate(item.requirement)">
              <Icon :name="canParticipate(item.requirement) ? 'lucide:package-plus' : 'lucide:shield-alert'" class="size-5" />
              {{ canParticipate(item.requirement) ? 'Reserve' : 'Locked' }}
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
