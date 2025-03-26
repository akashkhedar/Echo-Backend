const { storeSocketId } = require("../../Utils/redis");

const joinChat = async (socket, io, userId) => {
  await storeSocketId(userId, socket.id);
};

module.exports = joinChat;
