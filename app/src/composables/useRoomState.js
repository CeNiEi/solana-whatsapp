import { ref } from 'vue';

export const currentRoom = ref({});
export function changeRoom(room) {
    currentRoom.value = room;
}