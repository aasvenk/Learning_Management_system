import { io } from 'socket.io-client';

export const socket = io('http://localhost:8000', {
  extraHeaders: {
    Authorization: "Bearer " + localStorage.getItem("hoosier_room_token")
  }
});