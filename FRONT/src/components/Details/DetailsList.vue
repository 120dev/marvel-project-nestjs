<template>
  <ul>
    <li v-for="(subItem, index) in items" :key="subItem[itemKey]">
      {{ subItem.text }}
    </li>
  </ul>
</template>

<script setup>

/**
 --------------------------------------------------------------------------------------------------------
 parent : Detail.vue
 This component defines props for a list of items and a key to identify each item.
 The props 'items' is an array containing the list of items to be rendered.
 The prop 'itemKey' is a string representing the key to identify each item in the list.
 These props can be passed to child components to render the items with unique keys.
 --------------------------------------------------------------------------------------------------------
 */

import { defineProps } from 'vue';

/**
 * Define props for the component
 */
defineProps({
  items: Array,
  itemKey: String
});
</script>
