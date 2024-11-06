<template>
  <combo-wrapper
    ref="wrapper"
    v-model="comboValue"
    class="mu-multi-select"
    dropdown-class="mu-select_dropdown-panel"
    dropdown-scrollbar
    :editable="false"
    @keydown="onKeyDown"
    @dropdown:hide="filterValues = null">
    <template #default="{ placeholder }">
      <div class="mu-multi-select_tags" :placeholder="placeholder">
        <div
          v-for="(el, idx) in visibleTags"
          :key="`${el.value}_${idx}`"
          :class="el.more ? 'mu-multi-select_more-tag' : null"
          class="mu-multi-select_tag"
          tabindex="-1"
          @click="onTagClick($event, el)">
          <label class="mu-text-ellipsis" :title="showTagTooltip && !el.more ? el.label : null">
            {{ el.label }}
          </label>
          <mu-icon v-if="!el.more" icon="X" @click.stop="toggleOption(el, false)" />
        </div>
      </div>
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

  const wrapper = ref()

  const {
    comboValue,
    visibleTags,
    filterValues,
    selectedItems,
    optionComponents,
    toggleOption
  } = useMultiSelect(model, props)

  function onKeyDown ({ keyCode }) {
    if (![37, 39].includes(keyCode)) return

    const wrapperEl = wrapper.value.$el
    const target = wrapperEl.querySelector('.mu-multi-select_tag:focus')

    const sibling = target
      ? (
        (keyCode === 37 && target.previousElementSibling) ||
        (keyCode === 39 && target.nextElementSibling)
      )
      : wrapperEl.querySelector('.mu-multi-select_tag')

    if (!sibling) return
    if (target) wrapper.value.collapse()

    sibling.focus()
    sibling.scrollIntoView()
  }

  function onTagClick (event, tag) {
    if (!tag.more) return
    if (wrapper.value.dropdownVisible) event.stopPropagation()

    filterValues.value = new Set(selectedItems.value.map(el => el.value))
  }
</script>
