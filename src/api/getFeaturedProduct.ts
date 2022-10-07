import { Product } from '../models/Product'
import { gql, request } from 'graphql-request'

export const getFeaturedProduct = async (): Promise<Product> => {
  const query = gql`
    query FeaturedProductQuery {
      product(where: { featured: { _eq: true } }, limit: 1) {
        id
        name
        category
        price
        currency
        details
        imageAlt
        imageUrl
        featured
        recommendations {
          productByRecommendedProductId {
            id
            imageAlt
            imageUrl
          }
        }
      }
    }
  `
  const response = await request(process.env.NEXT_PUBLIC_GRAPHQL_URL, query)

  return response.product[0]
}
