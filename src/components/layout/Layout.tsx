import {Container} from '@chakra-ui/react';
import {Header} from './Header';

export default function Layout({ children }) {
    return (
        <Container variant="pageWrapper">
            <Header />
            {children}
        </Container>
    )
}
