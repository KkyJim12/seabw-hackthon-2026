import type { Ref } from 'vue'

const mockUsdcBalance = ref(0)
const mockUsdcLoaded = ref(false)

export const useMockUsdc = (address?: Ref<string | undefined>) => {
  const storageKey = computed(() => `basevault:mock-usdc:${address?.value || 'guest'}`)

  const loadBalance = () => {
    if (!import.meta.client) {
      return
    }

    const saved = window.localStorage.getItem(storageKey.value)
    mockUsdcBalance.value = saved ? Number(saved) : 250
    mockUsdcLoaded.value = true
  }

  const saveBalance = () => {
    if (!import.meta.client) {
      return
    }

    window.localStorage.setItem(storageKey.value, String(mockUsdcBalance.value))
  }

  const mintMockUsdc = (amount = 1000) => {
    if (!mockUsdcLoaded.value) {
      loadBalance()
    }

    mockUsdcBalance.value += amount
    saveBalance()
  }

  const formattedUsdc = computed(() => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(mockUsdcBalance.value)
  })

  onMounted(loadBalance)

  watch(storageKey, loadBalance)

  return {
    mockUsdcBalance,
    formattedUsdc,
    mintMockUsdc
  }
}
