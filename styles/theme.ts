import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: "'Archivo', sans-serif",
    body: "'Archivo', sans-serif",
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
        productListHeading: {
          fontWeight: 700,
          fontSize: { base: '18px', lg: '30px' },
          lineHeight: { base: '19.58px', lg: '32.64px' },
        },
        productListFilterHeading: {
          fontWeight: 700,
          fontSize: '22px',
          lineHeight: '24px',
        },
        productListFilterModalHeading: {
          fontWeight: 700,
          fontSize: '34px',
          lineHeight: '37px',
        },
        productLisSorterLabel: {
          fontWeight: 400,
          fontSize: '22px',
          lineHeight: '23.94px',
          color: 'muted',
        },
        productListItemCategory: {
          fontWeight: 700,
          fontSize: '22px',
          lineHeight: '24px',
          color: 'muted',
        },
        productListItemName: {
          fontWeight: 700,
          fontSize: '34px',
          lineHeight: '37px',
        },
        productListItemPrice: {
          fontWeight: 400,
          fontSize: '29px',
          lineHeight: '31.5px',
          color: 'muted',
        },
        productCartItemName: {
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '21.75px',
        },
        productCartItemPrice: {
          fontWeight: 400,
          fontSize: '29px',
          lineHeight: '31.5px',
          color: 'muted',
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
        secondary: {
          fontWeight: 500,
          fontSize: '23px',
          lineHeight: '25px',
          letterSpacing: '0.07mm',
          backgroundColor: 'white',
          color: 'black',
          border: '3px solid black',
          borderRadius: 0,
          padding: '19px 42px',
          textTransform: 'uppercase',
        },
        pagination: {
          fontWeight: 600,
          fontSize: '29px',
          lineHeight: '31.5px',
          color: 'muted',
          _active: {
            color: 'black',
          },
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
    Checkbox: {
      variants: {
        productFilter: {
          control: {
            borderColor: 'black',
            _checked: {
              bg: 'white',
              borderColor: 'black',
              color: 'black',
              _hover: {
                bg: 'white',
                borderColor: 'black',
                color: 'black',
              },
            },
          },
          label: {
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: '23.94px',
          },
        },
      },
    },
    Select: {
      variants: {
        productFilter: {
          field: {
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: '23.94px',
            bg: 'white',
            appearance: 'none',
            paddingBottom: '1px',
            '> option, > optgroup': {
              bg: 'white',
            },
          },
          icon: {
            fontSize: '2xl',
          },
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
})

export default theme
