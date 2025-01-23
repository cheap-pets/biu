import * as tablerIcons from './tabler-icons'
import * as customIcons from './svg'

import { isObject, isString, isSVGString } from '@/utils/type'
import { generateHash } from '@/utils/crypto'
import { sanitizeHTML } from '@/utils/dom'
import { isDev } from '@/env'

const icons = {}
const hashMap = {}

function install (data = {}, dataType) {
  if (!['svg', 'cls'].includes(dataType)) dataType = null

  function isInvalidIcon (key, icon) {
    if (!icon || (!icon.svg && !icon.cls)) {
      console.warn(`[MUSSEL:ICON] The option of icon "${key}" is invalid.`)
      return true
    }
  }

  function isEqual (icon1, icon2) {
    return !['svg', 'cls', 'animation'].find(key => {
      const value1 = icon1[key] || null
      const value2 = icon2[key] || null

      return value1 !== value2
    })
  }

  function solveExistingKey (key, icon) {
    if (!isDev) return

    const old = icons[key]

    if (old) {
      if (isEqual(old, icon)) {
        console.warn(
          '[MUSSEL:ICON]',
          `Same icon named "${key}" has been installed repeatedly.`
        )
        return false
      } else {
        const hash = old.hash
        const keys = hash && hashMap[hash]

        if (keys) {
          keys.delete(key)

          if (!keys.size) {
            delete hashMap[hash]
          }
        }
      }
    }
  }

  function solveSVGHash (key, icon) {
    if (!isDev) return

    const hash = icon.hash = generateHash(icon.svg + (icon.animation ? ':' + icon.animation : ''))
    const keys = hashMap[hash]
    const key0 = keys?.[0]

    if (!key0) {
      hashMap[hash] = new Set([key])
    } else {
      keys.add(key)

      console.warn(
        '[MUSSEL:ICON]',
        `Icon "${key}" and icon "${key0}" may have the same content.`
      )
    }
  }

  Object.entries(data).forEach(([key, value]) => {
    const icon = isObject(value)
      ? value
      : isString(value) && (
        dataType === 'svg' || isSVGString(value)
          ? { svg: value.trim() }
          : { cls: value.trim() }
      )

    if (isInvalidIcon(key, icon)) return
    if (solveExistingKey(key, icon) === false) return

    icons[key] = icon

    if (icon.svg) {
      icon.svg = sanitizeHTML(icon.svg)
      solveSVGHash(key, icon)
    }
  })
}

install(tablerIcons, 'svg')
install(customIcons, 'svg')

install({
  windowClose: {
    svg: icons.X.svg,
    animation: 'hover-rotate-180'
  },
  treeNodeExpand: {
    svg: icons.chevronRight.svg,
    animation: 'expand-rotate-90'
  },
  dropdownExpand: {
    svg: icons.chevronDown.svg,
    animation: 'expand-rotate--180'
  }
})

icons.loading.animation = 'spin'

export { icons, install }
