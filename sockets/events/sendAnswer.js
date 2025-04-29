const { checkSocketId } = require("../../Utils/redis");

const sendAnswer = async (sender, receiver, answer, socket, io) => {
  const receiverSocket = await checkSocketId(receiver);
  socket.to(receiverSocket).emit("getAnswer", {
    sender: sender,
    answer: answer,
  });
};

module.exports = sendAnswer;
