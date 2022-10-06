import { useQuery } from '@tanstack/react-query'
import { ProductService } from '../services/ProductService'

export const useCategories = () => {
  return useQuery(
    ['categoryList'],
    async () => {
      const svc = new ProductService()
      return await svc.getCategories()
    },
    { keepPreviousData: true }
  )
}
