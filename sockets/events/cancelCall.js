const { checkSocketId } = require("../../Utils/redis");

const cancelCall = async (callerId, calleeId, io) => {
  const calleeSocket = await checkSocketId(calleeId);
  io.to(calleeSocket).emit("cancelledCall");
};

module.exports = cancelCall;
