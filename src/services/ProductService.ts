import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { Product } from '../models/Product'
import { PaginatedResult } from '../models/PaginatedResult'

export interface ProductListParamsFilter {
  category: string[]
  price?: {
    min?: number
    max?: number
  }
}

export interface ProductListParams {
  limit?: number
  offset?: number
  orderBy: 'name' | 'price'
  orderDirection?: 'asc' | 'desc'
  filters?: ProductListParamsFilter
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
    const variables = {
      limit: params.limit || 6,
      offset: params.offset || 0,
      order: {
        [params.orderBy || 'price']: params.orderDirection || 'desc',
      },
      categoryFilter: params.filters?.category || [],
      priceMin: params.filters?.price?.min,
      priceMax: params.filters?.price?.max,
    }

    // TODO: use query builder
    let where = ''
    let whereCount = ''
    if (params.filters?.category?.length) {
      where += 'category: { _in: $categoryFilter }'
    }
    if (params.filters?.price) {
      where += `price: {${
        params.filters?.price?.min ? `_gte: ${params.filters.price.min}` : ''
      } ${
        params.filters?.price?.max ? `_lte: ${params.filters.price.max}` : ''
      }}`
    }
    if (where) {
      whereCount = `(where: { ${where} })`
      where = `, where: { ${where} }`
    }

    const { data } = await this.getClient().query({
      variables,
      query: gql`
        query ProductListQuery(
          $limit: Int!
          $offset: Int!
          $order: [product_order_by!]
          $categoryFilter: [String!]
        ) {
          product(limit: $limit, offset: $offset, order_by: $order${where}) {
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
          product_aggregate${whereCount} {
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

  async getCategories(): Promise<string[]> {
    const { data } = await this.getClient().query({
      query: gql`
        query CategoryList {
          product(distinct_on: category) {
            category
          }
        }
      `,
    })

    return data.product.map((p) => p.category)
  }
}
