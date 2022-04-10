<template>
  <q-chat-message
    text-color="white"
    class="q-pa-sm"
    :sent="sent"
    :bg-color="bgColor"
    :name="chat.chat_author"
    :stamp="chat.created_ago"
    :avatar="avatarUrl"
  >
    <div>
      {{ chat.chat_content }}
      <q-menu context-menu auto-close fit v-if="sent">
        <q-list style="min-width: 170px">
          <q-item clickable @click="deleteMess">
            <q-item-section>Delete Message</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </div>
  </q-chat-message>
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useWorkspace } from "../composables";
import { deleteMessage } from "../api";
import { useQuasar } from "quasar";
import { useRoomStore } from "../stores/room";

const $q = useQuasar();

const { wallet } = useWorkspace();

const props = defineProps({
  chat: Object,
});
const { chat } = toRefs(props);

const sent = computed(
  () => wallet.value.publicKey.toBase58() === chat.value.chat_author
);
const avatarUrl = computed(
  () => `https://dicebear.com/api/adventurer/${chat.value.chat_author}.svg`
);
const bgColor = computed(() => {
  if (sent.value) {
    return "amber-7";
  }
  return "secondary";
});

const store = useRoomStore();

const deleteMess = async () => {
  try {
    await deleteMessage(chat.value.publicKey);
    store.$patch((state) => {
      const newList = state.chatStream.filter(currChat => currChat.publicKey.toBase58() != chat.value.publicKey.toBase58())
      state.chatStream = newList;
    });
  } catch (err) {
    console.log(err);
    $q.dialog({
      title: "Request Aborted",
    });
  }
};
</script>

