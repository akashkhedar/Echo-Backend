const { checkSocketId } = require("../../Utils/redis");

const sendOffer = async (callerId, calleeId, offer, io) => {
  const calleeSocket = await checkSocketId(calleeId);
  io.to(calleeSocket).emit("getOffer", { callerId, calleeId, offer });
};

module.exports = sendOffer;
