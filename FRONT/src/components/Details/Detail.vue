<template>
  <div v-if="infos && infos.data && infos.data.count !== undefined">
    {{ infos.data.count }} résultats
  </div>
  <div v-if="infos && infos.data && infos.data.count > 0" class="no-bullets">

    <ul class="no-bullets content">
      <li v-for="item in infos.data.results" :key="item.id">
        <div class="header">{{ item.title }}
          <link-list :urls="item.urls"></link-list>
        </div>
        <details-list :items="item.textObjects" item-key="id"></details-list>
        <image-list :images="item.images"></image-list>
      </li>
    </ul>
  </div>

</template>

<script setup>

/**
 --------------------------------------------------------------------------------------------------------
 This component fetches detailed information about a specific Marvel series based on the provided series ID.
 It displays a list of comics related to the selected series, including their details such as titles, images, and links.
 The series ID is passed to the component as a prop named 'selectedId'.
 When the 'selectedId' prop changes, the component automatically updates the displayed information.
 --------------------------------------------------------------------------------------------------------
 */

import { defineProps, ref, watch } from 'vue';
import { fetchMarvel } from "@/services/marvelApiService.js";
import DetailsList from "@/components/Details/DetailsList.vue";
import ImageList from "@/components/Details/ImageList.vue";
import LinkList from "@/components/Details/LinkList.vue";

/**
 * Declares props using defineProps
 * @type {Prettify<Readonly<ExtractPropTypes<{selectedId: NumberConstructor}>>>}
 */
const props = defineProps({
  selectedId: Number,
});

const infos = ref([]);

/**
 * Asynchronous function to fetch detailed information about a specific series by its ID
 * @param id
 * @returns {Promise<void>}
 */
const getDetails = async (id) => {
  if (id !== null && id !== undefined) {
    infos.value = await fetchMarvel(`series/${id}/comics`);
  }
};

/**
 * Watches changes to the `selectedId` prop to call getDetails.
 */
watch(() => props.selectedId, (newId) => {
  getDetails(newId);
});
</script>

<style>
.header {
  font-weight: bold;
  font-size: larger;
  background-color: rgba(87, 86, 89, 0.22);
}

.content {
  padding: 4px;
  width: 600px;
}
</style>
