import { FC } from 'react'
import { Product } from '../../models/Product'
import { Button, ButtonProps } from '@chakra-ui/react'

export const AddToCartButton: FC<ButtonProps & { product: Product }> = ({
  product,
  ...props
}) => {
  return (
    <Button variant="primary" {...props}>
      Add to cart
    </Button>
  )
}
