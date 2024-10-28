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
      (props.options || Array.from(mountedOptions.value)).forEach(el => {
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

  const selectedOptions = computed(() => {
    if (!isMultiple.value) return

    const result = []
    const values = model.value
    const labels = labelsMap.value

    values.forEach(value => {
      const item = isCompositeValue.value
        ? { ...value }
        : value in labels
          ? { value, label: labels[value] }
          : { value }

      if (item.value == null) return
      if (item.label == null) item.label = item.value

      result.push(item)
    })

    return result
  })

  const selectedValues = computed(() =>
    selectedOptions.value &&
    Object.fromEntries(selectedOptions.value.map(el => [el.value, true]))
  )

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

  function unselectOption (option) {
    const value = option.value
    const modelValue = model.value
    const isComposite = isCompositeValue.value

    const idx = modelValue.findIndex(el =>
      isComposite
        ? el.value === value
        : el === value
    )

    if (idx >= 0) {
      model.value = modelValue.filter((el, index) => idx !== index)
    }
  }

  function onOptionClick (option) {
    const value = option.value
    const modelValue = model.value
    const isComposite = isCompositeValue.value

    if (isMultiple.value) {
      const idx = modelValue.findIndex(el =>
        isComposite
          ? el.value === value
          : el === value
      )

      model.value = idx < 0
        ? [...modelValue, isComposite ? { ...option } : option.value]
        : modelValue.filter((el, index) => idx !== index)
    } else {
      model.value = isComposite
        ? pick(option, ['value', 'label'])
        : value
    }
  }

  provide('select', {
    isMultiple,
    selectedValues,
    mountOption,
    unmountOption,
    onOptionClick
  })

  return {
    isMultiple,
    comboValue,
    optionItems,
    selectedOptions,
    selectedValues,
    unselectOption
  }
}
