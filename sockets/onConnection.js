const joinAllRooms = require("./events/joinAllRooms");
const joinChat = require("./events/joinChat");
const leaveChat = require("./events/leaveChat");
const readMsg = require("./events/readMsg");
const sendMessage = require("./events/sendMessage");

const onConnection = (socket, io) => {
  socket.on("joinChat", (userId) => {
    joinChat(socket, io, userId);
  });
  socket.on("joinAllRooms", (rooms) => {
    joinAllRooms(socket, rooms);
  });
  socket.on("sendMessage", ({ senderId, receiverId, message, username }) => {
    sendMessage(socket, senderId, receiverId, message, username, io);
  });
  socket.on("readMsg", ({ msgId, chatId, roomId }) => {
    readMsg(socket, io, msgId, chatId, roomId);
  });
  socket.on("leaveChat", (userId) => leaveChat(socket, io, userId));
};

module.exports = onConnection;
