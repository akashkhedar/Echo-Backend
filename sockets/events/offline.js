const {
  storeSocketId,
  getOfflineMessages,
  deleteSocketId,
} = require("../../Utils/redis");

const offline = async (userId, socket) => {
  await deleteSocketId(userId);
  socket.broadcast.emit("userOffline", userId);
};

module.exports = offline;
