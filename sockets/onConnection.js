const joinAllRooms = require("./events/joinAllRooms");
const joinChat = require("./events/joinChat");
const leaveChat = require("./events/leaveChat");
const sendMessage = require("./events/sendMessage");

const onConnection = (socket, io) => {
  socket.on("joinChat", (userId) => {
    console.log(`${socket.id} - ${userId} joined the chat`);
    joinChat(socket, io, userId);
  });
  socket.on("joinAllRooms", (rooms) => {
    joinAllRooms(socket, rooms);
  });
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    console.log(senderId, receiverId);
    sendMessage(socket, senderId, receiverId, message, io);
  });
  socket.on("leaveChat", (userId) => leaveChat(socket, io, userId));
};

module.exports = onConnection;
