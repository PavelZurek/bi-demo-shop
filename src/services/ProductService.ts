import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { Product } from '../models/Product'
import { PaginatedResult } from '../models/PaginatedResult'

export class ProductService {
  getClient(): ApolloClient<Record<string, unknown>> {
    return new ApolloClient({
      uri: 'http://localhost:8080/v1/graphql',
      cache: new InMemoryCache(),
    })
  }

  async getFeaturedProduct(): Promise<Product> {
    const { data } = await this.getClient().query({
      query: gql`
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
      `,
    })

    return data.product[0]
  }

  async getProducts(limit = 6, offset = 0): Promise<PaginatedResult<Product>> {
    const { data } = await this.getClient().query({
      variables: { limit, offset },
      query: gql`
        query ProductListQuery($limit: Int!, $offset: Int!) {
          product(limit: $limit, offset: $offset) {
            id
            name
            category
            price
            currency
            imageAlt
            imageUrl
            featured
            bestseller
          }
          product_aggregate {
            aggregate {
              count
            }
          }
        }
      `,
    })

    return {
      data: data.product,
      count: data.product_aggregate.aggregate.count,
    }
  }
}
