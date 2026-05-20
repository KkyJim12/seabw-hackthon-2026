export type ManagedProduct = {
  id: number
  name: string
  mode: 'Pre-order' | 'Auction'
  price: string
  stock: number
}

export type ManagedShop = {
  id: number
  name: string
  category: string
  description: string
  products: ManagedProduct[]
}

const managedShops = ref<ManagedShop[]>([
  {
    id: 1,
    name: 'Maison Vault',
    category: 'Hermes and Chanel bags',
    description: 'Authenticated handbags and client-only luxury allocations.',
    products: [
      { id: 1, name: 'Hermes Birkin 25 Gold Togo', mode: 'Pre-order', price: '$28,500', stock: 8 },
      { id: 2, name: 'Chanel Classic Flap Caviar', mode: 'Auction', price: '$9,480', stock: 1 }
    ]
  },
  {
    id: 2,
    name: 'Crown Time',
    category: 'Rolex and Patek watches',
    description: 'Full-set watches, rare dials, and collector references.',
    products: [
      { id: 3, name: 'Rolex Daytona Panda 116500LN', mode: 'Auction', price: '$38,200', stock: 1 }
    ]
  }
])

export const useManagedShops = () => {
  const createShop = (payload: Pick<ManagedShop, 'name' | 'category' | 'description'>) => {
    const shop: ManagedShop = {
      id: Date.now(),
      name: payload.name,
      category: payload.category || 'Luxury goods',
      description: payload.description || 'Curated luxury brand-name items.',
      products: []
    }

    managedShops.value.unshift(shop)

    return shop
  }

  const getShopById = (id: string | number) => {
    return managedShops.value.find((shop) => String(shop.id) === String(id))
  }

  const addProduct = (shopId: string | number, payload: Omit<ManagedProduct, 'id'>) => {
    const shop = getShopById(shopId)

    if (!shop) {
      return
    }

    shop.products.unshift({
      id: Date.now(),
      ...payload
    })
  }

  return {
    managedShops,
    createShop,
    getShopById,
    addProduct
  }
}
