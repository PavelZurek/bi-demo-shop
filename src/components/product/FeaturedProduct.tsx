import { FC } from 'react'
import {
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import { Product } from '../../models/Product'
import {
  formatCategoryName,
  formatDimensions,
  formatFileSize,
} from '../../helpers/format'
import { AddToCartButton } from './AddToCartButton'

const Recommendation: FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <Box position="relative" width="120px" height="150px">
      <Image src={imageUrl} alt="" layout="fill" objectFit="cover" />
    </Box>
  )
}

export const FeaturedProduct: FC<{ product: Product }> = ({ product }) => {
  const isPhone = useBreakpointValue({ base: true, lg: false })

  return (
    <Stack paddingY={16} spacing={7} borderBottom="4px solid #E4E4E4">
      <HStack justifyContent="space-between">
        <Heading variant="featuredProductTitle">{product.name}</Heading>
        {!isPhone && <AddToCartButton product={product} />}
      </HStack>
      <Box height="550px" overflow="hidden" position="relative">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          layout="fill"
          objectFit="cover"
        />
        {product.featured && (
          <Box
            position="absolute"
            bottom={0}
            left={0}
            paddingX={16}
            paddingY={6}
            backgroundColor="white"
            color="black"
          >
            <Text variant="bold">Photo of the day</Text>
          </Box>
        )}
      </Box>
      {isPhone && <AddToCartButton product={product} />}
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={6}
        paddingTop={4}
        justifyContent="space-between"
      >
        <Stack
          spacing={4}
          textAlign="left"
          maxWidth={{ base: '100%', lg: '60%' }}
        >
          <Heading variant="featuredProductSubtitle">
            About the {product.name}
          </Heading>
          <Heading variant="featuredProductSubtitle" color="muted">
            {formatCategoryName(product.category)}
          </Heading>
          {product.details?.description && (
            <Text color="muted">{product.details.description}</Text>
          )}
        </Stack>
        <Stack spacing={6} textAlign={{ base: 'left', lg: 'right' }}>
          <Stack spacing={8}>
            <Heading variant="featuredProductSubtitle">People also buy</Heading>
            <HStack spacing={8} justifyContent={{ base: 'start', lg: 'end' }}>
              {product.recommendations.map((rp) => (
                <Recommendation
                  key={`recommentarion-${product.id}-${rp.productByRecommendedProductId.id}`}
                  imageUrl={rp.productByRecommendedProductId.imageUrl}
                />
              ))}
            </HStack>
          </Stack>
          <Stack>
            <Heading variant="featuredProductSubtitle">Details</Heading>
            {product.details?.dimensions && (
              <Text variant="small" color="muted">
                Size: {formatDimensions(product.details.dimensions)} pixels
              </Text>
            )}
            {product.details?.size && (
              <Text variant="small" color="muted">
                Size: {formatFileSize(product.details.size)}
              </Text>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
