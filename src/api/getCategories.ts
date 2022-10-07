import { gql, request } from 'graphql-request'

export const getCategories = async (): Promise<string[]> => {
  const query = gql`
    query CategoryList {
      product(distinct_on: category) {
        category
      }
    }
  `
  const response = await request(process.env.NEXT_PUBLIC_GRAPHQL_URL, query)

  return response.product.map((p) => p.category)
}
