// Accept activePage as a parameter from App.js
import { ProductListParams, ProductService } from '../services/ProductService'
import { useQuery } from '@tanstack/react-query'

export const useProducts = (params: ProductListParams) => {
  return useQuery(
    ['productList', params],
    async () => {
      const svc = new ProductService()
      const { data, count } = await svc.getProducts(params)
      return { data, count }
    },
    { keepPreviousData: true }
  )
}
