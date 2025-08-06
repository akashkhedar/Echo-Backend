const { storeSocketId, getOfflineMessages } = require("../../Utils/redis");

const online = async (userId, socket) => {
  await storeSocketId(userId, socket.id);
  const offlineMessages = await getOfflineMessages(userId);
  socket.broadcast.emit("userOnline", userId);
};

module.exports = online;
