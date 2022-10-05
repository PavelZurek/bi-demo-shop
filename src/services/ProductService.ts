import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import {Product} from '../models/Product';

export class ProductService {
    getClient(): ApolloClient<any> {
        return new ApolloClient<any>({
            uri: 'http://localhost:8080/v1/graphql',
            cache: new InMemoryCache(),
        });
    }

    async getFeaturedProduct(): Promise<Product> {
        const { data } = await this.getClient().query({
            query: gql`query MyQuery {
              product (where: {featured: {_eq: true}}, limit: 1) {
                name
                id
                category
                currency
                details
                imageAlt
                imageUrl
                price
                recommendations {
                  product {
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
}
