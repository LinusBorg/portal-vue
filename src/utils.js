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

export function updateAttributes (attrs, el) {
  // special treatment for class
  if (attrs.class) {
    attrs.class.trim().split(' ').forEach((klass) => {
      el.classList.add(klass)
    })
    delete attrs.class
  }

  const keys = Object.keys(attrs)

  for (let i = 0; i < keys.length; i++) {
    el.setAttribute(keys[i], attrs[keys[i]])
  }
}

export function freeze (item) {
  if (Array.isArray(item) || typeof item === 'object') {
    return Object.freeze(item)
  }
  return item
}

export function combinePassengers (transports) {
  let passengers = []
  for (const transport of transports) {
    passengers = passengers.concat(transport.passengers)
  }
  return passengers
}
