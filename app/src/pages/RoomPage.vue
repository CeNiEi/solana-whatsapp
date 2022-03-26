<template>
  <q-page class="flex flex-center">
    <div style="width: 100%">
      <q-scroll-area
        style="height: 540px"
        :thumb-style="{
          borderRadius: '5px',
          background: '#26A69A',
          width: '4px',
          opacity: 1,
        }"
      >
        <ChatMessage v-for="chat in chats" :key="chat.key" :chat="chat" />
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup>
import { currentRoom } from "../composables";
import { fetchMessages } from "../api";
import ChatMessage from "../components/ChatMessage.vue";
import { ref } from "vue";

const chats = ref([]);
const loading = ref(false);

fetchMessages(currentRoom.value.key)
  .then((messages) => (chats.value = messages))
  .finally(() => (loading.value = false));
</script>

<style lang="sass">
.my-emoji
  vertical-align: middle
  height: 2em
  width: 2em
</style>