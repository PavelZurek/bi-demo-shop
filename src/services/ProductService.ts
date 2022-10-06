import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { Product } from '../models/Product'
import { PaginatedResult } from '../models/PaginatedResult'

export interface ProductListParams {
  limit?: number
  offset?: number
  orderBy: 'name' | 'price'
  orderDirection?: 'asc' | 'desc'
}

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

  async getProducts(
    params: ProductListParams
  ): Promise<PaginatedResult<Product>> {
    const { data } = await this.getClient().query({
      variables: {
        limit: params.limit || 6,
        offset: params.offset || 0,
        order: {
          [params.orderBy || 'price']: params.orderDirection || 'desc',
        },
      },
      query: gql`
        query ProductListQuery(
          $limit: Int!
          $offset: Int!
          $order: [product_order_by!]
        ) {
          product(limit: $limit, offset: $offset, order_by: $order) {
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
