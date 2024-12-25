import { isString } from './type'

export function findUp (el, callback) {
  while (Object(el).nodeType === 1) {
    const result = callback(el)

    if (result === false) break
    if (result) return el

    el = el.parentNode
  }
}

export function resolveElement (el) {
  return isString(el)
    ? document.querySelector(el)
    : el
}

export function isEditableElement (el) {
  return (
    (
      ['INPUT', 'TEXTAREA'].includes(el.tagName.toUpperCase()) &&
      !el.hasAttribute('readonly') &&
      !el.hasAttribute('disabled')
    ) ||
    el.hasAttribute('contenteditable')
  )
}

export function resolveSafeHTML (html = '') {
  return html
    .replace(/\s+on\w+="[^"]*"/gi, '') // event bindings
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // <script> node
}

export function isElementInViewport (element) {
  const { top, bottom, left, right } = element.getBoundingClientRect()

  return (
    top <= window.innerHeight && bottom >= 0 &&
    left <= window.innerWidth && right >= 0
  )
}
