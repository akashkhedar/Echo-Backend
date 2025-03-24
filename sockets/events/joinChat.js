const { storeSocketId } = require("../../Utils/redis");

const joinChat = async (socket, io, userId) => {
  await storeSocketId(userId, socket.id);
  console.log(`${userId} is online with ${socket.id}`);
  io.emit("joinedChat", `${userId} joined the chat!`);
};

module.exports = joinChat;
