export const formatDimensions = (dimensions: {
  width: number
  height: number
}): string => {
  return `${dimensions.width} x ${dimensions.height}`
}

export const formatFileSize = (size: number, fractionDigits = 0): string => {
  if (size == 0) {
    return '0.00 B'
  }
  const e = Math.floor(Math.log(size) / Math.log(1000))
  return (
    (size / Math.pow(1000, e)).toFixed(fractionDigits) +
    ' ' +
    ' KMGTP'.charAt(e) +
    'B'
  )
}

export const formatCategoryName = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export const formatCurrency = (price: number, currency: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })

  return formatter.format(price)
}
