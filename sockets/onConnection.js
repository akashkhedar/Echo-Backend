const joinChat = require("./events/joinChat");
const leaveChat = require("./events/leaveChat");
const sendMessage = require("./events/sendMessage");
const openChat = require("./events/openChat");

const onConnection = (socket, io) => {
  socket.on("joinChat", (userId) => joinChat(socket, io, userId));
  socket.on("openChat", ({ senderId, receiverId }) =>
    openChat(senderId, receiverId)
  );
  socket.on("sendMessage", ({ senderId, receiverId, message }) =>
    sendMessage(senderId, receiverId, message, io)
  );
  socket.on("disconnection", (userId) => leaveChat(io, userId));
};

module.exports = onConnection;
