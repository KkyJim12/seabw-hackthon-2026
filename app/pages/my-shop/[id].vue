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
  if (!shop.value || !productName.value.trim()) return

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
      <!-- Shop header -->
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <NuxtLink class="secondary-button mb-5 w-fit text-sm" to="/my-shops">
            <Icon name="lucide:arrow-left" class="size-4" />
            My shops
          </NuxtLink>
          <p class="eyebrow">Owning shop</p>
          <h1 class="mt-1.5 text-4xl font-black tracking-tight sm:text-5xl">{{ shop.name }}</h1>
          <p class="mt-3 max-w-xl text-base leading-7 text-[var(--muted)]">{{ shop.description || 'No description.' }}</p>
        </div>
        <button class="primary-button shrink-0 text-sm" type="button" @click="isAddProductOpen = true">
          <Icon name="lucide:package-plus" class="size-4" />
          Add product
        </button>
      </div>

      <!-- Products table -->
      <section class="panel mt-8 overflow-hidden p-0">
        <div class="border-b border-[var(--line)] px-5 py-4">
          <div class="flex items-center gap-3">
            <p class="eyebrow">Products</p>
            <span class="tag">{{ shop.products.length }} listed</span>
          </div>
        </div>

        <div v-if="shop.products.length" class="overflow-x-auto">
          <table class="w-full min-w-[680px] text-left text-sm">
            <thead class="border-b border-[var(--line)] bg-[var(--panel-soft)]">
              <tr>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Product</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Type</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Price</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Stock</th>
                <th class="px-5 py-3.5 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in shop.products"
                :key="product.id"
                class="border-t border-[var(--line)] transition hover:bg-[var(--panel-soft)]"
              >
                <td class="px-5 py-4 font-bold">{{ product.name }}</td>
                <td class="px-5 py-4">
                  <span class="tag">{{ product.mode }}</span>
                </td>
                <td class="px-5 py-4 tabular font-semibold">{{ product.price }}</td>
                <td class="px-5 py-4 tabular">{{ product.stock }}</td>
                <td class="px-5 py-4">
                  <span class="rounded-md bg-[var(--panel-soft)] px-2 py-1 text-xs font-black uppercase tracking-widest text-[var(--muted)]">Draft</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="flex flex-col items-center p-12 text-center"
        >
          <Icon name="lucide:package" class="size-10 text-[var(--muted)]" />
          <p class="mt-3 text-sm text-[var(--muted)]">No products yet. Add your first listing.</p>
          <button class="primary-button mt-4 text-sm" type="button" @click="isAddProductOpen = true">
            <Icon name="lucide:package-plus" class="size-4" />
            Add product
          </button>
        </div>
      </section>

      <!-- Add product modal -->
      <Teleport to="body">
        <div
          v-if="isAddProductOpen"
          class="fixed inset-0 z-50 grid place-items-center bg-black/60 p-5 backdrop-blur-md"
          @click.self="isAddProductOpen = false"
        >
          <section
            class="w-full max-w-lg rounded-2xl border border-[var(--line)] bg-[var(--page)] p-6"
            style="box-shadow: 0 24px 80px rgba(0,5,40,0.25)"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="eyebrow">Add listing</p>
                <h2 class="mt-1.5 text-2xl font-black tracking-tight">{{ shop.name }}</h2>
              </div>
              <button class="icon-button shrink-0" type="button" aria-label="Close modal" @click="isAddProductOpen = false">
                <Icon name="lucide:x" class="size-4" />
              </button>
            </div>

            <div class="mt-6 grid gap-4">
              <label class="form-field">
                <span>Product name</span>
                <input v-model="productName" class="input" type="text" placeholder="e.g. Bearbrick 400% Kermit">
              </label>
              <label class="form-field">
                <span>Drop type</span>
                <select v-model="productMode" class="select">
                  <option>Pre-order</option>
                  <option>Auction</option>
                </select>
              </label>
              <label class="form-field">
                <span>Price</span>
                <input v-model="productPrice" class="input tabular" type="text" placeholder="$480">
              </label>
              <label class="form-field">
                <span>Stock / edition size</span>
                <input v-model.number="productStock" class="input tabular" min="1" type="number">
              </label>
            </div>

            <div class="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <button class="secondary-button text-sm" type="button" @click="isAddProductOpen = false">
                Cancel
              </button>
              <button class="primary-button text-sm" type="button" @click="handleAddProduct">
                <Icon name="lucide:package-plus" class="size-4" />
                Add product
              </button>
            </div>
          </section>
        </div>
      </Teleport>
    </template>

    <!-- Not found state -->
    <section v-else class="panel max-w-lg">
      <p class="eyebrow">Not found</p>
      <h1 class="mt-1.5 text-2xl font-black tracking-tight">Shop not found</h1>
      <p class="mt-2 text-sm text-[var(--muted)]">This shop doesn't exist or has been removed.</p>
      <NuxtLink class="primary-button mt-5 text-sm" to="/my-shops">
        <Icon name="lucide:arrow-left" class="size-4" />
        Back to my shops
      </NuxtLink>
    </section>
  </section>
</template>
