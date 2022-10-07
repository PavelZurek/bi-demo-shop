import { FC } from 'react'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverContent,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useCartStore } from '../../hooks/useCartStore'
import { Product } from '../../models/Product'
import { formatCurrency } from '../../helpers/format'
import Image from 'next/image'
import { CloseIcon } from '@chakra-ui/icons'
import { pexelsImageLoader } from '../../helpers/loader'

const ProductCartItem: FC<{ product: Product }> = ({ product }) => {
  return (
    <SimpleGrid columns={2} spacing={4}>
      <VStack alignItems="left">
        <Text variant="productCartItemName">{product.name}</Text>
        <Text variant="productCartItemPrice">
          {formatCurrency(product.price, product.currency)}
        </Text>
      </VStack>
      <Box position="relative">
        <Image
          loader={pexelsImageLoader}
          src={product.imageUrl}
          alt={product.imageAlt}
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </SimpleGrid>
  )
}

export const Cart: FC = () => {
  const isOpen = useCartStore((state) => state.isOpen)
  const close = useCartStore((state) => state.close)
  const open = useCartStore((state) => state.open)

  const products = useCartStore((state) => state.products)
  const clear = useCartStore((state) => state.clear)

  return (
    <Box position="relative">
      <Avatar
        src="/images/icons/shopping-cart.svg"
        borderRadius={0}
        onClick={open}
      >
        {products?.length > 0 && (
          <AvatarBadge boxSize="1.25em" bg="black" borderRadius={0} border={0}>
            {products.length}
          </AvatarBadge>
        )}
      </Avatar>

      <Box width={0} marginLeft="auto" position="relative">
        <Popover isOpen={isOpen} onClose={close}>
          <PopoverContent
            border="4px solid #E4E4E4"
            borderRadius={0}
            position="absolute"
            padding={6}
            top={2}
            right={0}
          >
            <HStack marginBottom={4} justifyContent="end">
              <CloseIcon cursor="pointer" onClick={close} />
            </HStack>
            <Stack paddingBottom={6} borderBottom="1px solid #C2C2C2">
              {!products ||
                (products.length < 1 && (
                  <Text color="muted">Cart is empty</Text>
                ))}
              {products?.map((p) => (
                <ProductCartItem
                  key={`cart-item-product-${p.id}`}
                  product={p}
                />
              ))}
            </Stack>
            <Button variant="secondary" marginTop={6} onClick={() => clear()}>
              Clear
            </Button>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  )
}
