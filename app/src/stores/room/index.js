import { defineStore } from 'pinia';
import { fetchMessages } from 'src/api';

export const useRoomStore = defineStore('roomId', {
  state: () => ({
    currentRoom: null,
    chatStream: [],
  }),
  getters: {
    currentRoomId: (state) => state.currentRoom.raw_publickey,
    currentChatList: (state) => state.chatStream.sort((a, b) => a.timestamp - b.timestamp),
  },
  actions: {
    changeCurrentRoom(newRoom) {
      this.currentRoom = newRoom;
    },
    async getChats() {
      const chats = await fetchMessages(this.currentRoom.raw_publickey);
      this.chatStream = chats
    },
    addChat(newChat) {
      this.chatStream.push(newChat)
    }
  },
});
