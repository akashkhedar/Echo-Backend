const { deleteSocketId } = require("../../Utils/redis");

const leaveChat = async (socket, io, userId) => {
  await deleteSocketId(userId);
};

module.exports = leaveChat;
