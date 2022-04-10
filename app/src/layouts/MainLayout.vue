<template>
  <q-layout view="lHr lpr lFr">
    <q-header bordered class="bg-primary text-white">
      <MainHeader />
    </q-header>

    <q-drawer :width="400" v-model="leftDrawerOpen" side="left">
      <LeftDrawer />
    </q-drawer>

    <q-drawer :width="400" v-model="rightDrawerOpen" side="right" bordered no-swipe-open>
      <RightDrawer />
    </q-drawer>

    <q-page-container class="chat__body">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import LeftDrawer from "../components/LeftDrawer.vue";
import RightDrawer from "../components/RightDrawer.vue";
import MainHeader from "../components/MainHeader.vue";
import MainFooter from "../components/MainFooter.vue";
import { toggleRightDrawer, rightDrawerOpen } from "../composables";

import { ref } from 'vue';

const leftDrawerOpen = ref(true)
</script>

<style lang="scss">
.chat__body {
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-repeat: repeat;
}
</style>