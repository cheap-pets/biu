<template>
  <combo-wrapper v-model="comboValue" class="mu-select" :editable="false">
    <template v-if="isMultiple" #default="{ placeholder }">
      <div
        class="mu-select_value-box mu-text-ellipsis"
        :placeholder="placeholder"
        :title="showValueTooltip ? '' : null">
        <span v-for="(item, idx) in selections" :key="`${item.value}_${idx}`">
          {{ item.label || item.value }}
        </span>
      </div>
    </template>
    <template #dropdown>
      <slot name="dropdown">
        <component
          :is="el.is"
          v-for="el in optionItems" :key="el.key"
          v-bind="el.bindings" />
      </slot>
    </template>
  </combo-wrapper>
</template>

<script setup>
  import './select.scss'

  import ComboWrapper from './combo-wrapper.vue'

  import { selectProps, useSelect } from './select'

  defineOptions({ name: 'MusselSelect' })

  const model = defineModel()
  const props = defineProps({ ...selectProps, showValueTooltip: Boolean })

  const {
    isMultiple,
    comboValue,
    selections,
    optionItems
  } = useSelect(model, props)
</script>
