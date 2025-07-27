const { checkSocketId } = require("../../Utils/redis");

const declinedCall = async (callerId, io) => {
  const callerSocket = await checkSocketId(callerId);
  io.to(callerSocket).emit("calldeclined");
};

module.exports = declinedCall;
