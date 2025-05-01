const { checkSocketId } = require("../../Utils/redis");

const callUser = async (callerId, calleeId, io) => {
  const calleeSocket = await checkSocketId(calleeId);
  io.to(calleeSocket).emit("receiveCall", { callerId, calleeId });
};
module.exports = callUser;
