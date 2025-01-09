<template>
  <a
    :class="['mu-tool-button', iconData.cls]"
    :active="active || null"
    :icon="icon"
    :size="size"
    :animation="iconData.animation"
    @click="onClick"
    v-html="iconData.svg" />
</template>

<script setup>
  import './tool-button.scss'

  import { useIcon } from '../icon/icon'

  defineOptions({ name: 'MusselToolButton' })

  const active = defineModel('active', { type: Boolean })

  const props = defineProps({
    icon: String,
    toggle: Boolean,
    size: {
      type: String,
      validator: v => ['small', 'normal', 'large'].includes(v)
    }
  })

  const iconData = useIcon(props).data

  function onClick () {
    if (props.toggle) active.value = !active.value
  }
</script>
