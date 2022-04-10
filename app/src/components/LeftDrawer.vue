<template>
  <div class="q-pa-none">

    <q-toolbar class="bg-primary text-white" style="height: 50px">
      <q-btn v-if="connected" flat round class="q-mx-xs" @click="profile = true">
        <q-avatar>
          <img :src="avatarUrl" />
        </q-avatar>
      </q-btn>
      <q-toolbar-title> </q-toolbar-title>

      <q-btn v-if="connected && !profile" flat round dense icon="more_vert" class="q-mx-xs">
        <q-menu fit auto-close>
          <q-list style="min-width: 170px">
            <q-item clickable @click="newGroup = true">
              <q-item-section>New Chat Room</q-item-section>
            </q-item>
            <q-item clickable @click="resetRoom" :to="{ name: 'Home' }">
              <q-item-section>About</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn
        v-else-if="connected"
        flat
        round
        dense
        icon="close"
        class="q-mx-xs"
        @click="profile = false"
      />
    </q-toolbar>
 
    <div v-if="!connected" class="absolute-bottom">
      <wallet-multi-button />
    </div>
    <q-scroll-area
      v-else-if="!newGroup && !profile && connected"
      style="height: 600px;"
      :thumb-style="{
        borderRadius: '5px',
        background: '#26A69A',
        width: '4px',
        opacity: 1,
      }"
    >
      <RoomsList :rooms="rooms" />
    </q-scroll-area>
    <NewGroupForm
      v-else-if="!profile"
      @added="addNewRoom"
      @toggle-new-group="toggleNewGroup"
    />
    <ProfileSec v-else/>
 </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useWorkspace } from "../composables";
import { WalletMultiButton, useWallet } from "solana-wallets-vue";
import { fetchRooms } from "../api";
import RoomsList from "./RoomsList.vue";
import NewGroupForm from "./NewGroupForm.vue";
import { toggleRightDrawer } from "../composables";
import { useRoomStore } from "../stores/room";
import ProfileSec from "./ProfileSec.vue";

/*
  wallet related stuff
*/
const { wallet } = useWorkspace();
const { connected } = useWallet();

/*
  avatar of the user
*/
const avatarUrl = computed(() => {
  if (!wallet.value)
    return "https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg";
  const seed = wallet.value.publicKey.toBase58();
  return `https://dicebear.com/api/adventurer/${seed}.svg`;
});

/*
  rooms list
*/
const rooms = ref([]);
const newGroup = ref(false);

fetchRooms().then((fetchedRooms) => (rooms.value = fetchedRooms));

const addNewRoom = (Group) => {
  rooms.value.push(Group);
};

const toggleNewGroup = () => {
  newGroup.value = false;
};

/*
profile
*/
const profile = ref(false);

/*
  reset the room state
*/
const store = useRoomStore();
const resetRoom = () => {
  store.$patch((state) => {
    state.currentRoom = null;
    state.chatStream = [];
  });
};
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