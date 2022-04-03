<template>
  <div class="q-py-lg">
    <div class="column q-gutter-sm items-center q-pa-sm" style="heigth: 600px">
      <div class="text-primary text-h3 q-pt-xl">Profile</div>
      <q-avatar rounded size="200px" class="q-py-lg">
        <img :src="avatarUrl" />
      </q-avatar>
    </div>
    <q-separator inset class="q-mt-xl q-mb-lg" />
    <div class="column items-center text-primary text-weight-bolder q-py-md">
      {{ publicKey }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWorkspace } from "../composables";

const { wallet } = useWorkspace();

const avatarUrl = computed(() => {
  if (!wallet.value)
    return "https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg";
  const seed = wallet.value.publicKey.toBase58();
  return `https://dicebear.com/api/adventurer/${seed}.svg`;
});

const publicKey = computed(() => wallet.value.publicKey.toBase58());
</script>