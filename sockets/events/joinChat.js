const { storeSocketId } = require("../../Utils/redis");

const joinChat = async (socket, io, userId) => {
  console.log("Opened Chat Page");
  console.log(socket.id);
  await storeSocketId(userId, socket.id);
  io.emit("joinedChat", `${userId} joined the chat!`);
};

module.exports = joinChat;
