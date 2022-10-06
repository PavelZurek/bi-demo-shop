import { FC } from 'react'
import { Product } from '../../models/Product'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useCartStore } from '../../hooks/useCartStore'

export const AddToCartButton: FC<ButtonProps & { product: Product }> = ({
  product,
  ...props
}) => {
  const addProduct = useCartStore((state) => state.addProduct)

  return (
    <Button variant="primary" onClick={() => addProduct(product)} {...props}>
      Add to cart
    </Button>
  )
}
