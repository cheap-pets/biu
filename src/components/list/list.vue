<template>
  <div v-scrollbar="scrollbar" class="mu-list">
    <template v-for="el in items" :key="genKey(el)">
      <div
        v-if="el === '-'"
        class="mu-list-divider" />
      <div
        v-else-if="el.is === '-'"
        :class="['mu-list-divider', el.class]">
        <slot name="list-divider" :item="el">
          <mu-icon v-if="el.icon != null" :icon="el.icon" />
          <label v-if="el.label">{{ el.label }}</label>
        </slot>
      </div>
      <component
        :is="el.is"
        v-else-if="el.is"
        v-bind="el.attrs"
        v-on="el.events" />
      <component
        :is="itemTagName"
        v-else
        :class="el.class || ['mu-list-item', itemClass]"
        @click="$emit('itemclick', el)">
        <slot name="list-item" :item="el">
          <mu-icon v-if="el.icon != null" :icon="el.icon" />
          <label v-if="el.label">{{ el.label }}</label>
        </slot>
      </component>
    </template>
  </div>
</template>

<script setup>
  import './list.scss'

  defineOptions({
    name: 'MusselList'
  })

  defineEmits([
    'itemclick'
  ])

  defineProps({
    scrollbar: Boolean,
    items: Array,
    itemClass: String,
    itemTagName: {
      type: String,
      default: 'a',
      validator: v => ['a', 'div'].includes(v)
    }
  })
</script>
