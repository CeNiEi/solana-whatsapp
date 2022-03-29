import { defineStore } from 'pinia';
import { fetchMessages } from 'src/api';

export const useRoomStore = defineStore('roomId', {
  state: () => ({
    currentRoom: null,
    chatStream: [],
  }),
  getters: {
    currentRoomId: (state) => state.currentRoom.publicKey,
    currentChatList: (state) => state.chatStream.sort((a, b) => a.timestamp - b.timestamp)
  },
  actions: {
    changeCurrentRoom(newRoom) {
      this.currentRoom = newRoom;
    },
    async getChats() {
      const chats = await fetchMessages(this.currentRoom.publicKey);
      this.chatStream = chats
    },
  },
});
