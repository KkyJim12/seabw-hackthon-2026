<script setup lang="ts">
const { managedShops, createShop } = useManagedShops()
const router = useRouter()

const isCreateShopOpen = ref(false)
const shopName = ref('')
const category = ref('')
const description = ref('')

const handleCreateShop = () => {
  if (!shopName.value.trim()) {
    return
  }

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
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="eyebrow">Manage Shop</p>
        <h1 class="mt-2 text-4xl font-semibold sm:text-5xl">Your luxury storefronts</h1>
        <p class="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          One wallet can operate multiple shops. Open a shop to manage its product table and launch pre-orders or auctions.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <span class="tag">{{ managedShops.length }} shops</span>
        <button class="primary-button" type="button" @click="isCreateShopOpen = true">
          <Icon name="lucide:plus" class="size-5" />
          Create shop
        </button>
      </div>
    </div>

    <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <NuxtLink
        v-for="shop in managedShops"
        :key="shop.id"
        class="product-card text-left transition hover:-translate-y-1"
        :to="`/my-shop/${shop.id}`"
      >
        <div class="p-5">
          <div class="flex items-center justify-between gap-3">
            <span class="tag">{{ shop.category }}</span>
            <Icon name="lucide:arrow-up-right" class="size-5 text-blue-500" />
          </div>
          <h2 class="mt-4 text-2xl font-semibold">{{ shop.name }}</h2>
          <p class="mt-2 line-clamp-2 leading-7 text-[var(--muted)]">{{ shop.description }}</p>
          <dl class="mt-5 grid grid-cols-2 gap-3">
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

    <div v-if="isCreateShopOpen" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-5 backdrop-blur-sm" @click.self="isCreateShopOpen = false">
      <section class="w-full max-w-xl rounded-[1.5rem] border border-[var(--line)] bg-[var(--page)] p-6 shadow-2xl shadow-blue-950/20">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="eyebrow">Create Shop</p>
            <h2 class="mt-2 text-3xl font-semibold">Add another storefront</h2>
          </div>
          <button class="icon-button" type="button" aria-label="Close create shop modal" @click="isCreateShopOpen = false">
            <Icon name="lucide:x" class="size-5" />
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

        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button class="secondary-button" type="button" @click="isCreateShopOpen = false">
            Cancel
          </button>
          <button class="primary-button" type="button" @click="handleCreateShop">
            <Icon name="lucide:plus" class="size-5" />
            Create shop
          </button>
        </div>
      </section>
    </div>
  </section>
</template>
