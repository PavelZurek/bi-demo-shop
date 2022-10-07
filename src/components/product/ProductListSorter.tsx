import { FC } from 'react'
import Image from 'next/image'
import { Box, Select, Text } from '@chakra-ui/react'

export type ProductListOrderBy = 'price' | 'name'
export type OrderDirection = 'asc' | 'desc'

interface ProductListSorter {
  orderBy: ProductListOrderBy
  setOrderBy: (orderBy: ProductListOrderBy) => void
  orderDirection: OrderDirection
  setOrderDirection: (setOrderDirection: OrderDirection) => void
}

export const ProductListSorter: FC<ProductListSorter> = ({
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
}) => {
  return (
    <>
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
      <Text variant="productLisSorterLabel">Sort By</Text>
      <Box>
        <Select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value as ProductListOrderBy)}
          variant="productFilter"
        >
          <option value="price">Price</option>
          <option value="name">Name</option>
        </Select>
      </Box>
    </>
  )
}
