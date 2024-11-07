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
      <div class="mu-tags-box" :shrink-tags="tagShrink || null" :placeholder="placeholder">
        <div
          v-for="(el, idx) in tags"
          :key="`${idx}:${el.value}`"
          class="mu-tags-box_tag"
          tabindex="-1">
          <label :title="tagTooltip ? el.label : null">
            {{ el.label }}
          </label>
          <mu-icon icon="X" @click.stop="toggleOption(el, false)" />
        </div>
        <mu-dropdown
          v-if="moreCount"
          class="mu-tags-box_more-tag"
          tabindex="-1"
          dropdown-class="mu-tags-box mu-select_dropdown-panel"
          dropdown-trigger="click"
          :dropdown-host="wrapper"
          :dropdown-width="dropdownWidth"
          :dropdown-scrollbar="dropdownScrollbar"
          @click.stop>
          +{{ moreCount }}
          <template #dropdown>
            <div
              v-for="(el, idx) in selectedItems"
              :key="`${el.value}_${idx}`"
              class="mu-tags-box_tag">
              <label :title="tagTooltip ? el.label : null">
                {{ el.label }}
              </label>
              <mu-icon icon="X" @click.stop="toggleOption(el, false)" />
            </div>
          </template>
        </mu-dropdown>
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

  import { ref, computed } from 'vue'
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

  const moreCount = computed(() => {
    const max = props.maxTags
    const items = selectedItems.value
    const total = items.length

    return !max || max >= total
      ? 0
      : Math.min(total - max, 99)
  })

  const tags = computed(() => {
    const max = props.maxTags
    const items = selectedItems.value

    return moreCount.value
      ? items.slice(0, max)
      : items
  })

  function onKeyDown ({ keyCode }) {
    if (![37, 39].includes(keyCode)) return

    const wrapperEl = wrapper.value.$el
    const target = wrapperEl.querySelector('.mu-tags-box_tag:focus')

    const sibling = target
      ? (
        (keyCode === 37 && target.previousElementSibling) ||
        (keyCode === 39 && target.nextElementSibling)
      )
      : wrapperEl.querySelector('.mu-tags-box_tag')

    if (!sibling) return
    if (target) wrapper.value.collapse()

    sibling.focus()
    sibling.scrollIntoView()
  }
</script>
