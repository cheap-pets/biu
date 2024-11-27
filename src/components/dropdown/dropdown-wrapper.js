import './dropdown.scss'

import { ref, shallowRef, computed } from 'vue'

export const dropdownEvents = [
  'action',
  'dropdown:show',
  'dropdown:hide',
  'dropdown:itemclick'
]

export const dropdownProps = {
  dropdownClass: null,
  dropdownStyle: null,
  dropdownSnapTo: null,
  dropdownPanel: Object,
  dropdownAttrs: Object,
  dropdownWidth: String,
  dropdownHeight: String,
  dropdownDisabled: Boolean,
  dropdownScrollbar: Boolean,
  dropdownIcon: { type: String, default: 'chevronDown' }
}

export const optionalProps = {
  dropdownItems: Array,
  dropdownTrigger: {
    type: String,
    default: 'click',
    validator: v => ['hover', 'click'].includes(v)
  },
  dropdownPosition: {
    type: String,
    default: 'auto',
    validator: v => ['auto', 'fixed', 'top', 'bottom'].includes(v)
  }
}

export function useDropdown (props, emit, options = {}) {
  const {
    wrapperRef = shallowRef(),
    dropdownPanelRef = shallowRef()
  } = options

  const expanded = ref()

  const dropdownVisible = computed(() => expanded.value)

  const dropdownPanel = computed(() =>
    props.dropdownPanel || dropdownPanelRef.value
  )

  const dropdownPanelAttrs = computed(() => ({
    style: props.dropdownStyle,
    class: props.dropdownClass,
    trigger: props.dropdownTrigger,
    position: props.dropdownPosition,
    scrollbar: props.dropdownScrollbar,
    dropdownItems: props.dropdownItems
  }))

  const dropdownIconAttrs = computed(() => ({
    icon: props.dropdownIcon,
    class: props.dropdownIcon === 'chevronDown' ? 'mu-dropdown-arrow' : null,
    expanded: expanded.value || null
  }))

  const snapTo = computed(() => {
    const wrapperEl = wrapperRef.value?.$el || wrapperRef.value
    const target = props.dropdownSnapTo

    return target
      ? target === '$parent'
        ? wrapperEl?.parentNode
        : target.$el || target
      : wrapperEl
  })

  function onDropdownShow () {
    expanded.value = true
    emit('dropdown:show')
  }

  function onDropdownHide () {
    expanded.value = false
    emit('dropdown:hide')
  }

  function expand () {
    dropdownPanel.value.show({
      snapTo: snapTo.value,
      width: props.dropdownWidth,
      height: props.dropdownHeight,
      trigger: props.dropdownTrigger
    })
  }

  function collapse () {
    dropdownPanel.value.hide()
  }

  function toggle () {
    if (expanded.value) collapse()
    else if (!props.dropdownDisabled) expand()
  }

  function onTriggerClick (event) {
    if (props.dropdownTrigger === 'click') {
      toggle()
      event.stopPropagation()
    }
  }

  function onTriggerMouseOver () {
    if (props.dropdownTrigger === 'hover') expand()
  }

  function onTriggerMouseLeave () {
    dropdownPanel.value.delayHide()
  }

  function emitAction (action) {
    emit('action', action)
  }

  function emitItemClick (item) {
    emit('dropdown:itemclick', item)
  }

  function updateDropdownPosition () {
    dropdownPanel.value?.updatePosition()
  }

  const wrapperEvents = {
    click: onTriggerClick,
    mouseover: onTriggerMouseOver,
    mouseleave: onTriggerMouseLeave
  }

  const dropdownPanelEvents = {
    show: onDropdownShow,
    hide: onDropdownHide,
    action: emitAction,
    itemclick: emitItemClick
  }

  return {
    wrapperRef,
    wrapperEvents,
    dropdownVisible,
    dropdownPanelRef,
    dropdownPanelAttrs,
    dropdownPanelEvents,
    dropdownIconAttrs,
    snapTo,
    toggle,
    expand,
    collapse,
    updateDropdownPosition
  }
}
