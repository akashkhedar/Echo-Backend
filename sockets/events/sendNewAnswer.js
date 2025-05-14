const { checkSocketId } = require("../../Utils/redis");

const sendNewAnswer = async (sender, receiver, answer, io) => {
  const receiverSocket = await checkSocketId(receiver);
  io.to(receiverSocket).emit("getNewAnswer", answer);
};

module.exports = sendNewAnswer;
