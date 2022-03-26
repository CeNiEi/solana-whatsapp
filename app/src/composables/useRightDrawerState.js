import { ref } from 'vue';

export const rightDrawerOpen = ref(false);
export function toggleRightDrawer() {
    rightDrawerOpen.value = !rightDrawerOpen.value;
}

