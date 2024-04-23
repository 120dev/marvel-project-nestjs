<template>
  <ul class="inline-list">
    <li v-for="image in images" :key="image.path">
      <img :src="image.path + '.' + image.extension" width="80">
    </li>
  </ul>
</template>

<script setup>

/**
 --------------------------------------------------------------------------------------------------------
 parent : Detail.vue
 This component renders a list of images in an inline format.
 It receives an array of image objects as a prop and iterates over them to display each image.
 --------------------------------------------------------------------------------------------------------
 */

import { defineProps } from 'vue';

/**
 * Define the prop 'images' as an array
 */
defineProps({
  images: Array
});
</script>

