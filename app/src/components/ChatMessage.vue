<template>
  <q-chat-message :text="[chat.content]" text-color="white" class="q-pa-sm" :sent="sent" :bg-color="bgColor">
    <template v-slot:name>{{ chat.chat_author }}</template>
    <template v-slot:stamp>{{ chat.created_ago }}</template>
    <template v-slot:avatar>
      <img
        class="q-message-avatar q-message-avatar--sent q-mx-xs"
        :src="avatarUrl"
      />
    </template>
  </q-chat-message>
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useWorkspace } from '../composables'

const { wallet } = useWorkspace();

const props = defineProps({
  chat: Object,
});
const { chat } = toRefs(props);

const sent = computed(() => wallet.value.publicKey.toBase58() === chat.value.chat_author);
const avatarUrl = computed(() => `https://dicebear.com/api/adventurer/${chat.value.chat_author}.svg`);
const bgColor = computed(() => {
  if (sent.value) {
    return 'amber-7'
  } return 'secondary'
})

</script>

