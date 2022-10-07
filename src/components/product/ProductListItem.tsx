import { FC, useState } from 'react'
import { Product } from '../../models/Product'
import { Box, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import { pexelsImageLoader } from '../../helpers/loader'
import { AddToCartButton } from './AddToCartButton'
import { formatCategoryName, formatCurrency } from '../../helpers/format'

export const ProductListItem: FC<{ product: Product }> = ({ product }) => {
  const [isVisible, setVisible] = useState<boolean>(false)
  const isPhone = useBreakpointValue({ base: true, lg: false })

  return (
    <Stack
      key={`prod.${product.id}`}
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      spacing={{ base: 4, lg: 1 }}
    >
      <Box position="relative" minHeight="390px">
        <Image
          loader={pexelsImageLoader}
          src={product.imageUrl}
          alt={product.imageAlt}
          layout="fill"
          objectFit="cover"
        />
        {product.bestseller && (
          <Box
            position="absolute"
            backgroundColor="white"
            color="black"
            px="10px"
          >
            <Text>Best seller</Text>
          </Box>
        )}
        {(isVisible || isPhone) && (
          <Box position="absolute" width="100%" bottom={0}>
            <AddToCartButton product={product} width="100%" />
          </Box>
        )}
      </Box>
      <Text variant="productListItemCategory">
        {formatCategoryName(product.category)}
      </Text>
      <Text variant="productListItemName">{product.name}</Text>
      <Text variant="productListItemPrice">
        {formatCurrency(product.price, product.currency)}
      </Text>
    </Stack>
  )
}
