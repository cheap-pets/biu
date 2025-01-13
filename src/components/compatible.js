import { useAttrs, onMounted, getCurrentInstance } from 'vue'
import { isDev } from '../env'

const DEPRECATED_PROPS = {
  input: {
    label: 'prefix|suffix',
    solid: 'input-style="solid"',
    underline: 'input-style="underline"'
  },
  modal: {
    'mask-action': 'easy-hide'
  },
  dropdown: {
    'trigger-action': 'dropdown-trigger'
  }
}

export function useCompatible (componentName) {
  const props = DEPRECATED_PROPS[componentName]

  if (isDev && props) {
    const attrs = useAttrs()

    onMounted(() => {
      const name = getCurrentInstance().type.name
      const entries = Object.entries(props)

      entries.forEach(([key, value]) => {
        if (attrs[key] !== undefined) {
          console.warn(
            `[MUSSEL:${name}]`,
            `prop "${key}" is deprecated, use "${value}" instead.`)
        }
      })
    })
  }
}
