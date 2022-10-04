import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    components: {
        Container: {
            variants: {
                pageWrapper: {
                    maxWidth: '1440px',
                    padding: '8px 0',
                },
                contentWrapper: {
                    maxWidth: '100%',
                    paddingX: { base: '16px', lg: '80px' },
                },
            },
        },
    },
});

export default theme;
