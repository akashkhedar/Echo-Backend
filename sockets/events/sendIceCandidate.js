const { checkSocketId } = require("../../Utils/redis");

const sendIceCandidate = async (sender, receiver, candidate, socket, io) => {
  const receiverSocket = await checkSocketId(receiver);
  io.to(receiverSocket).emit("getIceCandidate", candidate);
};

module.exports = sendIceCandidate;
