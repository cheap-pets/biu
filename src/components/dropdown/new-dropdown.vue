<template>
  <div
    ref="wrapper"
    class="mu-dropdown"
    @click="onTriggerClick"
    @mouseover="onTriggerMouseOver"
    @mouseleave="onTriggerMouseLeave">
    <slot />
    <mu-dropdown-panel
      v-if="!dropdownPanel"
      ref="localDropdownPanel"
      v-bind="dropdownAttrs"
      :snap-to="snapTo"
      :style="dropdownStyle"
      :class="dropdownClass"
      :trigger="dropdownTrigger"
      :position="dropdownPosition"
      :scrollbar="dropdownScrollbar"
      @show="onDropdownShow"
      @hide="onDropdownHide">
      <slot name="dropdown">
        <component
          :is="el.is"
          v-for="el in items" :key="el.key"
          v-bind="el.bindings" />
      </slot>
    </mu-dropdown-panel>
  </div>
</template>

<script setup>
  import { ref, shallowRef, toRef, computed, provide } from 'vue'
  import { useListItems } from '../list/list-items'

  defineOptions({ name: 'MusselNewDropdown' })

  const emit = defineEmits([
    'action',
    'dropdown:show',
    'dropdown:hide',
    'dropdown:itemclick'
  ])

  const props = defineProps({
    dropdownPanel: null,
    dropdownClass: null,
    dropdownStyle: null,
    dropdownSnapTo: null,
    dropdownItems: Array,
    dropdownAttrs: Object,
    dropdownWidth: String,
    dropdownHeight: String,
    dropdownDisabled: Boolean,
    dropdownScrollbar: Boolean,
    dropdownIcon: {
      type: String,
      default: 'chevronDown'
    },
    dropdownTrigger: {
      type: String,
      default: 'hover',
      validator: v => ['hover', 'click'].includes(v)
    },
    dropdownPosition: {
      type: String,
      default: 'auto',
      validator: v => ['auto', 'fixed', 'top', 'bottom'].includes(v)
    }
  })

  const wrapper = shallowRef()
  const localDropdownPanel = shallowRef()

  const expanded = ref()

  const ddPanel = computed(() =>
    props.dropdownPanel || localDropdownPanel.value
  )

  const snapTo = computed(() => {
    const wrapperEl = wrapper.value?.$el || wrapper.value
    const target = props.dropdownSnapTo

    return target
      ? target === '$parent'
        ? wrapperEl?.parentNode
        : target.$el || target
      : wrapperEl
  })

  const { items } = useListItems(
    toRef(props, 'dropdownItems'),
    { defaultComponent: 'mu-dropdown-item' }
  )

  function onDropdownShow () {
    expanded.value = true
    emit('dropdown:show')
  }

  function onDropdownHide () {
    expanded.value = false
    emit('dropdown:hide')
  }

  function expand () {
    ddPanel.value.show()
  }

  function collapse () {
    ddPanel.value.hide()
  }

  function onTriggerClick () {
    if (props.dropdownTrigger === 'click') {
      if (expanded.value) collapse()
      else if (!props.dropdownDisabled) expand()
    }
  }

  function onTriggerMouseOver () {
    if (props.dropdownTrigger === 'hover') expand()
  }

  function onTriggerMouseLeave () {
    ddPanel.value.delayHide()
  }

  function emitAction (action) {
    emit('action', action)
  }

  function emitItemClick (item) {
    emit('dropdown:itemclick', item)
  }

  provide('popup', {
    hide: collapse,
    emitAction,
    emitItemClick
  })

  defineExpose({
    expand,
    collapse
  })
</script>
