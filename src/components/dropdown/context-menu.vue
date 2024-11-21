<template>
  <Teleport v-if="ready" :to="container">
    <div
      v-if="ready"
      ref="menu"
      class="mu-context-menu mu-dropdown-panel"
      :style="popupStyle || { display: 'none' }"
      @click="onMenuClick">
      <slot>
        <component
          :is="el.is"
          v-for="el in items"
          :key="el.key"
          v-bind="el.bindings" />
      </slot>
    </div>
  </Teleport>
</template>

<script setup>
  import { ref, shallowRef, computed, provide, inject } from 'vue'
  import { findUp } from '@/utils/dom'
  import { delay } from '@/utils/timer'

  const emit = defineEmits(['show', 'hide', 'action', 'itemclick'])
  const props = defineProps({ items: Array })

  const menu = shallowRef()
  const rootEl = inject('$mussel').rootElement

  const ready = ref()
  const visible = ref()
  const container = ref()
  const popupStyle = ref()

  const popupVisible = computed(() => visible.value)

  function updatePosition (options) {

  }

  function show (options) {
    visible.value = true
    container.value = document.fullscreenElement || rootEl

    emit('show')

    Promise
      .resolve(!ready.value && (ready.value = true) && delay())
      .then(() => {
        const el = menu.value

        el.removeAttribute('pop-up')
        el.style.transition = 'none'

        popupStyle.value = { transform: 'none', visibility: 'hidden' }

        delay()
          .then(() => updatePosition(options) && delay())
          .then(() => { el.style.transition = null })
          .then(() => visible.value && el.setAttribute('pop-up', ''))
      })
  }

  function hide () {
  }

  function onMenuClick (event) {
    if (
      findUp(event.target, pEl => {
        if (pEl.classList.contains('mu-collapse-trigger')) return true
        if (pEl === menu.value) return false
      })
    ) {
      hide()
    }
  }

  function emitAction (action) {
    emit('action', action)
  }

  function emitItemClick (item) {
    emit('itemclick', item)
  }

  provide('popup', {
    hide,
    emitAction,
    emitItemClick
  })

  defineExpose({
    visible: popupVisible,
    show,
    hide
  })
</script>
