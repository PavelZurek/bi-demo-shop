import {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import Layout from '../src/components/layout/Layout';
import theme from '../styles/theme';

import '@fontsource/archivo'
import '@fontsource/archivo/400.css'
import '@fontsource/archivo/500.css'
import '@fontsource/archivo/700.css'

function MyApp({ Component, pageProps }: AppProps) {
    return <ChakraProvider theme={theme}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ChakraProvider>
}

export default MyApp
