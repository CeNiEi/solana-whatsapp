<template>
  <router-view />
</template>

<script setup>
  import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
  import { initWallet } from 'solana-wallets-vue';
  import 'solana-wallets-vue/styles.css';
  import { initWorkspace } from './composables';

  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);

  const wallets = [
    new PhantomWalletAdapter()
  ];

  initWallet({ wallets, autoConnect: true });
  initWorkspace();

</script>