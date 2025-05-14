const { checkSocketId } = require("../../Utils/redis");

const sendOffer = async (callerId, calleeId, offer, type, io) => {
  const calleeSocket = await checkSocketId(calleeId);
  io.to(calleeSocket).emit("getOffer", { callerId, calleeId, offer, type });
};

module.exports = sendOffer;
