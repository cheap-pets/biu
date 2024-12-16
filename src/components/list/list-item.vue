<template>
  <component :is="componentTag" class="mu-list-item">
    <slot>
      <mu-icon v-if="icon != null" :icon="icon" />
      <label v-if="label">{{ label }}</label>
    </slot>
  </component>
</template>

<script setup>
  import './list-item.scss'

  defineOptions({
    name: 'MusselListItem'
  })

  defineProps({
    icon: String,
    label: String,
    tag: {
      type: String,
      default: 'div'
    }
  })
</script>
