import { PaginatedResult } from '../models/PaginatedResult'
import { Product } from '../models/Product'
import { gql, request } from 'graphql-request'

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

export const getProducts = async (
  params: ProductListParams
): Promise<PaginatedResult<Product>> => {
  const variables = {
    limit: params.limit || 6,
    offset: params.offset || 0,
    order: {
      [params.orderBy]: params.orderDirection,
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
      product(limit: $limit, offset: $offset, order_by: $order, where: $where) {
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

  return {
    data: response.product,
    count: response.product_aggregate.aggregate.count,
  }
}
