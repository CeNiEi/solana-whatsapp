<template>
  <q-toolbar v-if="connected">
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
  <q-toolbar v-else class="q-pa-sm">
    <q-toolbar-title>Connect to Start Chatting</q-toolbar-title>
  </q-toolbar>
</template>

<script setup>
import { useWallet } from "solana-wallets-vue";
import { ref, computed } from "vue";
 import { sendMessage } from '../api';
import { currentRoom } from "../composables";

const content = ref("");

const { connected } = useWallet();
const canSendMessage = computed(() => content.value);

const emit = defineEmits(['added'])
const send = async () => {
  if (!canSendMessage.value) return;
  const chat = await sendMessage(content.value, currentRoom.value.publicKey);
  emit('added', chat);
  content.value = "";
};
</script>