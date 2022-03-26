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
  </div>
</template>

<script setup>
import { toggleRightDrawer } from "../composables/useRightDrawerState";
</script>