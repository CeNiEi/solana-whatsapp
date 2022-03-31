<template>
  <q-toolbar>
    <q-toolbar-title>
      <q-input
        class="q-pa-sm"
        outlined
        placeholder="Type a message"
        autogrow
        dense
        type="textarea"
        v-model="content"
      >
        <template v-slot:before>
          <q-btn size="lg" flat round dense icon="insert_emoticon" />
        </template>
        <template v-slot:after>
          <q-btn size="lg" flat round dense icon="send" type="subimt" @click="send" />
        </template>
      </q-input>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup>
import { useWallet } from "solana-wallets-vue";
import { ref, computed } from "vue";
import { sendMessage } from '../api';
import { useRoomStore } from "../stores/room";

const store = useRoomStore();

const content = ref("");
const canSendMessage = computed(() => content.value);

const send = async () => {
  if (!canSendMessage.value) return;
  const newChat = await sendMessage(content.value, store.currentRoomId);
  store.addChat(newChat)
  content.value = "";
};
</script>