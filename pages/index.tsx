import {NextPage} from 'next';
import {FeaturedProduct} from '../src/components/product/FeaturedProduct';
import {ProductService} from '../src/services/ProductService';
import {Product} from '../src/models/Product';

const IndexPage: NextPage<{ featuredProduct: Product }> = ({ featuredProduct }) => {
    return <>
        <FeaturedProduct product={featuredProduct} />
    </>
}

export default IndexPage

export async function getServerSideProps() {
    const svc = new ProductService();

    return {
        props: {
            featuredProduct: await svc.getFeaturedProduct(),
        },
    };
}
