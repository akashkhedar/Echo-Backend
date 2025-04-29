const { checkSocketId } = require("../../Utils/redis");

const sendOffer = async (sender, receiver, offer, socket, io) => {
  const receiverSocket = await checkSocketId(receiver);
  socket.to(receiverSocket).emit("getOffer", { sender: sender, offer: offer });
};

module.exports = sendOffer;
