<template>
  <Teleport v-if="ready" :to="container">
    <div
      v-show="popupStyle"
      ref="thisEl"
      v-bind="$attrs"
      v-mu-scrollbar="scrollbar"
      class="mu-dropdown-panel"
      :style="[sizeStyle, popupStyle]"
      @click="onClick"
      @mouseover.stop="clearHideTimer"
      @mouseleave.stop="delayHide">
      <slot />
    </div>
  </Teleport>
</template>

<script setup>
  import { ref, shallowRef, shallowReactive, computed, inject } from 'vue'
  import { usePopupManager } from '@/hooks/popup'

  import { findUp, isElementInViewport } from '@/utils/dom'
  import { getTransitionDuration } from '@/utils/style'
  import { delay } from '@/utils/timer'

  const emit = defineEmits(['show', 'hide'])

  const props = defineProps({
    width: String,
    height: String,
    scrollbar: Boolean,
    snapTo: null,
    trigger: {
      type: String,
      default: 'click',
      validator: v => ['hover', 'click'].includes(v)
    },
    position: {
      type: String,
      default: 'auto',
      validator: v => ['auto', 'fixed', 'top', 'bottom'].includes(v)
    }
  })

  const rootEl = inject('$mussel').rootElement

  const ready = ref()
  const visible = ref()
  const popupStyle = ref()

  const thisEl = shallowRef()
  const container = shallowRef(rootEl)
  const ctx = shallowReactive({})

  const sizeStyle = computed(() => ({
    width: ctx.width === '$same' ? undefined : ctx.width,
    height: ctx.height
  }))

  function clearHideTimer () {
    if (ctx.delayHideTimer) {
      clearTimeout(ctx.delayHideTimer)
      delete ctx.delayHideTimer
    }
  }

  function isPositionAssignable () {
    return visible.value && popupStyle.value && props.position === 'auto'
  }

  function updatePosition () {
    if (!isPositionAssignable()) return

    const el = thisEl.value
    const style = {}

    const { width: sw, top: st, right: sr, bottom: sb, left: sl } = ctx.snapTo.getBoundingClientRect()
    const { width: _dw, height: dh } = el.getBoundingClientRect()
    const { innerWidth: tw, innerHeight: th } = window

    let dw = _dw

    if ((ctx.width === '$same') || (!ctx.width && dw <= sw)) {
      dw = sw
      style.width = `${dw}px`
    }

    if ((dw > sw) && ((tw - sl >= dw) || (sr < dw))) {
      style.left = `${sl}px`
    } else {
      style.right = `${tw - sr}px`
    }

    if (th - sb > dh || st < dh) {
      el.setAttribute('position', 'bottom')
      style.top = `${sb}px`
    } else {
      el.setAttribute('position', 'top')
      style.bottom = `${th - st}px`
    }

    popupStyle.value = style

    return true
  }

  function show (snapOptions = {}) {
    clearHideTimer()

    const {
      width = props.width,
      height = props.height,
      snapTo = props.snapTo,
      trigger = props.trigger,
      onHideCallback
    } = snapOptions

    if (ctx.snapTo !== snapTo) {
      ctx.onHide?.()
      ctx.snapTo = snapTo
    }

    ctx.width = width
    ctx.height = height
    ctx.trigger = trigger
    ctx.onHide = onHideCallback

    if (!visible.value) {
      visible.value = true
      container.value = document.fullscreenElement || rootEl

      emit('show')

      Promise
        .resolve((!ready.value) && (ready.value = true) && delay())
        .then(() => {
          const el = thisEl.value

          el.removeAttribute('pop-up')
          el.style.transition = 'none'

          popupStyle.value = props.position === 'auto'
            ? { transform: 'none', visibility: 'hidden' }
            : {}

          delay()
            .then(() => updatePosition() && delay())
            .then(() => { el.style.transition = null })
            .then(() => visible.value && el.setAttribute('pop-up', ''))
        })
    }
  }

  function hide () {
    clearHideTimer()
    ctx.onHide?.()

    Object
      .keys(ctx)
      .forEach(key => delete ctx[key])

    if (visible.value) {
      visible.value = false

      emit('hide')

      const el = thisEl.value
      const duration = getTransitionDuration(el)

      el.removeAttribute('pop-up')

      delay(duration).then(() => {
        if (!visible.value) popupStyle.value = null
      })
    }
  }

  function delayHide () {
    if (ctx.trigger === 'hover') {
      clearTimeout(ctx.delayHideTimer)
      ctx.delayHideTimer = setTimeout(hide, 300)
    }
  }

  function onClick (event) {
    if (
      findUp(event.target, el => {
        if (el.classList.contains('mu-popup_hide-trigger')) return true
        if (el === thisEl.value) return false
      })
    ) {
      hide()
    }
  }

  function onCaptureEscKeyDown (event) {
    if (visible.value && ctx.trigger !== 'hover') hide()
  }

  function onCaptureMouseDown (event) {
    if (
      visible.value &&
      !ctx.snapTo?.contains(event.target) &&
      !thisEl.value?.contains(event.target)
    ) hide()
  }

  function onCaptureScroll (event) {
    if (!isPositionAssignable()) return

    if (!isElementInViewport(ctx.snapTo)) {
      hide()
    } else if (event.target.contains(ctx.snapTo)) {
      updatePosition()
    }
  }

  usePopupManager(visible, {
    hide,
    onCaptureEscKeyDown,
    onCaptureMouseDown,
    onCaptureScroll
  })

  defineExpose({
    visible,
    show,
    hide,
    delayHide
  })
</script>
