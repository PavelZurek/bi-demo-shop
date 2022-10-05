type ProductRecommendation = {
    __typename: 'recommendation';
    product: Product;
}

type ProductDetails = {
    dimensions: {
        width: number;
        height: number;
    },
    size: number;
    description: string;
}

export type Product = {
    __typename: 'product',
    id: number;
    name?: string;
    category?: string;
    currency?: string;
    imageAlt?: string;
    imageUrl?: string;
    price?: number;
    bestseller?: boolean;
    featured?: boolean;
    details?: ProductDetails;
    recommendations?: ProductRecommendation[]
}
