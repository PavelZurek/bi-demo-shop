import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: '\'Archivo\', sans-serif',
        body: '\'Archivo\', sans-serif',
    },
    colors: {
        muted: '#656565',
    },
    components: {
        Text: {
            baseStyle: {
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '27px',
            },
            variants: {
                bold: {
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '22px',
                },
                small: {
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '17.5px',
                },
            },
        },
        Button: {
            variants: {
                primary: {
                    fontWeight: 500,
                    fontSize: '23px',
                    lineHeight: '25px',
                    letterSpacing: '0.07mm',
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: 0,
                    padding: '22px 45px',
                    textTransform: 'uppercase',
                },
            },
        },
        Heading: {
            baseStyle: {
                fontWeight: 700,
            },
            variants: {
                featuredProductTitle: {
                    fontSize: '32px',
                    lineHeight: '35px',
                },
                featuredProductSubtitle: {
                    fontSize: '22px',
                    lineHeight: '24px',
                },
            },
        },
        Container: {
            variants: {
                pageWrapper: {
                    maxWidth: '1440px',
                    padding: '0',
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
