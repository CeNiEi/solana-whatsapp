 <template>
  <q-toolbar>
    <q-btn flat round dense @click="toggleRightDrawer" class="q-mx-sm">
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
      </q-avatar>
    </q-btn>
    <q-toolbar-title>hello</q-toolbar-title>

    <q-btn dense flat round icon="search" class="q-mx-md" />
    <q-btn flat round dense icon="more_vert" class="q-mx-md">
      <q-menu fit>
        <q-list style="min-width: 170px">
          <q-item clickable>
            <q-item-section>Group Info</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Exit Group</q-item-section>
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
</script> 