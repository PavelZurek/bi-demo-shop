import { NextPage } from 'next'
import { FeaturedProduct } from '../src/components/product/FeaturedProduct'
import { Product } from '../src/models/Product'
import { ProductList } from '../src/components/product/ProductList'
import { getFeaturedProduct } from '../src/api/getFeaturedProduct'

const IndexPage: NextPage<{ featuredProduct: Product }> = ({
  featuredProduct,
}) => {
  return (
    <>
      <FeaturedProduct product={featuredProduct} />
      <ProductList />
    </>
  )
}

export default IndexPage

export async function getServerSideProps() {
  return {
    props: {
      featuredProduct: await getFeaturedProduct(),
    },
  }
}
