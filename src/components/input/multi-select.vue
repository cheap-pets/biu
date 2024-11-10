<template>
  <combo-wrapper
    ref="wrapper"
    v-model="comboValue"
    class="mu-multi-select"
    :dropdown-width="dropdownWidth"
    :dropdown-class="['mu-select_dropdown-panel', dropdownClass]"
    :dropdown-scrollbar="dropdownScrollbar"
    :editable="false"
    @keydown="onKeyDown">
    <template #default="{ placeholder }">
      <mu-tags
        removable
        expandable
        :max="maxTags"
        :tags="selectedItems"
        :tooltip="tagTooltip"
        :tag-shrink="tagShrink || null"
        :placeholder="placeholder"
        :dropdown-host="wrapper"
        :dropdown-width="dropdownWidth"
        :dropdown-class="['mu-select_dropdown-panel', dropdownClass]"
        :dropdown-scrollbar="dropdownScrollbar"
        @tag-remove="onItemRemove" />
    </template>
    <template #dropdown>
      <slot name="dropdown">
        <component
          :is="el.is"
          v-for="el in optionComponents" :key="el.key"
          v-bind="el.bindings" />
      </slot>
    </template>
  </combo-wrapper>
</template>

<script setup>
  import './multi-select.scss'

  import ComboWrapper from './combo-wrapper.vue'

  import { ref } from 'vue'
  import { multiSelectProps, useMultiSelect } from './multi-select'

  defineOptions({ name: 'MusselMultiSelect' })

  const model = defineModel({ type: Array })
  const props = defineProps({ ...multiSelectProps })

  const {
    comboValue,
    selectedItems,
    optionComponents,
    toggleOption
  } = useMultiSelect(model, props)

  const wrapper = ref()

  function onItemRemove (item) {
    toggleOption(item, false)
  }

  function onKeyDown ({ keyCode }) {
    if (![37, 39].includes(keyCode)) return

    const wrapperEl = wrapper.value.$el
    const target = wrapperEl.querySelector('.mu-tags > :focus')

    const sibling = target
      ? (
        (keyCode === 37 && target.previousElementSibling) ||
        (keyCode === 39 && target.nextElementSibling)
      )
      : wrapperEl.querySelector('.mu-tags > div')

    if (!sibling) return
    if (target) wrapper.value.collapse()

    sibling.focus()
    sibling.scrollIntoView()
  }
</script>
