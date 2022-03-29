<template>
  <q-list bordered>
    <RoomItem v-for="room in orderedRooms" :key="room.key" :room="room" />
  </q-list>
</template>

<script setup>
import { computed, toRefs } from "vue";
import RoomItem from "./RoomItem.vue";

const props = defineProps({
  rooms: Array,
});

const { rooms } = toRefs(props);
const orderedRooms = computed(() => {
  return rooms.value.slice().sort((a, b) => b.timestamp - a.timestamp);
});
</script>