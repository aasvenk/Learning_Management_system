import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_BASE_URL, {
  extraHeaders: {
    Authorization: "Bearer " + localStorage.getItem("hoosier_room_token")
  }
});