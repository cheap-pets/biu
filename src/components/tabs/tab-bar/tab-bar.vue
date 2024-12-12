<template>
  <div class="mu-bar mu-tab-bar">
    <slot name="prepend" />
    <div class="mu-tab-bar_buttons">
      <mu-tab-button
        v-for="el in tabButtons"
        :key="el.name"
        :active="activeTab === el.name"
        v-bind="el"
        @click="activeTab = el.name" />
    </div>
    <slot name="append" />
  </div>
</template>

<script setup>
  import './index.scss'

  import MuTabButton from './tab-button.vue'

  defineOptions({ name: 'MusselTabBar' })
  defineProps({ tabButtons: Array })

  const activeTab = defineModel('activeTab', { type: String })
</script>
