import { provide, computed } from 'vue'
import { selectProps, useOptions } from './select'
import { isEmpty } from '@/utils/type'

function useMultiSelect (model, props) {
  const {
    optionLabels,
    optionComponents,
    mountOption,
    unmountOption
  } = useOptions(props)

  const comboValue = computed({
    get () {
      return isEmpty(model.value) ? null : 'any'
    },
    set (v) {
      model.value = v == null ? [] : v
    }
  })

  const selectedItems = computed(() => {
    const result = []

    model.value?.forEach(value => {
      const item = props.valueMode === 'composite'
        ? { ...value }
        : { value, label: value != null && optionLabels.value[value] }

      if (item.value == null) return
      if (item.label == null) item.label = item.value

      result.push(item)
    })

    return result
  })

  const selectedValues = computed(() =>
    selectedItems.value &&
    Object.fromEntries(selectedItems.value.map(el => [el.value, true]))
  )

  function unselectOption (option) {
    const values = model.value || []

    const idx = props.valueMode === 'composite'
      ? values.findIndex(el => el.value === option.value)
      : values.findIndex(el => el === option.value)

    if (idx >= 0) {
      model.value = values.filter((el, index) => idx !== index)
    }
  }

  function toggleOption (option) {
    const values = model.value || []
    const isComposite = props.valueMode === 'composite'

    const idx = isComposite
      ? values.findIndex(el => el.value === option.value)
      : values.findIndex(el => el === option.value)

    model.value = idx < 0
      ? [...values, isComposite ? { ...option } : option.value]
      : values.filter((el, index) => idx !== index)
  }

  provide('select', {
    selectedValues,
    mountOption,
    unmountOption,
    toggleOption
  })

  return {
    comboValue,
    optionComponents,
    selectedItems,
    unselectOption
  }
}

export {
  selectProps,
  useMultiSelect
}
