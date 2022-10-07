import { FC, useCallback, useEffect, useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Pagination } from '../Pagination'
import { Product } from '../../models/Product'
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { formatCategoryName, formatCurrency } from '../../helpers/format'
import Image from 'next/image'
import { AddToCartButton } from './AddToCartButton'
import { ProductListParamsFilter } from '../../services/ProductService'
import { ProductListFilter } from './ProductListFilter'

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

type ProductListOrderBy = 'price' | 'name'

export const ProductList: FC = () => {
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState<ProductListOrderBy>('price')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [filter, setFilter] = useState<ProductListParamsFilter>({
    category: [],
  })

  const perPage = 6
  const userList = useProducts({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy,
    orderDirection,
    filters: filter,
  })
  const pageCount = userList.data?.count
    ? Math.ceil(userList.data.count / perPage)
    : 0

  useEffect(() => {
    if (pageCount < page) {
      setPage(pageCount)
    }
  }, [pageCount, page])

  const onFilterChange = useCallback((filter: ProductListParamsFilter) => {
    setFilter(filter)
  }, [])

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
            onClick={() =>
              setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
            }
            style={{ cursor: 'pointer' }}
          />
          <Text color="muted">Sort By</Text>
          <Box>
            <Select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value as ProductListOrderBy)}
            >
              <option value="price">Price</option>
              <option value="name">Name</option>
            </Select>
          </Box>
        </HStack>
      </HStack>
      <Grid templateColumns="repeat(4, 25%)">
        <GridItem colSpan={1}>
          <ProductListFilter filter={filter} onChange={onFilterChange} />
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
