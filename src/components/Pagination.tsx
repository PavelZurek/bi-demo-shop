import { FC } from 'react'
import { Button } from '@chakra-ui/react'

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

  if (page !== 1 && pageCount > 1) {
    paginationButtons.push(
      <Button key={'set-page-first'} onClick={() => setPage(page - 1)}>
        &lt;
      </Button>
    )
  }
  for (let i = 0; i < pageCount; i++) {
    paginationButtons.push(
      <Button
        key={`set-page-${i + 1}`}
        onClick={() => setPage(i + 1)}
        isActive={page === i + 1}
      >
        {i + 1}
      </Button>
    )
  }
  if (page !== pageCount && pageCount > 1) {
    paginationButtons.push(
      <Button key={'set-page-last'} onClick={() => setPage(page + 1)}>
        &gt;
      </Button>
    )
  }

  return <>{paginationButtons}</>
}
