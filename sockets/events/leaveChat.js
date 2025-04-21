const { deleteSocketId } = require("../../Utils/redis");

const leaveChat = async (socket, io, userId) => {
  await deleteSocketId(userId);
  socket.broadcast.emit("userOffline", userId);
};

module.exports = leaveChat;
