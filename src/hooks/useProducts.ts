// Accept activePage as a parameter from App.js
import { useQuery } from '@tanstack/react-query'
import { getProducts, ProductListParams } from '../api/getProducts'

export const useProducts = (params: ProductListParams) => {
  return useQuery(
    ['productList', params],
    async () => {
      const { data, count } = await getProducts(params)
      return { data, count }
    },
    { keepPreviousData: true }
  )
}
