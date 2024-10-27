import { provide, ref, toRef, computed } from 'vue'
import { useListItems } from '../list/list-items'
import { pick } from '@/utils/object'

export const selectProps = {
  options: Array,
  optionKey: { type: String, default: 'value' },
  valueMode: { type: String, default: 'normal', validator: v => ['normal', 'composite'].includes(v) }
}

export function useSelect (model, props) {
  const mountedOptions = ref(new Set())

  const isMultiple = computed(() => Array.isArray(model.value))
  const isCompositeValue = computed(() => props.valueMode === 'composite')

  const labelsMap = computed(() => {
    const result = {}

    if (!props.editable && !isCompositeValue.value) {
      (props.options || Array.from(mountedOptions.value))
        .forEach(el => {
          if (el.value != null) {
            result[el.value] = el.label ?? el.value
          }
        })
    }

    return result
  })

  const comboValue = computed({
    get () {
      const v = model.value

      return isMultiple.value
        ? v
        : props.editable || v == null
          ? v
          : isCompositeValue.value
            ? v.label ?? v.value
            : v in labelsMap.value
              ? labelsMap.value[v]
              : v
    },
    set (v) {
      model.value = isMultiple.value && v == null
        ? []
        : v
    }
  })

  const selections = computed(() => {
    const result = []

    if (isMultiple.value) {
      const values = model.value
      const labels = labelsMap.value

      values.forEach(value => {
        const item = isCompositeValue.value
          ? value
          : value in labels
            ? { value, label: labels[value] }
            : { value }

        if (item.value != null) result.push(item)
      })
    }

    return result
  })

  const { items: optionItems } = useListItems(
    toRef(props, 'options'),
    {
      key: props.optionKey,
      defaultComponent: 'mu-option'
    }
  )

  function mountOption (option) {
    if (!props.options && !props.editable && option.value != null) {
      mountedOptions.value.add(option)
    }
  }

  function unmountOption (option) {
    if (!props.options && !props.editable) {
      mountedOptions.value.delete(option)
    }
  }

  function onOptionClick (option) {
    const value = option.value
    const modelValue = model.value

    if (isMultiple.value) {
      const exist = modelValue.find(el => el.value === value)

      if (exist) {
        model.value = modelValue.filter(el => el.value !== value)
      } else {
        model.value = [...modelValue, { ...option }]
      }
    } else {
      model.value = isCompositeValue.value
        ? pick(option, ['value', 'label'])
        : value
    }
  }

  provide('select', {
    isMultiple,
    mountOption,
    unmountOption,
    onOptionClick
  })

  return {
    isMultiple,
    comboValue,
    selections,
    optionItems
  }
}
