<template>
  <div class="mu-message">
    <div class="mu-message_title">
      <mu-icon class="mu-message_icon" :icon="icon" />
      <label>{{ title }}</label>
    </div>
    <div class="mu-message_content" v-html="html" />
  </div>
</template>
<script setup>
  import './message.scss'

  import { computed } from 'vue'
  import { sanitizeHTML } from '@/utils/dom'

  defineOptions({ name: 'MusselMessage' })

  const props = defineProps({
    icon: String,
    title: String,
    message: String
  })

  const html = computed(() => sanitizeHTML(props.message))
</script>
