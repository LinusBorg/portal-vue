export function extractAttributes (el) {
  const map = el.hasAttributes() ? el.attributes : []
  const attrs = {}
  for (let i = 0; i < map.length; i++) {
    const attr = map[i]
    if (attr.value) {
      attrs[attr.name] = attr.value === '' ? true : attr.value
    }
  }
  return attrs
}

export function freeze (item) {
  if (Array.isArray(item) || typeof item === 'object') {
    return Object.freeze(item)
  }
  return item
}
