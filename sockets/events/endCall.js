const { checkSocketId } = require("../../Utils/redis");

const endCall = async (callee, io) => {
  const calleeSocket = await checkSocketId(callee);
  io.to(calleeSocket).emit("callEnded");
};

module.exports = endCall;
