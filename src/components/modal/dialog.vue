<template>
  <Teleport v-if="visible || ready" :to="container">
    <Transition name="mu-dialog">
      <div
        v-show="modalVisible"
        ref="maskEl"
        class="mu-modal-mask mu-dialog-mask"
        :class="maskClass" :style="{ zIndex }" v-bind="maskAttrs"
        @sizechange="onMaskResize" @click="onMaskClick">
        <div
          ref="dialogEl"
          class="mu-dialog" :style="[sizeStyle, position]"
          v-bind="$attrs" :dragging="dragging"
          @mousedown="onDragStart">
          <slot name="client">
            <div v-if="headerVisible" class="mu-dialog_header">
              <slot name="header">
                <slot name="header-prepend" />
                <mu-icon v-if="icon" class="mu-dialog_icon" v-bind="iconBindings" />
                <label class="mu-dialog_title" draggable="false">{{ title }}</label>
                <slot name="header-append" />
                <mu-tool-button
                  v-if="closeButton"
                  class="mu-close-button" icon="X"
                  @click="hide('$X')" />
              </slot>
            </div>
            <slot />
            <div v-if="footerVisible" class="mu-dialog_footer">
              <slot name="footer">
                <slot name="footer-prepend" />
                <component
                  :is="el.is"
                  v-for="el in footerButtons"
                  :key="el.key"
                  v-bind="el.attrs"
                  @click="el.is === 'mu-button' && onButtonClick(el)" />
                <slot name="footer-append" />
              </slot>
            </div>
          </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import './dialog.scss'

  import { useSlots, ref, shallowRef, reactive, computed, watchEffect } from 'vue'
  import { modalProps, modalEvents, useModal } from './modal'
  import { DialogButtonPresets } from './presets'
  import { sizeProps, useSize } from '@/hooks/size'
  import { useKeyGen } from '@/hooks/key-gen'
  import { isString } from '@/utils/type'
  import { debounce } from 'throttle-debounce'

  defineOptions({ name: 'MusselDialog', inheritAttrs: false })

  const emit = defineEmits([...modalEvents, 'buttonClick'])

  const props = defineProps({
    ...sizeProps,
    ...modalProps,
    zIndex: String,
    buttons: Array,
    icon: [String, Object],
    title: [String, Object],
    keepPosition: Boolean,
    ignoreButtonAction: Boolean,
    closeButton: { type: Boolean, default: true }
  })

  const slots = useSlots()

  const { ready, container, modalVisible, hide, onMaskClick } = useModal(props, emit)
  const { sizeStyle } = useSize(props)
  const { genKey } = useKeyGen()

  const headerVisible = computed(() => props.title || props.closeButton || slots.header)
  const footerVisible = computed(() => props.buttons?.length || slots.footer)

  const iconBindings = computed(() =>
    isString(props.icon) ? { icon: props.icon } : props.icon
  )

  const footerButtons = computed(() =>
    props.buttons?.map(el => {
      const { _el, is = 'mu-button', key = genKey(), ...attrs } = isString(el)
        ? { _el: el, ...DialogButtonPresets[el] }
        : el

      if (is === 'mu-button') {
        const { name = _el, action } = attrs

        attrs.caption ??= name

        delete attrs.name
        delete attrs.action

        return { is, key, name, action, attrs }
      } else {
        return { is, key, attrs }
      }
    })
  )

  const maskEl = shallowRef()
  const dialogEl = shallowRef()

  const dragging = ref()
  const position = reactive({})

  function correctPosition () {
    if (!modalVisible.value) return

    const {
      offsetTop: top,
      offsetLeft: left,
      offsetHeight: height,
      offsetWidth: width
    } = dialogEl.value

    const { clientHeight, clientWidth } = maskEl.value

    const maxTop = clientHeight - (height <= clientHeight ? height : clientHeight)
    const maxLeft = clientWidth - (width <= clientWidth ? width : clientWidth)

    if (top < 0) {
      position.top = 0
    } else if (top > maxTop) {
      position.top = `${maxTop}px`
    }

    if (left < 0) {
      position.left = 0
    } else if (left > maxLeft) {
      position.left = `${maxLeft}px`
    }
  }

  const onMaskResize = debounce(300, correctPosition)

  function onDragStart (event) {
    if (
      !['mu-dialog_header', 'mu-dialog_title']
        .find(cls => event.target.classList.contains(cls))
    ) return

    const { pageY, pageX } = event
    const { offsetTop: startY, offsetLeft: startX } = dialogEl.value

    dragging.value = true

    function onMouseMove (e) {
      position.top = `${parseInt(startY + e.pageY - pageY)}px`
      position.left = `${parseInt(startX + e.pageX - pageX)}px`
    }

    function onMouseUp () {
      dragging.value = null

      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      correctPosition()
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function onButtonClick (btn) {
    emit('buttonClick', {
      ...btn.attrs,
      name: btn.name,
      action: btn.action
    })

    if (btn.action === 'close' && !props.ignoreButtonAction) {
      hide(btn.name)
    }
  }

  watchEffect(() => {
    if (props.visible && !props.keepPosition) {
      Object.assign(position, { top: undefined, left: undefined })
    }
  })

  defineExpose({
    hide
  })
</script>
