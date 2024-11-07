<template>
  <div class="mu-list-item mu-dropdown-item mu-option" @click="onClick">
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
  const { selectedValues, mountOption, unmountOption, toggleOption } = inject('select')

  const isMultiple = computed(() => Boolean(selectedValues))
  const checkIcon = computed(() => selectedValues.value.has(props.value) ? 'check' : '')

  function onClick (event) {
    toggleOption(props)

    if (!isMultiple.value) collapse()
  }

  onMounted(() => mountOption(props))
  onUnmounted(() => unmountOption(props))
</script>
