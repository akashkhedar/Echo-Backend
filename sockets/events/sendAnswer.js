const { checkSocketId } = require("../../Utils/redis");

const sendAnswer = async (callerId, calleeId, answer, io) => {
  const calleeSocket = await checkSocketId(calleeId);
  io.to(calleeSocket).emit("getAnswer", answer);
};

module.exports = sendAnswer;
