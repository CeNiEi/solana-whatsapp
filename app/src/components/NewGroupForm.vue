<template>
  <div style="margin-top: 50px" class="q-gutter-sm">
    <q-input
      class="q-pa-lg"
      filled
      v-model="groupName"
      :readonly="loading"
      placeholder="Group Name"
    />
    <q-input
      class="q-pa-lg"
      filled
      v-model="groupDesc"
      :readonly="loading"
      placeholder="Group Description"
    />
    <q-separator />
    <div class="row justify-center">
      <q-btn
        flat
        class="q-pa-md"
        color="primary"
        dense
        :loading="loading"
        type="submit"
        :disable="loading"
        @click="create"
        label="Create New Group"
        style="width: 170px"
      >
        <template v-slot:loading>
          <q-spinner />
        </template>
      </q-btn>
      <q-btn
        flat
        class="q-pa-md"
        color="primary"
        dense
        type="submit"
        :disable="loading"
        @click="$emit('toggleNewGroup')"
        label="Cancel"
        style="width: 150px"
      >
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";
import { createRoom } from "../api";
import { useQuasar } from "quasar";

const $q = useQuasar();

const groupName = ref("");
const groupDesc = ref("");
const loading = ref(false);

const canCreate = computed(() => groupName.value && groupDesc.value);

const props = defineProps({
  rooms: Array,
});

const { rooms } = toRefs(props);

const emit = defineEmits(["added", "toggleNewGroup"]);
const create = async () => {
  if (!canCreate.value) return;
  loading.value = true;
  try {
    const Group = await createRoom(groupName.value, groupDesc.value);
    emit("added", Group);
  } catch (err) {
    $q.dialog({
      title: "Request Canceled",
    });
  } finally {
    groupName.value = "";
    groupDesc.value = "";
    loading.value = false;
    emit("toggleNewGroup");
  }
};
</script>