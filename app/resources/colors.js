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
