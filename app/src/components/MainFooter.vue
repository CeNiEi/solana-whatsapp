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
        :readonly="loading"
      >
        <template v-slot:before>
          <q-btn size="lg" flat round dense icon="insert_emoticon" />
        </template>
        <template v-slot:after>
          <q-btn
            size="lg"
            flat
            round
            dense
            icon="send"
            :loading="loading"
            type="submit"
            :disable="loading"
            @click="send"
          >
            <template v-slot:loading>
              <q-spinner-gears />
            </template>
          </q-btn>
        </template>
      </q-input>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup>
import { useWallet } from "solana-wallets-vue";
import { ref, computed } from "vue";
import { sendMessage } from "../api";
import { useRoomStore } from "../stores/room";
import { useQuasar } from "quasar";

const $q = useQuasar();

const store = useRoomStore();

const content = ref("");
const canSendMessage = computed(() => content.value);
const loading = ref(false);

const send = async () => {
  if (!canSendMessage.value) return;
  loading.value = true;
  try {
    const newChat = await sendMessage(content.value, store.currentRoom.raw_public_key);
    store.$patch((state) => {
      state.chatStream.push(newChat);
    });
  } catch (err) {
    console.log(err)
    $q.dialog({
      title: "Request Aborted",
    });
  } finally {
    loading.value = false;
    content.value = "";
  }
};
</script>