import { FC, useCallback, useEffect, useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Pagination } from '../Pagination'
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalContent,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { ProductListFilter } from './ProductListFilter'
import {
  OrderDirection,
  ProductListOrderBy,
  ProductListSorter,
} from './ProductListSorter'
import { ProductListParamsFilter } from '../../api/getProducts'
import { ProductListItem } from './ProductListItem'
import { CloseIcon } from '@chakra-ui/icons'

export const ProductList: FC = () => {
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState<ProductListOrderBy>('price')
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc')
  const [filter, setFilter] = useState<ProductListParamsFilter>({
    category: [],
  })

  const {
    isOpen: isFilterModalOpen,
    onOpen: onFilterModalOpen,
    onClose: onFilterModalClose,
  } = useDisclosure()

  const isPhone = useBreakpointValue({ base: true, lg: false })

  const perPage = isPhone ? 4 : 6
  const productList = useProducts({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy,
    orderDirection,
    filters: filter,
  })
  const pageCount = productList.data?.count
    ? Math.ceil(productList.data.count / perPage)
    : 0

  useEffect(() => {
    if (pageCount < page) {
      setPage(pageCount == 0 ? 1 : pageCount)
    }
  }, [pageCount, page])

  const onFilterChange = useCallback((filter: ProductListParamsFilter) => {
    setFilter(filter)
  }, [])

  return (
    <Stack marginY={4}>
      <HStack marginY={8} justifyContent="space-between">
        <HStack spacing={1}>
          <Text variant="productListHeading">Photography</Text>
          <Text variant="productListHeading">/</Text>
          <Text variant="productListHeading" fontWeight="400" color="muted">
            Premium Photos
          </Text>
        </HStack>
        <HStack>
          {!isPhone ? (
            <ProductListSorter
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
            />
          ) : (
            <>
              <Image
                src="/images/icons/filter.svg"
                alt=""
                height="29px"
                width="29px"
                style={{ cursor: 'pointer' }}
                onClick={onFilterModalOpen}
              />
              <Modal isOpen={isFilterModalOpen} onClose={onFilterModalClose}>
                <ModalContent padding={8}>
                  <Stack spacing={6}>
                    <HStack justifyContent="space-between">
                      <Text variant="productListFilterModalHeading">
                        Filter
                      </Text>
                      <CloseIcon
                        cursor="pointer"
                        onClick={onFilterModalClose}
                      />
                    </HStack>
                    <Stack>
                      <ProductListFilter
                        filter={filter}
                        onChange={onFilterChange}
                      />
                      <ProductListSorter
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        orderDirection={orderDirection}
                        setOrderDirection={setOrderDirection}
                      />
                    </Stack>
                    <SimpleGrid columns={2} spacing={1}>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setFilter({ category: [] })
                          setOrderBy('price')
                          setOrderDirection('asc')
                          onFilterModalClose()
                        }}
                      >
                        Clear
                      </Button>
                      <Button variant="primary" onClick={onFilterModalClose}>
                        Save
                      </Button>
                    </SimpleGrid>
                  </Stack>
                </ModalContent>
              </Modal>
            </>
          )}
        </HStack>
      </HStack>
      <Grid templateColumns="repeat(4, 25%)">
        {!isPhone && (
          <GridItem colSpan={1}>
            <ProductListFilter filter={filter} onChange={onFilterChange} />
          </GridItem>
        )}
        <GridItem colSpan={isPhone ? 4 : 3}>
          <SimpleGrid gap={10} columns={{ base: 1, md: 2, lg: 3 }}>
            {productList.isLoading && 'Loading...'}
            {!productList.isLoading && !productList.data?.count
              ? 'No products found.'
              : !productList.isLoading &&
                productList.data.data.map((product) => (
                  <ProductListItem
                    key={`prod.${product.id}`}
                    product={product}
                  />
                ))}
          </SimpleGrid>
          <Stack alignItems="center" paddingY={10}>
            <Pagination page={page} pageCount={pageCount} setPage={setPage} />
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  )
}
