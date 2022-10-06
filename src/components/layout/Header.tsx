import { FC } from 'react'
import { HStack, Image, Link } from '@chakra-ui/react'
import { Cart } from '../cart/Cart'

export const Header: FC = () => {
  return (
    <HStack
      justifyContent="space-between"
      borderBottom="4px solid #E4E4E4"
      paddingY="32px"
      paddingX={{ base: '32px', lg: 0 }}
      marginX={{ base: 0, lg: '80px' }}
    >
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="BEJAMAS homepage"
          height={{ base: '20px', lg: '26px' }}
        />
      </Link>
      <Cart />
    </HStack>
  )
}
