const { storeSocketId, getOfflineMessages } = require("../../Utils/redis");

const joinChat = async (socket, userId) => {
  await storeSocketId(userId, socket.id);
  const offlineMessages = await getOfflineMessages(userId);
  socket.broadcast.emit("userOnline", userId);
};

module.exports = joinChat;
