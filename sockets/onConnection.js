const joinAllRooms = require("./events/joinAllRooms");
const joinChat = require("./events/joinChat");
const leaveChat = require("./events/leaveChat");
const sendMessage = require("./events/sendMessage");

const onConnection = (socket, io) => {
  socket.on("joinChat", (userId) => joinChat(socket, io, userId));
  socket.on("joinAllRooms", (rooms) => joinAllRooms(socket, rooms));
  socket.on("sendMessage", ({ senderId, receiverId, message }) =>
    sendMessage(senderId, receiverId, message, io)
  );
  socket.on("disconnection", (userId) => leaveChat(io, userId));
};

module.exports = onConnection;
