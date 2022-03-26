<template>
  <q-item
    clickable
    v-ripple
    class="q-pa-md"
    @click="changeRoom(room)"
    :to="{ name: 'Rooms', params: { room: room.key } }"
  >
    <q-item-section avatar>
      <q-avatar>
        <img :src="avatarUrl" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ room.name }}</q-item-label>
      <q-item-label caption lines="2">
        <span class="text-weight-bold">SenderName</span>
        {{ room.group_description }}
      </q-item-label>
    </q-item-section>

    <q-item-section side top> {{ room.created_ago }} </q-item-section>
  </q-item>
</template>

<script setup>
import { toRefs } from "vue";
import { changeRoom } from '../composables'

const props = defineProps({
  room: Object,
});
const { room } = toRefs(props);

const avatarUrl = `https://dicebear.com/api/avataaars/${room.value.key}.svg`;
</script>