import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/getCategories'

export const useCategories = () => {
  return useQuery(
    ['categoryList'],
    async () => {
      return await getCategories()
    },
    { keepPreviousData: true }
  )
}
