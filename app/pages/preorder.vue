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
    <!-- Page header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="eyebrow">Drop calendar</p>
        <h1 class="mt-1.5 text-4xl font-black tracking-tight sm:text-5xl">Pre-order drops</h1>
        <p class="mt-3 max-w-xl text-base leading-7 text-[var(--muted)]">
          Reserve authenticated limited releases before they land — Bearbrick figures, Supreme seasonals, and collab watches.
        </p>
      </div>
      <span class="tag w-fit shrink-0 text-sm">{{ preorders.length }} drops listed</span>
    </div>

    <!-- Product grid -->
    <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="item in preorders" :key="item.id" class="product-card">
        <!-- Image with allocation bar -->
        <div class="relative overflow-hidden">
          <img class="h-60 w-full object-cover" :src="item.image" :alt="item.title">
          <!-- Allocation bar at image bottom -->
          <div class="absolute inset-x-0 bottom-0 h-1 bg-black/25">
            <div class="h-full transition-all duration-700" style="background: var(--accent)" :style="{ width: `${item.progress}%` }" />
          </div>
          <!-- Ship date badge -->
          <div class="absolute top-3 right-3 rounded-lg border border-white/12 bg-black/55 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
            {{ item.status }}
          </div>
        </div>

        <!-- Product info -->
        <div class="p-5">
          <div class="flex items-center justify-between gap-2">
            <span class="tag">Pre-order</span>
            <span class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{{ item.maker }}</span>
          </div>

          <h2 class="mt-3 text-lg font-black tracking-tight leading-snug">{{ item.title }}</h2>

          <!-- Allocation meter -->
          <div class="mt-4">
            <div class="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span class="text-[var(--muted)]">{{ item.reserved }}/{{ item.cap }} reserved</span>
              <span style="color: var(--accent)">{{ item.progress }}%</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-[var(--track)]">
              <div
                class="h-full rounded-full transition-all duration-700"
                style="background: var(--accent)"
                :style="{ width: `${item.progress}%` }"
              />
            </div>
          </div>

          <!-- Requirements -->
          <div
            v-if="requirementLabels(item.requirement).length"
            class="mt-4 rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] p-3"
          >
            <p class="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Required to reserve</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="label in requirementLabels(item.requirement)" :key="label" class="tag">{{ label }}</span>
            </div>
          </div>

          <!-- Price row -->
          <div class="mt-4 flex items-end justify-between gap-3">
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Price</p>
              <p class="mt-0.5 text-2xl font-black tracking-tight tabular">{{ item.price }}</p>
            </div>
            <NuxtLink class="secondary-button text-sm" :to="`/shop-info/${item.shopId}`">
              <Icon name="lucide:store" class="size-4" />
              Shop
            </NuxtLink>
          </div>

          <!-- Reserve action -->
          <div class="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <input
              v-model.number="quantityById[item.id]"
              class="input"
              min="1"
              max="5"
              type="number"
              aria-label="Quantity"
            >
            <button
              class="primary-button text-sm"
              type="button"
              :disabled="!canParticipate(item.requirement)"
            >
              <Icon
                :name="canParticipate(item.requirement) ? 'lucide:package-plus' : 'lucide:lock'"
                class="size-4"
              />
              {{ canParticipate(item.requirement) ? 'Reserve' : 'Locked' }}
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
