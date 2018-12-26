let _id = 1
export function createEl(
  el = document.createElement('dIV'),
  className = 'test'
) {
  el.classList.add(className)
  const id = (el.id = `test-${_id++}`)
  const body = document.querySelector('body')
  body.appendChild(el)
  return {
    el,
    id,
  }
}
