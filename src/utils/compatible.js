import { pascalCase } from '@/utils/case'

const warned = {}

export function outputDeprecatedWarning ({
  component = '',
  type = '',
  deprecated = 'unknown',
  replacement = '',
  once = true
}) {
  const prefix = 'MUSSEL' + (component && `:${component.toUpperCase()}`)

  if (once) {
    const onceKey = `${prefix}_${type}_${deprecated}_${replacement}`

    if (warned[onceKey]) return
    else warned[onceKey] = true
  }

  const message =
    (type && `${pascalCase(type)} `) +
    (deprecated + ' is deprecated, and will be removed in future versions.') +
    (replacement && ` Please use "${replacement}" instead.`)

  console.warn(`[${prefix}]`, message)
}
