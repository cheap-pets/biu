<template>
  <div
    ref="wrapper"
    class="mu-input"
    v-bind="wrapperAttrs"
    @click="onWrapperClick"
    @sizechange="updatePosition">
    <component
      :is="pre.is"
      v-if="pre"
      v-bind="pre.attrs"
      @click.stop="onPrefixClick">
      {{ pre.content }}
    </component>
    <slot v-bind="inputAttrs">
      <input v-model="model" v-bind="inputAttrs" @click.stop="onInputClick">
    </slot>
    <mu-icon v-if="clearButtonVisible" v-bind="clearButtonAttrs" @click.stop="clear" />
    <mu-icon v-if="expandable" tag="a" v-bind="dropdownIconAttrs" />
    <component
      :is="suf.is"
      v-if="suf"
      v-bind="suf.attrs"
      @click.stop="onSuffixClick">
      {{ suf.content }}
    </component>
    <Teleport v-if="expandable && dropdownReady" :to="dropdownContainer">
      <div
        ref="dropdownPanel"
        v-mu-scrollbar="dropdownScrollbar"
        v-bind="dropdownPanelAttrs"
        class="mu-dropdown-panel"
        :class="dropdownClass"
        @click="onDropdownClick">
        <slot name="dropdown" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { inputProps, inputEvents, useInput } from './input'
  import { dropdownProps, dropdownEvents, useDropdown } from '../dropdown/dropdown'

  defineOptions({ name: 'MusselComboWrapper' })

  const model = defineModel()

  const props = defineProps({
    ...inputProps,
    ...dropdownProps,
    editable: Boolean
  })

  const emit = defineEmits([
    ...inputEvents,
    ...dropdownEvents
  ])

  const {
    wrapperAttrs,
    inputAttrs,
    prefix: pre,
    suffix: suf,
    onPrefixClick,
    onSuffixClick,
    clearButtonVisible,
    clearButtonAttrs
  } = useInput(model, props, emit)

  const {
    wrapper,
    dropdownPanel,
    dropdownReady,
    dropdownVisible,
    dropdownContainer,
    dropdownIconAttrs,
    dropdownPanelAttrs,
    expand,
    collapse,
    toggle: toggleDropdown,
    updatePosition,
    onDropdownClick
  } = useDropdown(props, emit)

  const expandable = computed(() =>
    !props.disabled &&
    !props.readonly &&
    !props.dropdownDisabled
  )

  function clear () {
    model.value = null
    collapse()
  }

  function onWrapperClick () {
    if (!props.disabled && !props.readonly) toggleDropdown()
  }

  function onInputClick () {
    if (!props.readonly && props.editable === false) toggleDropdown()
  }

  defineExpose({
    dropdownVisible,
    expand,
    collapse,
    toggleDropdown
  })
</script>
