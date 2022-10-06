import { FC } from 'react'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Popover,
  PopoverContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useCartStore } from '../../hooks/useCartStore'

export const Cart: FC = () => {
  const { isOpen, onClose } = useDisclosure({ isOpen: true })
  const products = useCartStore((state) => state.products)
  const clear = useCartStore((state) => state.clear)

  return (
    <Box position="relative">
      <Avatar src="/images/icons/shopping-cart.svg" borderRadius={0}>
        {products?.length > 0 && (
          <AvatarBadge boxSize="1.25em" bg="black" borderRadius={0} border={0}>
            {products.length}
          </AvatarBadge>
        )}
      </Avatar>

      <Box width={0} marginLeft="auto" position="relative">
        {products?.length > 0 && (
          <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverContent
              border="4px solid #E4E4E4"
              borderRadius={0}
              position="absolute"
              top={2}
              right={0}
            >
              {products.map((p) => (
                <Text key={`cart-item-product-${p.id}`}>{p.name}</Text>
              ))}
              <Button onClick={() => clear()}>Clear</Button>
            </PopoverContent>
          </Popover>
        )}
      </Box>
    </Box>
  )
}
