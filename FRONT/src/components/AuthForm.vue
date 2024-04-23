<template>
  <div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h1>Enregistrement des clés API Marvel</h1>

        <span class="close" @click="closeModal">&times;</span>
        <div class="input-container">
          <label class="input-label" for="publicKey">Public Key</label>
          <input id="publicKey" v-model="publicKey" class="input-field" placeholder="Public Key" type="text">
        </div>
        <div class="input-container">
          <label class="input-label" for="privateKey">Private Key</label>
          <input id="privateKey" v-model="privateKey" class="input-field" placeholder="Private Key" type="text">
        </div>

        <button @click="saveData">Enregistrer</button>
        <div v-if="authStatus" class="warning">
          {{ authStatus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

/**
 --------------------------------------------------------------------------------------------------------
 This component manages the authentication process for accessing Marvel API.
 It displays a modal for users to input their public and private keys.
 Once the keys are saved, they are stored in the cache for future use.
 If a message is provided in the route query parameter, it will be displayed as the authentication status.
 --------------------------------------------------------------------------------------------------------
 */

import { onMounted, ref } from 'vue';
import MarvelAuthService from "@/services/marvelAuthService.js";
import Cache from "@/services/cache.js";
import { useRoute } from "vue-router";

/**
 * Get public and private keys from MarvelAuthService
 * @type {string}
 */
const {publicKeyRef = '', privateKeyRef = ''} = MarvelAuthService.getHashKey();

/**
 * Define reactive variables to store public and private keys
 */
const showModal = ref(false);
const publicKey = ref(publicKeyRef);
const privateKey = ref(privateKeyRef);
const authStatus = ref('');
const route = useRoute();

/**
 * Function to save data (public and private keys) to cache and redirect
 */
const saveData = () => {
  const data = {publicKey: publicKey.value, privateKey: privateKey.value};
  Cache.set('auth', data);
  window.location.href = "/";
}

onMounted(() => {
  // Set showModal to true to display the modal
  showModal.value = true;
  // Set authStatus based on query parameter message
  authStatus.value = route.query.message;
});
</script>


<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  color: black;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.input-container {
  margin-bottom: 15px;
}

.input-label {
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
  color: black;
  font-weight: bold;
}

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: #999;
}

.warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.warning p {
  margin: 0;
}

</style>
