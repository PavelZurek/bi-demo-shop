import {FC} from 'react';
import {HStack, Image, Link} from '@chakra-ui/react';

export const Header: FC = () => {
    return (
        <HStack
            justifyContent="space-between"
            borderBottom="4px solid #E4E4E4"
            paddingY="24px"
        >
            <Link href="/">
                <Image src="/images/logo.svg" alt="BEJAMAS homepage" height="25px" />
            </Link>
            <Image src="/images/shopping-cart.svg" alt="Shopping cart" height="54px" />
        </HStack>
    )
}
