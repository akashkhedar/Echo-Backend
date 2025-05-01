const { checkSocketId } = require("../../Utils/redis");

const callAccepted = async (callerId, calleeId, io) => {
  const callerSocket = await checkSocketId(callerId);
  socket.to(callerSocket).emit("onCallAccept", { callerId, calleeId });
};

module.exports = callAccepted;
