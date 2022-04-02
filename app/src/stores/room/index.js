import { defineStore } from 'pinia';

export const useRoomStore = defineStore('roomId', {
  state: () => ({
    currentRoom: null,
    chatStream: [],
  }),
  getters: {
    currentRoomId: (state) => {
      if (state.currentRoom === null)
        return "";
      return state.currentRoom.key
    },
    currentRoomName: (state) => {
      if (state.currentRoom === null)
        return "";
      return state.currentRoom.group_name
    },
    currentChatList: (state) => state.chatStream.sort((a, b) => a.timestamp - b.timestamp),
    currentRoomAvatar: (state) => {
      if (state.currentRoom === null)
        return "";
      return `https://dicebear.com/api/identicon/${state.currentRoom.key}.svg`
    },
    currentRoomAuthor: (state) => {
      if (state.currentRoom === null)
        return "";
      return state.currentRoom.group_author;
    },
    currentRoomTime: (state) => {
      if (state.currentRoom === null)
        return "";
      return state.currentRoom.created_at;
    }

  }
});
