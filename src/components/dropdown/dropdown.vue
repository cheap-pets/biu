<template>
  <div ref="wrapperRef" class="mu-dropdown" v-on="wrapperEvents">
    <slot />
    <mu-dropdown-panel
      v-if="!dropdownPanel"
      ref="dropdownPanelRef"
      v-bind="dropdownPanelAttrs"
      v-on="dropdownPanelEvents">
      <slot name="dropdown" />
    </mu-dropdown-panel>
  </div>
</template>

<script setup>
  import {
    dropdownEvents,
    dropdownProps,
    optionalProps,
    useDropdown
  } from './dropdown-wrapper'

  defineOptions({ name: 'MusselDropdown' })

  const props = defineProps({
    ...dropdownProps,
    ...optionalProps,
    dropdownTrigger: { ...optionalProps.dropdownTrigger, default: 'hover' }
  })

  const emit = defineEmits(dropdownEvents)

  const {
    wrapperRef,
    wrapperEvents,
    dropdownVisible,
    dropdownPanelRef,
    dropdownPanelAttrs,
    dropdownPanelEvents,
    expand,
    collapse
  } = useDropdown(props, emit)

  defineExpose({
    dropdownVisible,
    expand,
    collapse
  })
</script>
