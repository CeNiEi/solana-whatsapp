<template>
  <div class="q-pa-none">
    <q-toolbar class="bg-primary text-white">
      <q-btn
        flat
        round
        class="q-mx-xs"
        icon="close"
        @click="toggleRightDrawer"
      />
      <q-toolbar-title> </q-toolbar-title>
    </q-toolbar>
    <div class="column q-gutter-sm items-center q-pa-sm" style="heigth: 600px" no-wrap>
      <q-avatar rounded size="200px" class="q-py-lg">
        <img :src="avatarUrl" />
      </q-avatar>
      <q-separator inset class="q-my-lg" />
      <div class="text-h4 text-primary text-italic text-uppercase">{{ groupName }}</div>
      <div class="text-primary text-weight-bolder">{{ groupPublicKey }}</div>
      <q-separator inset class="q-my-lg" />
      <div class="text-primary">Created By</div>
      <div class="text-weight-bolder text-primary">{{ groupAuthor }}</div>
      <div class="text-primary">{{ groupTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue-demi";
import { toggleRightDrawer } from "../composables/useRightDrawerState";
import { useRoomStore } from "../stores/room";

const store = useRoomStore();

const avatarUrl = computed(() => store.currentRoomAvatar);
const groupName = computed(() => store.currentRoomName);
const groupPublicKey = computed(() => store.currentRoomId);
const groupTime = computed(() => store.currentRoomTime);
const groupAuthor = computed(() => store.currentRoomAuthor);
</script>