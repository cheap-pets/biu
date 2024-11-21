import './dropdown.scss'

import { ref, shallowRef, computed, provide, inject } from 'vue'
import { findUp, isElementInViewport } from '@/utils/dom'
import { getTransitionDuration } from '@/utils/style'
import { usePopupManager } from '@/hooks/popup'
import { resolveSize } from '@/utils/size'
import { isString } from '@/utils/type'
import { delay } from '@/utils/timer'

export const dropdownProps = {
  dropdownDisabled: Boolean,
  dropdownHost: null,
  dropdownClass: null,
  dropdownStyle: null,
  dropdownAttrs: Object,
  dropdownWidth: String,
  dropdownHeight: String,
  dropdownScrollbar: [Boolean, String],
  dropdownIcon: {
    type: String,
    default: 'chevronDown'
  }
}

export const optionalProps = {
  dropdownItems: Array,
  dropdownPositioned: {
    type: [Boolean, String],
    validator: v => [true, false, 'top', 'bottom'].includes(v)
  },
  dropdownTrigger: {
    type: String,
    default: 'click',
    validator: v => ['hover', 'click'].includes(v)
  }
}

export const dropdownEvents = [
  'action',
  'dropdown:show',
  'dropdown:hide',
  'dropdown:itemclick'
]

export function useDropdown (props, emit, options = {}) {
  const {
    wrapper = shallowRef(),
    dropdownPanel = shallowRef()
  } = options

  const rootEl = inject('$mussel').rootElement

  const expanded = ref()
  const popupStyle = ref()
  const dropdownReady = ref()
  const dropdownContainer = shallowRef(rootEl)

  const dropdownPanelAttrs = computed(() => ({
    style: [
      props.dropdownStyle,
      {
        width: resolveSize(props.dropdownWidth),
        height: resolveSize(props.dropdownHeight)
      },
      popupStyle.value || { display: 'none' }
    ],
    ...(
      isString(props.dropdownPositioned)
        ? { position: props.dropdownPositioned }
        : undefined
    ),
    ...props.dropdownAttrs
  }))

  const dropdownIconAttrs = computed(() => ({
    icon: props.dropdownIcon,
    class: props.dropdownIcon === 'chevronDown' ? 'mu-dropdown-arrow' : null,
    expanded: expanded.value || null
  }))

  const hostElement = computed(() => {
    const wrapperEl = wrapper.value?.$el || wrapper.value
    const host = props.dropdownHost

    return host
      ? host === '$parent'
        ? wrapperEl?.parentNode
        : host.$el || host
      : wrapperEl
  })

  const dropdownElement = computed(() => dropdownPanel.value?.$el || dropdownPanel.value)
  const dropdownVisible = computed(() => expanded.value || null)

  const isHoverTrigger = computed(() => props.dropdownTrigger === 'hover')

  usePopupManager(dropdownVisible, {
    hide,
    onCaptureEscKeyDown,
    onCaptureMouseDown,
    onCaptureScroll
  })

  let delayHideTimer

  function resetHideTimer () {
    if (delayHideTimer) {
      clearTimeout(delayHideTimer)
      delayHideTimer = null
    }
  }

  function updatePosition () {
    if (!popupStyle.value || props.dropdownPositioned) return

    const element = dropdownElement.value
    const style = {}

    const { width: hw, top: ht, right: hr, bottom: hb, left: hl } = hostElement.value.getBoundingClientRect()
    const { width: dw, height: dh } = element.getBoundingClientRect()
    const { innerWidth: tw, innerHeight: th } = window

    if (props.dropdownWidth === '$same' || dw <= hw) {
      style.width = `${hw}px`
    }

    if ((dw > hw) && ((tw - hl >= dw) || (hr < dw))) {
      style.left = `${hl}px`
    } else {
      style.right = `${tw - hr}px`
    }

    if (th - hb > dh || ht < dh) {
      element.setAttribute('position', 'bottom')
      style.top = `${hb}px`
    } else {
      element.setAttribute('position', 'top')
      style.bottom = `${th - ht}px`
    }

    popupStyle.value = style

    return true
  }

  function show () {
    resetHideTimer()

    if (!expanded.value) {
      expanded.value = true
      dropdownContainer.value = document.fullscreenElement || rootEl

      emit('dropdown:show')

      Promise
        .resolve(
          (!dropdownReady.value) &&
          (dropdownReady.value = true) &&
          delay()
        )
        .then(() => {
          const ddEl = dropdownElement.value

          ddEl.removeAttribute('pop-up')
          ddEl.style.transition = 'none'

          popupStyle.value = props.dropdownPositioned
            ? {}
            : { transform: 'none', visibility: 'hidden' }

          delay()
            .then(() => updatePosition() && delay())
            .then(() => { ddEl.style.transition = null })
            .then(() => expanded.value && ddEl.setAttribute('pop-up', ''))
        })
    }
  }

  function hide () {
    resetHideTimer()

    if (expanded.value) {
      expanded.value = false

      emit('dropdown:hide')

      const ddEl = dropdownElement.value
      const duration = getTransitionDuration(ddEl)

      ddEl.removeAttribute('pop-up')

      delay(duration).then(() => {
        if (!expanded.value) popupStyle.value = null
      })
    }
  }

  function delayHide () {
    if (isHoverTrigger.value) {
      clearTimeout(delayHideTimer)
      delayHideTimer = setTimeout(hide, 300)
    }
  }

  function toggle () {
    if (expanded.value) hide()
    else if (!props.dropdownDisabled) show()
  }

  function onTriggerClick () {
    if (!isHoverTrigger.value) toggle()
  }

  function onTriggerMouseOver () {
    if (isHoverTrigger.value) show()
  }

  function onTriggerMouseLeave () {
    if (isHoverTrigger.value) delayHide()
  }

  function onDropdownClick (event) {
    if (
      findUp(event.target, pEl => {
        if (pEl.classList.contains('mu-dropdown_collapse-trigger')) return true
        if (pEl === dropdownElement.value) return false
      })
    ) {
      hide()
    }
  }

  function onDropdownMouseOver () {
    resetHideTimer()
  }

  function onDropdownMouseLeave () {
    onTriggerMouseLeave()
  }

  function onCaptureEscKeyDown (event) {
    if (expanded.value && !isHoverTrigger.value) hide()
  }

  function onCaptureMouseDown (event) {
    if (
      expanded.value &&
      !hostElement.value?.contains(event.target) &&
      !dropdownElement.value?.contains(event.target)
    ) hide()
  }

  function onCaptureScroll (event) {
    if (!isElementInViewport(hostElement.value)) {
      hide()
    } else if (
      expanded.value &&
      event.target.contains(hostElement.value)
      // && !dropdownElement.value.contains(event.target)
    ) updatePosition()
  }

  function emitAction (action) {
    emit('action', action)
  }

  function emitItemClick (item) {
    emit('dropdown:itemclick', item)
  }

  provide('popup', {
    visible: dropdownVisible,
    hide,
    emitAction,
    emitItemClick
  })

  return {
    wrapper,
    dropdownPanel,
    dropdownReady,
    dropdownVisible,
    dropdownContainer,
    dropdownIconAttrs,
    dropdownPanelAttrs,
    expand: show,
    collapse: hide,
    toggle,
    updatePosition,
    onTriggerClick,
    onTriggerMouseOver,
    onTriggerMouseLeave,
    onDropdownClick,
    onDropdownMouseOver,
    onDropdownMouseLeave
  }
}
