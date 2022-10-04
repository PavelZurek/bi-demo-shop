import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    components: {
        Container: {
            variants: {
                pageWrapper: {
                    maxWidth: '1440px',
                    padding: '8px 80px',
                },
            },
        },
    },
});

export default theme;
