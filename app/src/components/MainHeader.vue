 <template>
  <q-toolbar>
    <q-btn
      v-if="store.currentRoom != null"
      flat
      round
      dense
      @click="toggleRightDrawer"
      class="q-mx-sm"
    >
      <q-avatar>
        <img :src="avatarUrl" />
      </q-avatar>
    </q-btn>
    <q-toolbar-title>{{ heading }}</q-toolbar-title>

    <q-btn v-if="store.currentRoom != null" flat round dense icon="more_vert" class="q-mx-md">
      <q-menu fit auto-close>
        <q-list style="min-width: 170px">
          <q-item clickable @click="toggleRightDrawer">
            <q-item-section>Group Info</q-item-section>
          </q-item>
          <q-item clickable class="text-red">
            <q-item-section>Delete Group</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>
 
<script setup>
import { toggleRightDrawer } from "../composables/useRightDrawerState";
import { useRoomStore } from "../stores/room";
import { computed } from "vue";

const store = useRoomStore();

const heading = computed(() => store.currentRoomName);
const avatarUrl = computed(() => store.currentRoomAvatar);
</script> 