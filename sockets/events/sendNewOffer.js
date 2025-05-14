const { checkSocketId } = require("../../Utils/redis");

const sendNewOffer = async (sender, receiver, newOffer, io) => {
  const receiverSocket = await checkSocketId(receiver);
  io.to(receiverSocket).emit("getNewOffer", { sender, receiver, newOffer });
};

module.exports = sendNewOffer;
