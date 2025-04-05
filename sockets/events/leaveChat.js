const { deleteSocketId } = require("../../Utils/redis");

const leaveChat = async (socket, io, userId) => {
  console.log(`${socket.id} - ${userId} left the chat`);
  await deleteSocketId(userId);
};

module.exports = leaveChat;
