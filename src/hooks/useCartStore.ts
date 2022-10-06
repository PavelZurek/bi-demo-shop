import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../models/Product'
import { useEffect, useState } from 'react'

interface CartState {
  products: Product[]
  isOpen: boolean
  addProduct: (product: Product) => void
  clear: () => void
  close: () => void
  open: () => void
}

const emptyState = (set) => ({
  products: [],
  isOpen: false,
  addProduct: (product: Product) =>
    set((state) => {
      if (state.products.find((p) => p.id === product.id)) {
        return state
      }

      return {
        products: [...state.products, product],
        isOpen: true,
      }
    }),
  clear: () =>
    set(() => ({
      products: [],
    })),
  open: () =>
    set(() => ({
      isOpen: true,
    })),
  close: () =>
    set(() => ({
      isOpen: false,
    })),
})

const usePersistedCartStore = create(
  persist<CartState>(emptyState, {
    name: 'cart-storage',
  })
)

export const useCartStore = (selector) => {
  /*
    This a fix to ensure zustand never hydrates the store before React hydrates the page.
    Without this, there is a mismatch between SSR/SSG and client side on first draw which produces
    an error.
     */
  const store = usePersistedCartStore(selector)
  const [isHydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return isHydrated ? store : selector(emptyState)
}
