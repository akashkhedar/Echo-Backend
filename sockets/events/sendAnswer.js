const { checkSocketId } = require("../../Utils/redis");

const sendAnswer = async (callerId, calleeId, answer, io) => {
  const callerSocket = await checkSocketId(callerId);
  io.to(callerSocket).emit("getAnswer", {
    callerId,
    calleeId,
    answer,
  });
};

module.exports = sendAnswer;
