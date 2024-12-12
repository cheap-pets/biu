import { computed } from 'vue'
import { icons } from '@/icons'

const warned = {}

function resolveIconClass (value) {
  return (
    value.startsWith('.') &&
    { cls: value.replaceAll('.', ' ').replace(/ +/g, ' ') }
  )
}

export function useIcon (props) {
  const data = computed(() => {
    const value = props.icon?.trim()
    const icon = value && (icons[value] || resolveIconClass(value))

    if (value && !icon && !warned[value]) {
      warned[value] = true
      console.warn('[MUSSEL:ICON]', `Unregistered icon name or invalid icon-font class "${value}" is detected.`)
    }

    return { ...icon }
  })

  return { data }
}
