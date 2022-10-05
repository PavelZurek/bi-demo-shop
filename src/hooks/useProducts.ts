// Accept activePage as a parameter from App.js
import { ProductService } from '../services/ProductService'
import { useQuery } from '@tanstack/react-query'

export const useProducts = (limit, offset) => {
  return useQuery(
    ['productList', limit, offset],
    async () => {
      const svc = new ProductService()
      const { data, count } = await svc.getProducts(limit, offset)
      return { data, count }
    },
    { keepPreviousData: true }
  )
}
