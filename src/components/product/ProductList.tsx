import { FC, useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Pagination } from '../Pagination'
import { Product } from '../../models/Product'
import {
  Box,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { formatCategoryName, formatCurrency } from '../../helpers/format'
import Image from 'next/image'
import { AddToCartButton } from './AddToCartButton'

const ProductListItem: FC<{ product: Product }> = ({ product }) => {
  const [isVisible, setVisible] = useState<boolean>(false)

  return (
    <Stack
      key={`prod.${product.id}`}
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Box position="relative" minHeight="390px">
        <Image
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
        {isVisible && (
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

export const ProductList: FC = () => {
  const [page, setPage] = useState(1)

  const perPage = 6
  const userList = useProducts(perPage, (page - 1) * perPage)
  const pageCount = userList.data?.count
    ? Math.ceil(userList.data.count / perPage)
    : 0

  return (
    <Stack marginY="16px">
      <HStack marginY="64px" justifyContent="space-between">
        <HStack spacing="4px">
          <Text variant="productListHeading">Photography</Text>
          <Text variant="productListHeading">/</Text>
          <Text variant="productListHeading" fontWeight="400" color="muted">
            Premium Photos
          </Text>
        </HStack>
        <HStack>
          <Image
            src="/images/icons/sort-by.svg"
            alt=""
            height="15px"
            width="15px"
          />
          <Text color="muted">Sort By</Text>
        </HStack>
      </HStack>
      <Grid templateColumns="repeat(4, 25%)">
        <GridItem colSpan={1}>
          <Stack>
            <Box>
              <Text variant="productListFilterHeading">Category</Text>
            </Box>
            <Box>
              <Text variant="productListFilterHeading">Price range</Text>
            </Box>
          </Stack>
        </GridItem>
        <GridItem colSpan={3}>
          <SimpleGrid gap="40px" columns={3}>
            {userList.isLoading
              ? 'Loading...'
              : userList.data &&
                userList.data.data.map((product) => (
                  <ProductListItem
                    key={`prod.${product.id}`}
                    product={product}
                  />
                ))}
          </SimpleGrid>
          <Stack alignItems="center">
            <Pagination page={page} pageCount={pageCount} setPage={setPage} />
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  )
}
