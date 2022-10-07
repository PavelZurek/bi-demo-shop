import { FC } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface PaginationProps {
  page: number
  pageCount: number
  setPage: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  page,
  pageCount,
  setPage,
}) => {
  const paginationButtons = []

  if (pageCount > 1) {
    if (page !== 1 && pageCount > 1) {
      paginationButtons.push(
        <Button
          key={'set-page-prev'}
          aria-label="Previous page"
          variant="pagination"
          onClick={() => setPage(page - 1)}
          isActive={true}
        >
          <ChevronLeftIcon />
        </Button>
      )
    }
    for (let i = 1; i <= pageCount; i++) {
      paginationButtons.push(
        <Button
          key={`set-page-${i}`}
          aria-label={`Page ${i}`}
          variant="pagination"
          onClick={() => setPage(i)}
          isActive={page === i}
        >
          {i}
        </Button>
      )
    }
    if (page !== pageCount && pageCount > 1) {
      paginationButtons.push(
        <Button
          key={'set-page-next'}
          aria-label="Next page"
          variant="pagination"
          onClick={() => setPage(page + 1)}
          isActive={true}
        >
          <ChevronRightIcon />
        </Button>
      )
    }
  }

  return <Box>{paginationButtons}</Box>
}
