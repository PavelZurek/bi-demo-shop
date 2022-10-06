import { FC } from 'react'
import { Box, Checkbox, Stack, Text } from '@chakra-ui/react'
import { useCategories } from '../../hooks/useCategories'
import { formatCategoryName } from '../../helpers/format'
import { ProductListParamsFilter } from '../../services/ProductService'

const ranges = [
  { label: 'Lower than $20', value: { max: 20 } },
  { label: '$20 - $100', value: { min: 20, max: 100 } },
  { label: '$100 - $200', value: { min: 100, max: 200 } },
  { label: 'More than $200', value: { min: 200 } },
]

export const ProductListFilter: FC<{
  filter: ProductListParamsFilter
  onChange: (filter: ProductListParamsFilter) => void
}> = ({ filter, onChange }) => {
  const categories = useCategories()

  const toggleCategory = (category: string) => {
    const newFilter = { ...filter }
    if (newFilter.category.includes(category)) {
      newFilter.category = newFilter.category.filter((v) => v !== category)
    } else {
      newFilter.category.push(category)
    }
    onChange(newFilter)
  }

  const setRange = (value?: { min?: number; max?: number }) => {
    const newFilter = { ...filter }
    newFilter.price = value
    onChange(newFilter)
  }

  return (
    <Stack>
      <Box>
        <Text variant="productListFilterHeading">Category</Text>
        {!categories.isLoading &&
          categories.data.map((category) => (
            <Checkbox
              key={`product-filter-category-${category}`}
              isChecked={filter.category.includes(category)}
              onChange={() => toggleCategory(category)}
            >
              {formatCategoryName(category)}
            </Checkbox>
          ))}
      </Box>
      <Box>
        <Text variant="productListFilterHeading">Price range</Text>
        {ranges.map((range, i) => {
          const isChecked =
            filter.price?.min == range.value?.min &&
            filter.price?.max == range.value?.max

          return (
            <Checkbox
              key={`product-filter-range-${i}`}
              isChecked={isChecked}
              onChange={() => setRange(isChecked ? undefined : range.value)}
            >
              {range.label}
            </Checkbox>
          )
        })}
      </Box>
    </Stack>
  )
}
