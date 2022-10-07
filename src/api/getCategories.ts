import { gql, request } from 'graphql-request'

export const getCategories = async (): Promise<string[]> => {
  const query = gql`
    query CategoryList {
      product(distinct_on: category) {
        category
      }
    }
  `
  const response = await request('http://localhost:8080/v1/graphql', query)

  return response.product.map((p) => p.category)
}
