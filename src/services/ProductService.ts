import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import {Product} from '../models/Product';
import {PaginatedResult} from '../models/PaginatedResult';

export class ProductService {
    getClient(): ApolloClient<any> {
        return new ApolloClient<any>({
            uri: 'http://localhost:8080/v1/graphql',
            cache: new InMemoryCache(),
        });
    }

    async getFeaturedProduct(): Promise<Product> {
        const { data } = await this.getClient().query({
            query: gql`query FeaturedProductQuery {
              product (where: {featured: {_eq: true}}, limit: 1) {
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
            }`,
        })

        return data.product[0];
    }

    async getProducts(limit: number = 6, offset: number = 0): Promise<PaginatedResult<Product>> {
        const { data } = await this.getClient().query({
            query: gql`query ProductListQuery {
              product (limit: ${limit}, offset: ${offset}) {
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
            }`,
        })

        return {
            data: data.product,
            count: data.count,
        };
    }
}
