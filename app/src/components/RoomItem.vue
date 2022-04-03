<template>
  <q-item
    clickable
    v-ripple
    class="q-pa-md"
    @click="changeRoom"
    :to="{ name: 'Rooms', params: { room: room.key } }"
  >
    <q-item-section avatar>
      <q-avatar>
        <img :src="avatarUrl" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1" class="text-primary text-uppercase">{{ room.name }}</q-item-label>
      <q-item-label caption lines="2">
        <span class="text-weight-bold">{{ room.formatted_key }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section side top> created: {{ room.created_ago }} </q-item-section>
  </q-item>
</template>

<script setup>
import { toRefs } from "vue";
import { useRoomStore } from "../stores/room";
import { fetchMessages } from '../api'

// need to pass the props because the
// getters of every room are required 
// before selecting a room
const props = defineProps({
  room: Object,
});
const { room } = toRefs(props);

const store = useRoomStore();

const changeRoom = async () => {
  const chats = await fetchMessages(room.value.raw_public_key);
  store.$patch((state) => {
    state.currentRoom = room.value;
    state.chatStream = chats;
  });
};

const avatarUrl = `https://dicebear.com/api/identicon/${room.value.key}.svg`;
</script>