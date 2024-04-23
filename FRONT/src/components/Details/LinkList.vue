<template>
  <span v-for="url in urls" :key="url.type">
    <a :href="url.url" target="_blank">{{ url.type }}</a>
  </span>
</template>

<script setup>

/**
 --------------------------------------------------------------------------------------------------------
 parent : Detail.vue
 This component receives an array of URLs as props and renders them as clickable links.
 It is used to display a list of URLs in a user interface.
 --------------------------------------------------------------------------------------------------------
 */

import { defineProps } from 'vue';

/**
 * Define props to receive an array of URLs
 */
defineProps({
  urls: Array
});

</script>