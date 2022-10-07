import { request, gql } from 'graphql-request'
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
  async getFeaturedProduct(): Promise<Product> {
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
    const response = await request('http://localhost:8080/v1/graphql', query)

    return response.product[0]
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
      where: {
        category: params.filters?.category?.length
          ? { _in: params.filters.category }
          : undefined,
        price: params.filters?.price
          ? { _gte: params.filters.price.min, _lte: params.filters.price.max }
          : undefined,
      },
    }

    const query = gql`
      query ProductListQuery(
        $limit: Int!
        $offset: Int!
        $order: [product_order_by!]
        $where: product_bool_exp
      ) {
        product(
          limit: $limit
          offset: $offset
          order_by: $order
          where: $where
        ) {
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
        product_aggregate(where: $where) {
          aggregate {
            count
          }
        }
      }
    `

    const response = await request(
      'http://localhost:8080/v1/graphql',
      query,
      variables
    )
    console.log(response)

    return {
      data: response.product,
      count: response.product_aggregate.aggregate.count,
    }
  }

  async getCategories(): Promise<string[]> {
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
}
