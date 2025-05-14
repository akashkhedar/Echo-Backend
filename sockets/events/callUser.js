const { checkSocketId } = require("../../Utils/redis");

const callUser = async (callerId, calleeId, type, io) => {
  const calleeSocket = await checkSocketId(calleeId);
  io.to(calleeSocket).emit("receiveCall", { callerId, calleeId, type });
};
module.exports = callUser;
