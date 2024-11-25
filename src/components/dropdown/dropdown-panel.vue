<template>
  <Teleport v-if="ready" :to="container">
    <div
      v-show="popupStyle"
      ref="thisEl"
      class="mu-dropdown-panel"
      :style="[sizeStyle, popupStyle]"
      @click="onClick"
      @mouseover.stop="onMouseOver"
      @mouseleave.stop="onMouseLeave">
      <slot />
    </div>
  </Teleport>
</template>

<script setup>
  import { ref, shallowRef, computed, inject } from 'vue'
  import { usePopupManager } from '@/hooks/popup'

  import { findUp, isElementInViewport } from '@/utils/dom'
  import { getTransitionDuration } from '@/utils/style'
  import { resolveSize } from '@/utils/size'
  import { isString } from '@/utils/type'
  import { delay } from '@/utils/timer'

  const emit = defineEmits(['expand', 'collapse'])

  const props = defineProps({
    width: String,
    height: String,
    snapTarget: null,
    position: {
      type: String,
      default: 'auto',
      validator: v => ['auto', 'fixed', 'top', 'bottom'].includes(v)
    }
  })

  const rootEl = inject('$mussel').rootElement

  const ready = ref()
  const expanded = ref()
  const popupStyle = ref()

  const thisEl = shallowRef()
  const container = shallowRef(rootEl)

  const sizeStyle = computed(() => ({
    width: resolveSize(props.width),
    height: resolveSize(props.height)
  }))

  const snapContext = {}

  function updateSnapContext (options) {
    if (snapContext.snapTo !== options.snapTo) {
      snapContext.onHide?.()
      Object.assign(snapContext, options)
    }
  }

  function show (snapOptions) {
    if (snapOptions) updateSnapContext(snapOptions)
  }
</script>
