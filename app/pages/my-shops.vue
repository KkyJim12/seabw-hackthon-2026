<script setup lang="ts">
const { managedShops, createShop } = useManagedShops()
const router = useRouter()

const isCreateShopOpen = ref(false)
const shopName = ref('')
const category = ref('')
const description = ref('')

const handleCreateShop = () => {
  if (!shopName.value.trim()) return

  const shop = createShop({
    name: shopName.value,
    category: category.value,
    description: description.value
  })

  shopName.value = ''
  category.value = ''
  description.value = ''
  isCreateShopOpen.value = false
  router.push(`/my-shop/${shop.id}`)
}
</script>

<template>
  <section class="page-shell">
    <!-- Page header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="eyebrow">Manage shops</p>
        <h1 class="mt-1.5 text-4xl font-black tracking-tight sm:text-5xl">Your storefronts</h1>
        <p class="mt-3 max-w-xl text-base leading-7 text-[var(--muted)]">
          One wallet can operate multiple shops. Open a shop to manage its product listing and launch pre-orders or auctions.
        </p>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <span class="tag">{{ managedShops.length }} shops</span>
        <button class="primary-button text-sm" type="button" @click="isCreateShopOpen = true">
          <Icon name="lucide:plus" class="size-4" />
          Create shop
        </button>
      </div>
    </div>

    <!-- Shops grid -->
    <div v-if="managedShops.length" class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <NuxtLink
        v-for="shop in managedShops"
        :key="shop.id"
        class="product-card block text-left"
        :to="`/my-shop/${shop.id}`"
      >
        <div class="p-5">
          <div class="flex items-center justify-between gap-3">
            <span class="tag">{{ shop.category || 'General' }}</span>
            <span class="flex size-7 items-center justify-center rounded-lg border border-[var(--line)] transition group-hover:border-[var(--accent)]" style="color: var(--accent)">
              <Icon name="lucide:arrow-up-right" class="size-4" />
            </span>
          </div>
          <h2 class="mt-4 text-xl font-black tracking-tight">{{ shop.name }}</h2>
          <p class="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{{ shop.description || 'No description yet.' }}</p>
          <dl class="mt-5 grid grid-cols-2 gap-2.5">
            <div class="metric">
              <dt>Products</dt>
              <dd>{{ shop.products.length }}</dd>
            </div>
            <div class="metric">
              <dt>Mode</dt>
              <dd>Both</dd>
            </div>
          </dl>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-[var(--line)] bg-[var(--panel-soft)] p-16 text-center"
    >
      <div
        class="grid size-14 place-items-center rounded-2xl text-white"
        style="background: var(--accent); box-shadow: 0 4px 16px var(--accent-glow)"
      >
        <Icon name="lucide:store" class="size-7" />
      </div>
      <h2 class="mt-4 text-xl font-black tracking-tight">No shops yet</h2>
      <p class="mt-2 text-sm text-[var(--muted)]">Create your first storefront to start listing limited drops.</p>
      <button class="primary-button mt-6 text-sm" type="button" @click="isCreateShopOpen = true">
        <Icon name="lucide:plus" class="size-4" />
        Create your first shop
      </button>
    </div>

    <!-- Create shop modal -->
    <Teleport to="body">
      <div
        v-if="isCreateShopOpen"
        class="fixed inset-0 z-50 grid place-items-center bg-black/60 p-5 backdrop-blur-md"
        @click.self="isCreateShopOpen = false"
      >
        <section
          class="w-full max-w-lg rounded-2xl border border-[var(--line)] bg-[var(--page)] p-6"
          style="box-shadow: 0 24px 80px rgba(0,5,40,0.25)"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="eyebrow">New storefront</p>
              <h2 class="mt-1.5 text-2xl font-black tracking-tight">Create a shop</h2>
            </div>
            <button class="icon-button shrink-0" type="button" aria-label="Close modal" @click="isCreateShopOpen = false">
              <Icon name="lucide:x" class="size-4" />
            </button>
          </div>

          <div class="mt-6 grid gap-4">
            <label class="form-field">
              <span>Shop name</span>
              <input v-model="shopName" class="input" type="text" placeholder="e.g. Riviera Archive">
            </label>
            <label class="form-field">
              <span>Category</span>
              <input v-model="category" class="input" type="text" placeholder="e.g. Luxury sneakers">
            </label>
            <label class="form-field">
              <span>Description</span>
              <textarea v-model="description" class="textarea" placeholder="Describe sourcing, authentication, and product focus." />
            </label>
          </div>

          <div class="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
            <button class="secondary-button text-sm" type="button" @click="isCreateShopOpen = false">
              Cancel
            </button>
            <button class="primary-button text-sm" type="button" @click="handleCreateShop">
              <Icon name="lucide:plus" class="size-4" />
              Create shop
            </button>
          </div>
        </section>
      </div>
    </Teleport>
  </section>
</template>
