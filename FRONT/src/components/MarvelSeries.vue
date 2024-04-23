<template>
  <div>
    <h1>Series </h1>

    <div class="container">
      <div class="content">
        <div class="left-content">
          <table>
            <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Année</th>
              <th>Titre</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in sortedData" :key="item.id" :class="{ 'active': selectedIndex === item.id }" @click="selectedIndex = item.id">
              <td><img :src="item.thumbnail.path+'.'+item.thumbnail.extension" width="80"></td>
              <td>{{ item.endYear }}</td>
              <td>{{ item.title }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="right-content">
        <Detail :selected-id="selectedIndex"></Detail>
      </div>
    </div>
  </div>
</template>

<script setup>

/**
 --------------------------------------------------------------------------------------------------------
 This component fetches and displays Marvel series data, sorted by a specific criterion.
 It retrieves series information using the fetchMarvel function from the Marvel API service.
 The fetched data is sorted based on the 'endYear' property of each series.
 The sorted series are then rendered using the Detail component.
 --------------------------------------------------------------------------------------------------------
 */

import { computed, onMounted, ref } from 'vue';
import { fetchMarvel } from "@/services/marvelApiService.js";
import Detail from "@/components/Details/Detail.vue";

/**
 * Define reactive variables to store data and series information
 * @type {Ref<UnwrapRef<*[]>>}
 */
const data = ref([]);
const infos = ref([]);
const selectedIndex = ref(null);

/**
 * Asynchronous function to fetch series data and sort it based on a specific criterion.
 * @returns {Promise<void>}
 */
const getData = async () => {
  const {data: {results = []} = {}} = await fetchMarvel('series');
  data.value = results;
};

/**
 * Sorting data
 * @type {ComputedRef<UnwrapRefSimple<*>[]>}
 */
const sortedData = computed(() => {
  const sortBy = 'endYear';
  return data.value.slice().sort((a, b) => a[sortBy] - b[sortBy]);
});

onMounted(async () => {
  await getData();
});

</script>

<style>
:root {
  --border-common: 1px solid black;
  --padding-common: 8px;
  --text-align-common: left;
}

table {
  border-collapse: collapse;
}

table, th, td {
  border: var(--border-common);
}

th, td {
  padding: var(--padding-common);
  text-align: var(--text-align-common);
  white-space: nowrap;
}

tbody tr:hover {
  background-color: #0094e6;
  cursor: pointer;
}

.active {
  background-color: gray;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

th {
  font-weight: bold;
  font-size: larger;
}

.container {
  display: flex;
  justify-content: space-between;
}

.right-content {
  width: 75%;
  padding-left: 2rem;
}

ul.no-bullets {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.container {
  display: flex;
}

.left-content {
  flex: 1;
  overflow-y: scroll;
  height: 900px;
}

.right-content {
  position: sticky;
  top: 0;
  flex-shrink: 0;
  margin-left: auto;
}

.left-content::-webkit-scrollbar {
  width: 0;
}

</style>
