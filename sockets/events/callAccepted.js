const { checkSocketId } = require("../../Utils/redis");

const callAccepted = async (callerId, calleeId, type, io) => {
  const callerSocket = await checkSocketId(callerId);
  io.to(callerSocket).emit("onCallAccept", { callerId, calleeId, type });
};

module.exports = callAccepted;
