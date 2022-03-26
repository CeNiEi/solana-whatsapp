<template>
  <q-list bordered>
    <q-item v-if="loading">
      <q-item-section> Loading... </q-item-section>
    </q-item>
    <RoomItem
      v-for="room in orderedRooms"
      :key="room.key"
      :room="room"
      v-else
    />
  </q-list>
</template>

<script setup>
import { computed, toRefs } from "vue";
import RoomItem from "./RoomItem.vue";

const props = defineProps({
  rooms: Array,
  loading: Boolean,
});

const { rooms, loading } = toRefs(props);
const orderedRooms = computed(() => {
  return rooms.value.slice().sort((a, b) => b.timestamp - a.timestamp);
});
</script>