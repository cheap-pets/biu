<template>
  <combo-wrapper v-model="comboValue" class="mu-multi-select" :editable="false">
    <template #default="{ placeholder }">
      <div class="mu-multi-select_values" :placeholder="placeholder">
        <span
          v-for="(item, idx) in selectedItems"
          :key="`${item.value}_${idx}`"
          class="mu-text-ellipsis">
          {{ item.label }}
          <mu-icon icon="X" @click.stop="unselectOption(item)" />
        </span>
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

  import { selectProps, useMultiSelect } from './multi-select'

  defineOptions({ name: 'MusselMultiSelect' })

  const model = defineModel()
  const props = defineProps({ ...selectProps, showValueTooltip: Boolean })

  const {
    comboValue,
    optionComponents,
    selectedItems,
    unselectOption
  } = useMultiSelect(model, props)
</script>
