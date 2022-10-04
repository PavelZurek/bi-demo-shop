import {Container} from '@chakra-ui/react';
import {Header} from './Header';

export default function Layout({ children }) {
    return (
        <Container variant="pageWrapper">
            <Header />
            <Container variant="contentWrapper">
                {children}
            </Container>
        </Container>
    )
}
