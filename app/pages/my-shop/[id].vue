<script setup lang="ts">
const route = useRoute()
const { getShopById, addProduct } = useManagedShops()

const isAddProductOpen = ref(false)
const productName = ref('')
const productMode = ref<'Pre-order' | 'Auction'>('Pre-order')
const productPrice = ref('')
const productStock = ref(1)
const shop = computed(() => getShopById(route.params.id as string))

const handleAddProduct = () => {
  if (!shop.value || !productName.value.trim()) {
    return
  }

  addProduct(shop.value.id, {
    name: productName.value,
    mode: productMode.value,
    price: productPrice.value || '$0',
    stock: productStock.value || 1
  })

  productName.value = ''
  productMode.value = 'Pre-order'
  productPrice.value = ''
  productStock.value = 1
  isAddProductOpen.value = false
}
</script>

<template>
  <section class="page-shell">
    <template v-if="shop">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <NuxtLink class="secondary-button mb-5 w-fit" to="/my-shops">
            <Icon name="lucide:arrow-left" class="size-5" />
            My shops
          </NuxtLink>
          <p class="eyebrow">Owning Shop</p>
          <h1 class="mt-2 text-4xl font-semibold sm:text-5xl">{{ shop.name }}</h1>
          <p class="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">{{ shop.description }}</p>
        </div>
        <button class="primary-button" type="button" @click="isAddProductOpen = true">
          <Icon name="lucide:package-plus" class="size-5" />
          Add product
        </button>
      </div>

      <section class="panel mt-8 overflow-hidden p-0">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[720px] text-left">
            <thead class="bg-[var(--panel-soft)] text-sm uppercase text-[var(--muted)]">
              <tr>
                <th class="px-5 py-4">Product</th>
                <th class="px-5 py-4">Type</th>
                <th class="px-5 py-4">Price</th>
                <th class="px-5 py-4">Stock</th>
                <th class="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in shop.products" :key="product.id" class="border-t border-[var(--line)]">
                <td class="px-5 py-4 font-semibold">{{ product.name }}</td>
                <td class="px-5 py-4">
                  <span class="tag">{{ product.mode }}</span>
                </td>
                <td class="px-5 py-4">{{ product.price }}</td>
                <td class="px-5 py-4">{{ product.stock }}</td>
                <td class="px-5 py-4 text-[var(--muted)]">Draft</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div v-if="isAddProductOpen" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-5 backdrop-blur-sm" @click.self="isAddProductOpen = false">
        <section class="w-full max-w-xl rounded-[1.5rem] border border-[var(--line)] bg-[var(--page)] p-6 shadow-2xl shadow-blue-950/20">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="eyebrow">Add Product</p>
              <h2 class="mt-2 text-3xl font-semibold">{{ shop.name }}</h2>
            </div>
            <button class="icon-button" type="button" aria-label="Close add product modal" @click="isAddProductOpen = false">
              <Icon name="lucide:x" class="size-5" />
            </button>
          </div>

          <div class="mt-6 grid gap-4">
            <label class="form-field">
              <span>Product name</span>
              <input v-model="productName" class="input" type="text" placeholder="e.g. LV Trainer Blue Denim">
            </label>
            <label class="form-field">
              <span>Product type</span>
              <select v-model="productMode" class="select">
                <option>Pre-order</option>
                <option>Auction</option>
              </select>
            </label>
            <label class="form-field">
              <span>Price</span>
              <input v-model="productPrice" class="input" type="text" placeholder="$2,400">
            </label>
            <label class="form-field">
              <span>Stock</span>
              <input v-model.number="productStock" class="input" min="1" type="number">
            </label>
          </div>

          <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button class="secondary-button" type="button" @click="isAddProductOpen = false">
              Cancel
            </button>
            <button class="primary-button" type="button" @click="handleAddProduct">
              <Icon name="lucide:package-plus" class="size-5" />
              Add product
            </button>
          </div>
        </section>
      </div>
    </template>

    <section v-else class="panel">
      <p class="eyebrow">Not Found</p>
      <h1 class="mt-2 text-3xl font-semibold">Shop not found</h1>
      <NuxtLink class="primary-button mt-6" to="/my-shops">Back to my shops</NuxtLink>
    </section>
  </section>
</template>
