import {FC} from 'react';
import {Box, Button, Heading, HStack, Stack, Text, useBreakpointValue} from '@chakra-ui/react';
import Image from 'next/image';

const Recommendation: FC<{ imageUrl: string }> = ({ imageUrl }) => {
    return <Box position="relative" width="120px" height="150px">
        <Image
            src={imageUrl}
            alt=""
            layout="fill"
            objectFit="cover"
        />
    </Box>
}

const AddToCartButton: FC = () => {
    return <Button variant="primary">Add to cart</Button>
}

export const FeaturedProduct: FC = () => {
    const isPhone = useBreakpointValue({ base: true, lg: false });

    return <Stack
        paddingY="58px"
        spacing="28px"
        borderBottom="4px solid #E4E4E4"
    >
        <HStack justifyContent="space-between">
            <Heading variant="featuredProductTitle">Samurai King Resting</Heading>
            {!isPhone && <AddToCartButton />}
        </HStack>
        <Box
            height="550px"
            overflow="hidden"
            position="relative"
        >
            <Image
                src="https://images.pexels.com/photos/2187304/pexels-photo-2187304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                layout="fill"
                objectFit="cover"
            />
            <Box
                position="absolute"
                bottom={0}
                left={0}
                padding="25px 56px"
                backgroundColor="white"
                color="black"
            >
                <Text variant="bold">Photo of the day</Text>
            </Box>
        </Box>
        {isPhone && <AddToCartButton />}
        <Stack
            direction={{ base: 'column', lg: 'row'}}
            spacing="24px"
            paddingTop="16px"
            justifyContent="space-between"
        >
            <Stack
                spacing="16px"
                textAlign="left"
                maxWidth={{ base: '100%', lg: '60%' }}
            >
                <Heading variant="featuredProductSubtitle">About the Samurai King Resting</Heading>
                <Heading variant="featuredProductSubtitle" color="muted">Pets</Heading>
                <Text color="muted">
                    So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.
                </Text>
            </Stack>
            <Stack spacing="24px" textAlign={{ base: 'left', lg: 'right' }}>
                <Stack spacing="32px">
                    <Heading variant="featuredProductSubtitle">People also buy</Heading>
                    <HStack spacing="30px" justifyContent={{ base: 'start', lg: 'end' }}>
                        <Recommendation imageUrl="https://images.pexels.com/photos/2765871/pexels-photo-2765871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        <Recommendation imageUrl="https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        <Recommendation imageUrl="https://images.pexels.com/photos/5720809/pexels-photo-5720809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </HStack>
                </Stack>
                <Stack>
                    <Heading variant="featuredProductSubtitle">Details</Heading>
                    <Text variant="small" color="muted">Size: 1020 x 1020 pixels</Text>
                    <Text variant="small" color="muted">Size: 15 mb</Text>
                </Stack>
            </Stack>
        </Stack>
    </Stack>
}
