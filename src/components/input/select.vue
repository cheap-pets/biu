<template>
  <combo-wrapper
    v-model="comboValue"
    class="mu-select"
    :dropdown-class="['mu-select_dropdown-panel', dropdownClass]"
    :dropdown-scrollbar="dropdownScrollbar"
    :dropdown-width="dropdownWidth"
    :editable="false">
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
  import ComboWrapper from './combo-wrapper.vue'

  import { selectProps, useSelect } from './select'

  defineOptions({ name: 'MusselSelect' })

  const model = defineModel()
  const props = defineProps({ ...selectProps })

  const { comboValue, optionComponents } = useSelect(model, props)
</script>
