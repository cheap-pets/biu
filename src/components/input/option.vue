<template>
  <div
    v-if="isVisible"
    class="mu-list-item mu-dropdown-item mu-option"
    @click="onClick">
    <mu-icon v-if="isMultiple" class="mu-list-item_check-icon" :icon="checkIcon" />
    <slot>
      <mu-icon v-if="icon != null" class="mu-list-item_icon" :icon="icon" />
      <label class="mu-list-item_label">{{ label ?? value }}</label>
    </slot>
  </div>
</template>

<script setup>
  import { inject, computed, onMounted, onUnmounted } from 'vue'
  import { dropdownItemProps } from '../dropdown/dropdown-item'

  defineOptions({ name: 'MusselOption' })

  const props = defineProps({ ...dropdownItemProps, value: { required: true } })

  const { hide: collapse } = inject('dropdown')
  const { values, filterValues = {}, mountOption, unmountOption, toggleOption } = inject('select')

  const isMultiple = computed(() => Boolean(values))
  const checkIcon = computed(() => values.value.has(props.value) ? 'check' : '')
  const isVisible = computed(() => !filterValues.value || filterValues.value.has(props.value))

  function onClick (event) {
    toggleOption(props)

    if (!isMultiple.value) collapse()
  }

  onMounted(() => mountOption(props))
  onUnmounted(() => unmountOption(props))
</script>
