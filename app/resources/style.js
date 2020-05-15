import c from 'color'

const colors = {
  primary: '#4A7BFF',
  secondary: '#333333',
  success: '#34A745',
  danger: '#DC3545',
}

export function getColor(name, isLight = false) {
  const color = c(colors[name])

  if (isLight) {
    return color.lighten(0.75).hex()
  }

  return color.hex()
}

export function spacing(variant) {
  const base = 10

  if (variant === 'small') return base / 2
  if (variant === 'large') return base * 1.5
  if (variant === 'xlarge') return base * 2

  return base
}
