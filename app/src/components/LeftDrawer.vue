<template>
  <div class="q-pa-none">
    <q-scroll-area
      v-if="connected"
      style="margin-top: 50px; height: 600px"
      :thumb-style="{
        borderRadius: '5px',
        background: '#26A69A',
        width: '4px',
        opacity: 1,
      }"
    >
      <RoomsList :rooms="rooms" />
    </q-scroll-area>
    <div v-else class="absolute-bottom">
      <wallet-multi-button />
    </div>

    <q-toolbar class="bg-primary text-white absolute-top" style="height: 50px">
      <q-btn flat round class="q-mx-xs">
        <q-avatar>
          <img :src="avatarUrl" />
        </q-avatar>
      </q-btn>
      <q-toolbar-title> </q-toolbar-title>

      <q-btn flat round dense icon="more_vert" class="q-mx-xs">
        <q-menu fit>
          <q-list style="min-width: 170px">
            <q-item clickable>
              <q-item-section>New Chat Room</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Settings</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from "vue";
import { useWorkspace } from "../composables";
import { WalletMultiButton, useWallet } from "solana-wallets-vue";
import { fetchRooms } from '../api'

import RoomsList from "./RoomsList.vue";

const { wallet } = useWorkspace();
const { connected } = useWallet();

const avatarUrl = computed(() => {
  if (!wallet.value)
    return "https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg";
  const seed = wallet.value.publicKey.toBase58();
  return `https://dicebear.com/api/human/${seed}.svg`;
});

const rooms = ref([]);

fetchRooms()
  .then((fetchedRooms) => (rooms.value = fetchedRooms))

</script>

<style lang="scss">
.swv-dropdown {
  width: 100%;
}

.swv-button {
  width: 100%;
  border-radius: 0px;
  font-display: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 22px;
}

.swv-button-trigger {
  background-color: $primary;
  justify-content: center;
}

.swv-dropdown-list {
  top: auto;
  bottom: 100%;
}

.swv-dropdown-list-active {
  transform: translateY(-0.75rem);
}

.swv-button:not([disabled]):hover {
  background-color: $secondary;
}

.swv-dropdown-list {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.swv-modal-wrapper {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>