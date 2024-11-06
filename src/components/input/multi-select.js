import { ref, provide, computed } from 'vue'
import { selectProps, useOptions } from './select'
import { isEmpty } from '@/utils/type'

const multiSelectProps = {
  ...selectProps,
  showTagTooltip: Boolean,
  showFilteredOptions: Boolean,
  maxVisibleTags: { type: Number, default: 3 }
}

function useMultiSelect (model, props) {
  const {
    optionLabels,
    optionComponents,
    mountOption,
    unmountOption
  } = useOptions(props)

  const filterValues = ref()

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

  const values = computed(() =>
    new Set(selectedItems.value.map(el => el.value))
  )

  const visibleTags = computed(() => {
    const max = props.maxVisibleTags
    const items = selectedItems.value
    const total = items.length
    const more = total - max

    return !max || max >= total
      ? selectedItems.value
      : [
          ...items.slice(0, max),
          { more: true, value: '$$more$$', label: `+${more > 99 ? 99 : more}` }
        ]
  })

  function toggleOption (option, checked) {
    const modelValue = model.value || []
    const isComposite = props.valueMode === 'composite'

    const idx = isComposite
      ? modelValue.findIndex(el => el.value === option.value)
      : modelValue.findIndex(el => el === option.value)

    if ((checked && idx >= 0) || (checked === false && idx < 0)) return

    model.value = idx < 0
      ? [...modelValue, isComposite ? { ...option } : option.value]
      : modelValue.filter((el, index) => idx !== index)
  }

  provide('select', {
    values,
    filterValues,
    mountOption,
    unmountOption,
    toggleOption
  })

  return {
    comboValue,
    visibleTags,
    filterValues,
    selectedItems,
    optionComponents,
    toggleOption
  }
}

export {
  multiSelectProps,
  useMultiSelect
}
