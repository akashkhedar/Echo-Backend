const { checkSocketId } = require("../../Utils/redis");

const sendNewOffer = (callerId, calleeId, offer, io) => {
    const calleeSocket = await checkSocketId(calleeId)
  io.emit("getNewOffer", { callerId, calleeId, offer });
};

module.exports = sendNewOffer;
